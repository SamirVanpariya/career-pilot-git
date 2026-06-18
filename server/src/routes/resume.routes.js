import express from "express";
import {
  createResume,
  deleteResume,
  getResumes,
} from "../controllers/resumes.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/resume", protect, createResume);
router.get("/resume", protect, getResumes);
router.delete("/resume/:resumeId", protect, deleteResume);

export default router;
