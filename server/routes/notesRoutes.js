// backend/routes/notesRoutes.js
import express from "express";
import { getActiveNotes, getNotesForUser } from "../controllers/notesController.js";
import { addNote, updateNote, toggleNoteStatus, deleteNote, getAllnotes, toggleNoteCollegeAccess } from "../controllers/adminNotesController.js";

const notesrouter = express.Router();


// frontend routes
notesrouter.get("/active", getActiveNotes);
notesrouter.get("/foruser/:collegeName", getNotesForUser);

// admin routes
notesrouter.post("/", addNote);

notesrouter.put("/:id", updateNote);
notesrouter.put("/:id/college", toggleNoteCollegeAccess);
notesrouter.patch("/:id/toggle", toggleNoteStatus);
notesrouter.delete("/:id", deleteNote);
notesrouter.get("/admin", getAllnotes);

export default notesrouter;
