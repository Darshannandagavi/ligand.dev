// backend/controllers/notesController.js
import Notes from "../models/notes.js";

export const getActiveNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getNotesForUser = async (req, res) => {
  try {
  
    const { collegeName } = req.params;
   
    const notes = await Notes.find({
      isActive: true,
      visibleTo: collegeName
    }).sort({ createdAt: 1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
