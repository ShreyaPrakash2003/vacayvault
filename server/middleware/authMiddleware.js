import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to verify if user is logged in
export const isLogin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// Middleware to verify if user is a hotelOwner/admin
export const isAdmin = (req, res, next) => {
  // isLogin middleware must run before this
  if (req.user?.role === "hotelOwner" || req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access denied. Admin/HotelOwner only." });
  }
};
