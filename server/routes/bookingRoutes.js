import express from "express";
import { isLogin } from "../middleware/authMiddleware.js";
import {
  checkAvailabilityAPI,
  createBooking,
  getUserBookings,
  getHotelBookings,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post("/book", isLogin, createBooking);
bookingRouter.get("/user", isLogin, getUserBookings);
bookingRouter.get("/hotel", isLogin, getHotelBookings);

export default bookingRouter;
