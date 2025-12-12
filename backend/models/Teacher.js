import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacherId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model("Teacher", teacherSchema);
