import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
); // >>>> it allows the frontend to make requests to the backend
app.use(express.json()); // >>>> it parse the incoming json data from the body of the request
app.use(cookieParser()); // >>> it helps to read the cookies from the browser
app.use(express.static("public")); // >>> it serves the static files from the public folder

// Routes
app.use("/api/auth", authRoutes);

// Debug Route - just for checking the request object
app.get("/debug", (req, res) => {
  res.json({
    method: req.method,
    url: req.url,
    path: req.path,
    query: req.query,
    params: req.params,
    body: req.body,
    headers: req.headers,
    ip: req.ip,
    protocol: req.protocol,
    hostname: req.hostname,
    userAgent: req.headers["user-agent"],
  });
});

export default app;

// https://console.neon.tech/app/org-frosty-waterfall-64292337/projects?modal=create_project
