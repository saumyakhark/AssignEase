import express from "express";
import Teacher from "../models/Teacher.js";

const router = express.Router();

// Teacher Register
router.post("/register", async (req, res) => {
  try {
    const { name, teacherId, password } = req.body;

    const exists = await Teacher.findOne({ teacherId });
    if (exists) return res.status(400).json({ message: "Teacher already exists" });

    const newTeacher = await Teacher.create({ name, teacherId, password });

    res.status(201).json({ message: "Teacher registered", teacher: newTeacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Teacher Login
router.post("/login", async (req, res) => {
  try {
    const { teacherId, password } = req.body;
    const teacher = await Teacher.findOne({ teacherId });

    if (!teacher) return res.status(400).json({ message: "Teacher not found" });
    if (teacher.password !== password)
      return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({ message: "Login successful", teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
