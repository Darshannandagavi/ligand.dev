import Attendance from "../models/attendance.js";
import User from "../models/user.js";

const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Get distinct batches for a college (current students only)
export const getBatchesByCollege = async (req, res) => {
  try {
    const { collegeName } = req.query;
    if (!collegeName) return res.status(400).json({ error: "collegeName required" });

    const query = { isPassout: false, collegeName: new RegExp(`^${escapeRegex(collegeName.trim())}$`, "i") };
    const batches = await User.distinct("batch", query);
    res.json((batches || []).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get distinct programs for college + batch
export const getProgramsByCollegeBatch = async (req, res) => {
  try {
    const { collegeName, batch } = req.query;
    if (!collegeName || !batch) return res.status(400).json({ error: "collegeName and batch required" });

    const query = {
      isPassout: false,
      collegeName: new RegExp(`^${escapeRegex(collegeName.trim())}$`, "i"),
      batch: batch,
    };
    const programs = await User.distinct("programName", query);
    res.json((programs || []).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get distinct technologies for college + batch + program
export const getTechnologiesByCollegeBatchProgram = async (req, res) => {
  try {
    const { collegeName, batch, programName } = req.query;
    if (!collegeName || !batch || !programName) return res.status(400).json({ error: "collegeName, batch and programName required" });

    const query = {
      isPassout: false,
      collegeName: new RegExp(`^${escapeRegex(collegeName.trim())}$`, "i"),
      batch,
      programName,
    };
    const technologies = await User.distinct("technology", query);
    res.json((technologies || []).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get students for a given filters (college -> batch -> program -> technology) (current students only)
export const getStudentsByProgramTech = async (req, res) => {
  try {
    const { collegeName, batch, programName, technology } = req.query;
    if (!programName || !technology) return res.status(400).json({ error: "programName and technology required" });

    const query = { programName, technology, isPassout: false };

    if (collegeName) {
      query.collegeName = new RegExp(`^${escapeRegex(collegeName.trim())}$`, "i");
    }
    if (batch) {
      query.batch = batch;
    }

    const students = await User.find(query).select("name email usn batch programName technology profilePic");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark attendance for many students for a date
export const markAttendance = async (req, res) => {
  try {
    const { date, records } = req.body; // records: [{ studentId, status }]
    if (!date || !records || !Array.isArray(records)) return res.status(400).json({ error: "date and records array required" });
    // normalize date to UTC day bounds to avoid timezone mismatches
    const attendanceDate = new Date(date);
    const start = new Date(attendanceDate);
    start.setHours(0,0,0,0);
    const end = new Date(attendanceDate);
    end.setHours(23,59,59,999);
    const markedBy = req.user?.id;

    // Remove existing attendance for that date and students to avoid duplicates
    const studentIds = records.map(r => r.studentId);
    await Attendance.deleteMany({ student: { $in: studentIds }, date: { $gte: start, $lte: end } });

    const docs = records.map(r => ({
      student: r.studentId,
      date: start, // store date normalized to start of day
      status: r.status,
      programName: r.programName || "",
      technology: r.technology || "",
      markedBy
    }));

    const result = await Attendance.insertMany(docs);
    res.json({ insertedCount: result.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch attendance records with optional filters
export const getAttendanceRecords = async (req, res) => {
  try {
    const { programName, technology, from, to, date, collegeName, batch, student } = req.query;
    const query = {};
    if (programName) query.programName = programName;
    if (technology) query.technology = technology;
    if (student) query.student = student; // optional: filter by a single student id
    if (collegeName) query.programName = programName; // no-op placeholder (attendance stores programName separately)

    // support exact date query
    if (date) {
      const d = new Date(date);
      const start = new Date(d);
      start.setHours(0,0,0,0);
      const end = new Date(d);
      end.setHours(23,59,59,999);
      query.date = { $gte: start, $lte: end };
    } else if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    // optionally filter by batch if provided
    if (batch) query["programName"] = query["programName"] || undefined; // keep existing programName if present

    const records = await Attendance.find(query).populate("student", "name usn email batch").sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
