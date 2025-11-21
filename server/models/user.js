import mongoose from "mongoose";

const homeworkStatusSchema = new mongoose.Schema(
  {
    homeworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Homework",
      required: true,
    },
    status: {
      type: String,
      enum: ["done", "not_done", "pending"],
      default: "pending",
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    markedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    usn: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
    batch: { type: String, required: true },
    collegeName: { type: String, required: false },
    programName: { type: String, required: true },
    technology: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true, unique: true },
    profilePic: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    isPassout: { type: Boolean, default: false },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },
    teacherStatus: {
      type: String,
      default: "No teacher is assigned to this student",
    },
    // ✅ Add homework tracking
    homeworkStatus: [homeworkStatusSchema],
    isApproved: { type: Boolean, default: false }

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);