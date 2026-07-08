import prisma from "../db/prisma.js";

export const createJob = async (req, res) => {
  try {
    const jobData = req.body;
    console.log("JD", jobData);
    const userId = req.user.id;
    await prisma.job.create({
      data: {
        userId: userId,
        ...jobData,
        nextActions: {
          create: [
            { title: "Research the company" },
            { title: "Tailor your resume" },
            { title: "Prepare for the interview" },
            { title: "Follow up with the recruiter" },
            { title: "Track the application status" },
          ],
        },
      },
      include: {
        nextActions: true,
      },
    });
    return res.status(201).json({
      message: "Job created successfully",
      job,
    });
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
      include: {
        nextActions: true,
      },
    });
    return res.json(jobs);
  } catch (error) {
    console.log("Error in getAllJobs", error);
    return res.json({ message: "error", error: error.message });
  }
};
// GET JOB BY ID
export const getJobById = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const id = Number(req.params.id);

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const job = await prisma.job.findUnique({
      where: { id, userId: req.user?.id },
      include: {
        nextActions: true,
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    console.error("Error in getJobById:", error);
    return res.status(500).json({ message: error.message });
  }
};
// UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }
    const job = await prisma.job.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("Error in updateJob:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }
    await prisma.job.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteJob:", error);
    res.status(500).json({ message: error.message });
  }
};
// UPDATE NEXT ACTION STATUS
export const updateNextAction = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const actionId = Number(req.params.actionId);
    const { completed } = req.body;

    if (Number.isNaN(actionId)) {
      return res.status(400).json({
        message: "Invalid action id",
      });
    }

    const action = await prisma.nextActions.findFirst({
      where: {
        id: actionId,
        job: {
          userId: req.user.id,
        },
      },
    });

    if (!action) {
      return res.status(404).json({
        message: "Action not found",
      });
    }

    const updatedAction = await prisma.nextActions.update({
      where: {
        id: actionId,
      },
      data: {
        completed,
      },
    });

    return res.status(200).json({
      message: "Next action updated successfully",
      nextAction: updatedAction,
    });
  } catch (error) {
    console.error("Error in updateNextAction:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
