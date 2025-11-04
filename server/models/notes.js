// backend/models/notes.js
import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    collegeName: { type: String, required: true },
    visibleTo: { type: [String], default: [] },
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String, // e.g. "/user/chapter1"
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true, // by default active
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
