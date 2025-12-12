import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  subject: String,
  year: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Assignment", assignmentSchema);
