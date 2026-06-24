import prisma from "../db/prisma.js";

export const createResume = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }
    const {
      file,
      parsedText,
      title,
      name,
      email,
      phone,
      skills,
      experience,
      linkedin,
      portfolio,
      notes,
    } = req.body;
    const resume = await prisma.resume.create({
      data: {
        userId: req.user?.id,
        file: file?.url,
        parsedText: parsedText || null,
        title,
        name,
        email,
        phone,
        skills: skills ? skills.split(",").map((s) => s.trim()) : [], // converts comma-separated string into an array
        experience,
        linkedin,
        portfolio,
        notes,
      },
    });

    res.status(200).json({
      message: "Resume uploaded successfully",
    });
  } catch (error) {
    console.error("Error in resumesController:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getResumes = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }
    const resumes = await prisma.resume.findMany({
      where: { userId: req.user.id },
    });

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error in getResumes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    const resumeId = Number(req.params.resumeId);

    if (Number.isNaN(resumeId)) {
      return res.status(400).json({
        message: "Invalid resume ID",
      });
    }

    const { count } = await prisma.resume.deleteMany({
      where: {
        id: resumeId,
        userId: req.user.id,
      },
    });

    if (count === 0) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteResume:", error);

    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
