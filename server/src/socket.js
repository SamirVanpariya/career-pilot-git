import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "./db/prisma.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error("No token provided"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id; // adjust based on your JWT payload

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, fullName: true },
      });

      if (!user) return next(new Error("User not found"));

      socket.userId = userId;
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId;
    console.log(`✅ User ${userId} connected`);

    socket.join(`user-${userId}`);

    socket.on("disconnect", () => {
      console.log(`❌ User ${userId} disconnected`);
    });
  });

  return io;
};

// Helper: Emit to a specific user
export const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(`user-${userId}`).emit(event, data);
  }
};

export const getIO = () => {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
};
