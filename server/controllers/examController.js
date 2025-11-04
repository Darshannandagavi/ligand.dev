// controllers/examController.js
import Exam from "../models/exam.js";

// Create a new exam
export async function createExam(req, res) {
  try {
    if (!req.body.examTitle) {
      return res.status(400).json({ error: "Exam title is required" });
    }
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all exams
export async function getExams(req, res) {
  try {
    const exams = await Exam.find({visibility:"public"});
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single exam by ID
export async function getExamById(req, res) {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update an exam
export async function updateExam(req, res) {
  try {
    console.log("welcome to exam update")
    
    if (!req.body.examTitle) {
      return res.status(400).json({ error: "Exam title is required" });
    }
    console.log("i am here",req.params.id,"i am also here",req.body)
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json({ message: "Exam updated successfully", exam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete an exam
export async function deleteExam(req, res) {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function getExamsforadmin(req, res) {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Toggle showResult flag for an exam (admin)
export async function toggleShowResult(req, res) {
  try {
    const { id } = req.params;
    const { showResult } = req.body; // optional boolean; if omitted we toggle

    const exam = await Exam.findById(id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    if (typeof showResult === 'boolean') {
      exam.showResult = showResult;
    } else {
      exam.showResult = !exam.showResult;
    }

    await exam.save();
    res.json({ message: 'Exam showResult updated', exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// controllers/examController.js
export async function toggleCollegeAccess(req, res) {
  try {
    const { id } = req.params; // exam id
    const { collegeName } = req.body;

    const exam = await Exam.findById(id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    // If exam.collegeName is missing, set it from req.body
    if (!exam.collegeName && collegeName) {
      exam.collegeName = collegeName;
    }

    if (exam.visibleTo.includes(collegeName)) {
      exam.visibleTo = exam.visibleTo.filter(c => c !== collegeName);
    } else {
      exam.visibleTo.push(collegeName);
    }

    await exam.save();
    res.json({ message: "Exam visibility updated", exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getExamsForUser(req, res) {
  try {
    const { collegeName } = req.params;
    const exams = await Exam.find({
      visibility: "public",
      visibleTo: collegeName
    });
    console.log(exams)
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
