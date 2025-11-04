// models/Option.js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  type: { type: String, enum: ["batch", "collegeName", "programName", "technology"], required: true },
  value: { type: String, required: true, unique: true }
}, { timestamps: true });

export default mongoose.model("Option", optionSchema);
