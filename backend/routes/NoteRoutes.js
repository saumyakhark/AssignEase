import express from "express";
const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.send("Notes API working");
});

export default router;
