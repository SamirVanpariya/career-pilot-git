import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import * as crypto from "crypto";
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
    const { fullName, email, profile = {} } = req.body;

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
              avatar: profile.avatar,
            },
            create: {
              phoneNumber: profile.phoneNumber,
              location: profile.location,
              jobTitle: profile.jobTitle,
              website: profile.website,
              bio: profile.bio,
              avatar: profile.avatar,
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

// ├── FORGOT PASSWORD
// │   ├── Validate email
// │   ├── Check if user exists (security)
// │   ├── Generate secure token
// │   ├── Hash token (store in DB)
// │   ├── Send email with reset link

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // SECURITY: Don't reveal if user exists
    if (!user) {
      return res.status(200).json({
        message: "If email exists, reset link will be sent",
      });
    }

    // 1. Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 2. Hash token before saving (IMPORTANT)
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // 3. Save hashed token + expiry
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 min
      },
    });

    // 4. Create reset URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // 5. Send email
    await sendMail({
      to: user.email,
      subject: "Reset Your Password - CareerPilot",
      html: `
        <h2>Password Reset</h2>
        <p>Click below link to reset your password. This link expires in 10 minutes.</p>
        <a href="${resetURL}" target="_blank">Reset Password</a>
      `,
    });

    return res.status(200).json({
      message: "Reset link sent to email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ├── RESET PASSWORD
// │   ├── Validate token + password
// │   ├── Hash incoming token
// │   ├── Find valid user (token + not expired)
// │   ├── Hash new password
// │   ├── Update password
// │   ├── Clear reset fields

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const passwordStr = String(password);
    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password are required",
      });
    }

    // 1. Hash incoming token (same method as stored)
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 2. Find valid user
    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(passwordStr, 10);

    // 4. Update password + clear reset fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
