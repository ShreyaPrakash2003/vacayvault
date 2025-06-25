import express from "express";
import { loginController, profileController, registerController } from "../controllers/userController.js";
import { isLogin } from "../middleware/authMiddleware.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { getUserData, storeRecentSearchedCities } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post('/register',registerController)
userRouter.post('/login',loginController)
userRouter.get("/profile", isLogin, profileController);
// userRouter.get("/", protect, getUserData);
// userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);

export default userRouter;
