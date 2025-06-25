import express from "express";
import { isLogin, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createRoom,
  getRooms,
  toggleRoomAvailability,
  getOwnerRooms,
} from "../controllers/roomController.js";

const roomRouter = express.Router();

// Create a new room (only logged-in hotelOwner/admin)
roomRouter.post("/create", isLogin, isAdmin, upload.array("images", 5), createRoom);

// Public route to get all available rooms
roomRouter.get("/", getRooms);

// Get rooms for the logged-in hotelOwner/admin
roomRouter.get("/owner", isLogin, isAdmin, getOwnerRooms);

// Toggle room availability (only hotelOwner/admin)
roomRouter.post("/toggle-availability", isLogin, isAdmin, toggleRoomAvailability);

export default roomRouter;
