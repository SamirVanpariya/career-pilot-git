import express from "express";
import { createResume, getResumes } from "../controllers/resumes.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/resume", protect, createResume);
router.get("/resume", protect, getResumes);

export default router;
