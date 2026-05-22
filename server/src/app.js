import express from "express";
import prisma from "./db/prisma.js";

const app = express();

// Middleware (optional but good practice)
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World !!");
});

// Routes for users - Create a new user--- try in POSTMAN
app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });

  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Routes for jobs - Create a new job--- try in POSTMAN
app.post("/jobs", async (req, res) => {
  const jobs = await prisma.jobs.create({
    data: req.body,
  });

  res.json(jobs);
});

app.get("/jobs", async (req, res) => {
  const jobs = await prisma.jobs.findMany();
  res.json(jobs);
});


export default app;

// https://console.neon.tech/app/org-frosty-waterfall-64292337/projects?modal=create_project
