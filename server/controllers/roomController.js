import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// API to create a new room for a hotel
// POST /api/rooms
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const ownerId = req.user.id; // From isLogin middleware

    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) return res.json({ success: false, message: "No Hotel found" });

    // Extract image URLs from files (Multer + Cloudinary auto uploads)
    const images = req.files?.map(file => file.path) || [];

    await Room.create({
      hotel: hotel.id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: typeof amenities === "string" ? JSON.parse(amenities) : amenities,
      images,
    });

    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all rooms
// GET /api/rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: 'hotel',
        populate: {
          path: 'owner',
          select: 'image',
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all rooms for a specific hotel
// GET /api/rooms/owner
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.user.id });
    if (!hotelData) return res.json({ success: false, message: "Hotel not found" });

    const rooms = await Room.find({ hotel: hotelData.id }).populate("hotel");

    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to toggle availability of a room
// POST /api/rooms/toggle-availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.json({ success: false, message: "Room not found" });

    room.isAvailable = !room.isAvailable;
    await room.save();

    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
