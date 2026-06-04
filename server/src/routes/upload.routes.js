import express from "express";
import upload from "../middlewares/multer.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = express.Router();
// router.method("/path", middleware,Controller);

router.post("/upload", upload.single("avatar"), uploadFile);

export default router;