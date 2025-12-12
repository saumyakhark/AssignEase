import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  teacherId: String,
  title: String,
  subject: String,
  year: String,
  file: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Note", noteSchema);
