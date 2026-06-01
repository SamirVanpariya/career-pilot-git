import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getMe,
  logoutUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/me", protect, getMe); // session
router.post("/logout", logoutUser);

export default router;
