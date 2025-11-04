// routes/examRoutes.js
import { Router } from "express";
const router = Router();
import { createExam, getExams, getExamById, updateExam, deleteExam, getExamsforadmin, toggleCollegeAccess, getExamsForUser, toggleShowResult } from "../controllers/examController.js";

router.post("/", createExam);
router.get("/", getExams);
router.get("/examsforadmin",getExamsforadmin);
router.get("/:id", getExamById);
router.put("/:id", updateExam);
router.delete("/:id", deleteExam);
router.put("/exams/:id/college", toggleCollegeAccess);
router.put("/:id/show-result", toggleShowResult);
router.get("/foruser/:collegeName", getExamsForUser);

export default router;