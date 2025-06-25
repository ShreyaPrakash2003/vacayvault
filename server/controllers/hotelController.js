import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

// POST /api/hotels/register
export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user?.id;
    console.log(req.user)

    if (!name || !address || !contact || !city || !owner) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if a hotel is already registered by this user
    const existingHotel = await Hotel.findOne({ owner });
    if (existingHotel) {
      return res.status(409).json({ success: false, message: "Hotel already registered by this user." });
    }

    // Create new hotel
    await Hotel.create({ name, address, contact, city, owner });

    // Update user's role to hotelOwner
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.status(201).json({ success: true, message: "Hotel registered successfully." });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
