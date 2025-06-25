import express from "express";
import { isLogin, isAdmin } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

// Route to register a hotel (only logged-in users with hotelOwner/admin role)
hotelRouter.post("/register", isLogin, isAdmin, registerHotel);

export default hotelRouter;
