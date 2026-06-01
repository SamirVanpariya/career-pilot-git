import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getMe,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/me", protect, getMe); // session
router.post("/login", loginUser);
router.get("/users", getAllUsers);

export default router;
