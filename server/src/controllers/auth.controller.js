import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ├── REGISTER
// │   ├── Validate
// │   ├── Check Email
// │   ├── Hash Password
// │   └── Save User
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, agreeToTerms } = req.body;

    // Validation
    if (!fullName || !email || !password || !agreeToTerms) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing user by email
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user + empty profile
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        agreeToTerms,

        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ├── LOGIN
// │   ├── Find User
// │   ├── Compare Password
// │   ├── Generate JWT
// │   └── Set secure cookie (httpOnly)

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 4. Create JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5. Set cookie (session)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
// ├── GET LOGGED IN USER (ME)

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        profile: true,
      },
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

// ├── UPDATE PROFILE

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, profile } = req.body;

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        fullName,
        email,
        profile: {
          upsert: {
            update: {
              phoneNumber: profile.phoneNumber,
              location: profile.location,
              jobTitle: profile.jobTitle,
              website: profile.website,
              bio: profile.bio,
            },
            create: {
              phoneNumber: profile.phoneNumber,
              location: profile.location,
              jobTitle: profile.jobTitle,
              website: profile.website,
              bio: profile.bio,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
// ├── GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        agreeToTerms: true,
        createdAt: true,
        // ❌ do NOT include password
        profile: {
          select: {
            phoneNumber: true,
            location: true,
            jobTitle: true,
            website: true,
            bio: true,
            avatar: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ├── LOGOUT

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
