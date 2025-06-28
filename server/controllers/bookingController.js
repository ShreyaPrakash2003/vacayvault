import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import sendMail from "../utils/sendmail.js";
import Razorpay from 'razorpay';
import crypto from 'crypto';
// import transporter from "../configs/nodemailer.js";

// Helper: Check room availability
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    return bookings.length === 0;
  } catch (error) {
    throw new Error("Failed to check availability");
  }
};

// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// POST /api/bookings/book
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user.id;

    // Check room availability
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }
   console.log("isAvailable")
    // Get room and hotel info
    const roomData = await Room.findById(room).populate("hotel");
    const pricePerNight = roomData.pricePerNight;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * pricePerNight;
   console.log("getting all")
    // Save booking
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel.id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });
   // Send confirmation email
    const emailData = {
      username: req.user.email,
      bookingId: booking.id,
      hotelName: roomData.hotel.name,
      hotelAddress: roomData.hotel.address,
      checkIn: checkIn.toDateString(),
      checkOut: checkOut.toDateString(),
      totalPrice,
    };

    await sendMail(req.user.email, "Hotel Booking Confirmation", emailData);
   
    res.json({ success: true, message: "Booking created successfully" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to create booking" });
  }
};

// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user.id;
    const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

// GET /api/bookings/hotel
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user.id });
    if (!hotel) return res.json({ success: false, message: "No Hotel found" });

    const bookings = await Booking.find({ hotel: hotel.id }).populate("room hotel user").sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

//POST /api/bookings/razor-pay

export const getChecking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ success: false, message: 'Booking ID is required' });
    }

    const booking = await Booking.findById(bookingId).populate('room').populate('hotel');
    console.log(booking);

    if (!booking ) {
      return res.status(404).json({ success: false, message: 'Booking not found or unauthorized' });
    }

    const razorpay = new Razorpay({
      key_id: process.env.Razorpay_key,
      key_secret: process.env.Razorpay_secret,
    });

    const options = {
      amount: booking.totalPrice * 100, // amount in paise
      currency: 'INR',
      receipt: bookingId,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error('Razorpay Order Error:', error);
    res.status(500).json({ success: false, message: 'Razorpay order creation failed', error: error.message });
  }
};

export const getVerify = async (req, res) => {
  try {
    const {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
    
console.log('Booking ID received:', bookingId);
    const expectedSignature = crypto
      .createHmac('sha256', process.env.Razorpay_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment signature verification failed',
      });
    }


const booking = await Booking.findByIdAndUpdate(
  bookingId,
  { isPaid: true },
  { new: true }
);
console.log(booking.isPaid);



    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found after payment',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified and booking updated',
      booking,
    });
  } catch (error) {
    console.error('Payment verification failed:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
