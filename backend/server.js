import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import mailRoute from "./routes/mailRoute.js";
import adminRoute from "./routes/adminRoute.js";
import bannerRoute from "./routes/bannerRoute.js";
import projectRoute from "./routes/projectRoute.js";
import Admin from "./models/Admin.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;

const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/mail", mailRoute);
app.use("/api/admin", adminRoute);
app.use("/api/banners", bannerRoute);
app.use("/api/projects", projectRoute);

app.post("/api/seed-admin", async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@shubhamdev.com" });

    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const admin = await Admin.create({
      email: "admin@shubhamdev.com",
      password: "Admin@123",
    });

    res.status(201).json({ success: true, message: "Admin created successfully", email: admin.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating admin", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
