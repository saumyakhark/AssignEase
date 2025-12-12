import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import studentRoutes from "./routes/StudentRoutes.js";

dotenv.config();

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());                       // enables JSON body parsing
app.use("/uploads", express.static("uploads")); // serve uploaded files

// ---------------- DATABASE CONNECTION ----------------
mongoose.set("strictQuery", false); // optional but removes warnings

mongoose
.connect(process.env.MONGO_URI, {
family: 4,                       // fixes IPv6 SRV issue
serverSelectionTimeoutMS: 10000, // waits 10 seconds before timeout
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => {
console.log("❌ MongoDB Connection Error:");
console.log(err);
});

// ---------------- ROUTES ----------------
app.use("/api/students", studentRoutes);

// Default Test Route
app.get("/", (req, res) => {
res.send("API is running fine...");
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
