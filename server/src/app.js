import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // >>>> it allows the frontend to make requests to the backend
app.use(express.json()); // >>>> it parse the incoming json data from the body of the request

// Routes
app.use("/api/auth", authRoutes);

export default app;

// https://console.neon.tech/app/org-frosty-waterfall-64292337/projects?modal=create_project
