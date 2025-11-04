import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    usn: { type: String, required: true, unique: true },
    year:{ type: Number, required: true },
    batch:{ type: String, required: true },
    collegeName: { type: String, required: true },
    programName: { type: String, required: true },
    technology: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true, unique: true },
    profilePic: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    isPassout: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("User", userSchema);