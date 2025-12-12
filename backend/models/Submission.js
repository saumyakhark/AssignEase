import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  studentId: String,
  year: String,
  subject: String,
  marks: Number,
  remark: String,
  file: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", submissionSchema);
