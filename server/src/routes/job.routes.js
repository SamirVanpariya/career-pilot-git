import express from "express";
import { createJob, getAllJobs } from "../controllers/job.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

//  Job Creation
router.post("/job", protect, createJob);

// // Get all jobs of a user
router.get("/job", protect, getAllJobs);

// // Get single job by id
// router.get("/job/:id");

// // Update a job
// router.patch("/job/:id");

// // Delete a job
// router.delete("/job/:id");

export default router;
