// routes/studentRoutes.js
import express from "express";
import Student from "../models/Student.js";


const router = express.Router();

// -------------------- TEST ROUTE --------------------
router.get("/", (req, res) => {
  res.send("Student route working");
});

// -------------------- CREATE NEW STUDENT --------------------
router.post("/register", async (req, res) => {
  try {
    const { name, rollNumber, year, password } = req.body;

    if (!name || !rollNumber || !year || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const newStudent = new Student({ name, rollNumber, year, password });
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// -------------------- LOGIN STUDENT --------------------
router.post("/login", async (req, res) => {
  try {
    const { rollNumber, password } = req.body;

    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
