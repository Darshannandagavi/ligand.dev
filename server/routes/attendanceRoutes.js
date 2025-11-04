import express from "express";
import { getStudentsByProgramTech, markAttendance, getAttendanceRecords, getBatchesByCollege, getProgramsByCollegeBatch, getTechnologiesByCollegeBatchProgram } from "../controllers/attendanceController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// options for chained selects
router.get("/options/batches", auth, getBatchesByCollege); // ?collegeName=
router.get("/options/programs", auth, getProgramsByCollegeBatch); // ?collegeName=&batch=
router.get("/options/technologies", auth, getTechnologiesByCollegeBatchProgram); // ?collegeName=&batch=&programName=

// existing endpoints
router.get("/students", auth, getStudentsByProgramTech); // ?collegeName=&batch=&programName=&technology=
router.post("/", auth, markAttendance);
router.get("/", auth, getAttendanceRecords);

export default router;
