import prisma from "../db/prisma.js";

export const createJob = async (req, res) => {
  try {
    const jobData  = req.body;
    console.log("JD",jobData)
    const userId = req.user.id;
    await prisma.job.create({
      data: {
        userId: userId,
        ...jobData,
      },
    });
    return res.json({ message: "Job created successfully" });
  } catch (error) {
    console.log("Error in createJob", error);
    return res.json({ message: "error", error: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId: req.user.id,
      },
    });
    return res.json(jobs);
  } catch (error) {
    console.log("Error in getAllJobs", error);
    return res.json({ message: "error", error: error.message });
  }
};
