import express from "express";
import { isLogin } from "../middleware/authMiddleware.js";
import {
  checkAvailabilityAPI,
  createBooking,
  getUserBookings,
  getHotelBookings,
  getChecking,
  getVerify,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post("/book", isLogin, createBooking);
bookingRouter.get("/user", isLogin, getUserBookings);
bookingRouter.get("/hotel", isLogin, getHotelBookings);
bookingRouter.post("/razorpay-payment", isLogin, getChecking);
bookingRouter.post("/verify-payment", isLogin, getVerify);


export default bookingRouter;
