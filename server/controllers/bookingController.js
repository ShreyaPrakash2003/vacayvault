import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import sendMail from "../utils/sendmail.js";
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
      username: req.user.username,
      bookingId: booking.id,
      hotelName: roomData.hotel.name,
      hotelAddress: roomData.hotel.address,
      checkIn: checkIn.toDateString(),
      checkOut: checkOut.toDateString(),
      totalPrice,
    };

    await sendMail(req.user.email, "Hotel Booking Confirmation", emailData);
    // Send confirmation email
    // const mailOptions = {
    //   from: process.env.SENDER_EMAIL,
    //   to: req.user.email,
    //   subject: 'Hotel Booking Confirmation',
    //   html: `
    //     <h2>Your Booking is Confirmed!</h2>
    //     <p>Hello ${req.user.username},</p>
    //     <p>Thank you for your booking. Here are the details:</p>
    //     <ul>
    //       <li><strong>Booking ID:</strong> ${booking.id}</li>
    //       <li><strong>Hotel:</strong> ${roomData.hotel.name}</li>
    //       <li><strong>Address:</strong> ${roomData.hotel.address}</li>
    //       <li><strong>Check-in:</strong> ${checkIn.toDateString()}</li>
    //       <li><strong>Check-out:</strong> ${checkOut.toDateString()}</li>
    //       <li><strong>Total Price:</strong> ₹${totalPrice}</li>
    //     </ul>
    //     <p>We look forward to hosting you!</p>
    //   `,
    // };

    // await transporter.sendMail(mailOptions);

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
