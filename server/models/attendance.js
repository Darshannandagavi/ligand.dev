import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent"], required: true },
  programName: { type: String, required: true },
  technology: { type: String, required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin who marked
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);
