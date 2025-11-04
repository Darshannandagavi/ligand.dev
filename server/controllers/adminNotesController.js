// backend/controllers/adminNotesController.js
import Notes from "../models/notes.js";

// Add new note
export const addNote = async (req, res) => {
    console.log("first")
  try {
    const { title, path } = req.body;
    const newNote = new Notes({ title, path });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Error adding note", error: err.message });
  }
};

// Update note (title or path)
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Notes.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Note not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err.message });
  }
};

// Toggle active/inactive
export const toggleNoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.isActive = !note.isActive;
    await note.save();

    res.json({ message: "Status updated", note });
  } catch (err) {
    res.status(500).json({ message: "Error toggling status", error: err.message });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Notes.findByIdAndDelete(id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err.message });
  }
};

// Get all notes (for admin view)
export const getAllnotes = async (req, res) => {
  try {
    const notes = await Notes.find().sort({ createdAt: 1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Toggle college access for notes
export const toggleNoteCollegeAccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { collegeName } = req.body;
    const note = await Notes.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Ensure collegeName is set if missing
    if (!note.collegeName && collegeName) {
      note.collegeName = collegeName;
    }

    if (note.visibleTo.includes(collegeName)) {
      note.visibleTo = note.visibleTo.filter(c => c !== collegeName);
    } else {
      note.visibleTo.push(collegeName);
    }
    await note.save();
    res.json({ message: "Note visibility updated", note });
  } catch (err) {
    res.status(500).json({ message: "Error toggling college", error: err.message });
  }
};
