import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from "./configs/db.js";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
const app = express();
dotenv.config();
connectDB();
connectCloudinary();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express Server!');
});
app.get('/test', (req, res) => {
  res.send('Logging test route');
});
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings",bookingRouter)
// app.use("/api/bookings", bookingRouter);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
