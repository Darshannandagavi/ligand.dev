import express from "express";
import {updateHomeworkStatus,getStudentHomeworkStatus} from "../controllers/homeworkStatusController.js"
const homeworkstatusRouter = express.Router();

homeworkstatusRouter.post("/", updateHomeworkStatus);
homeworkstatusRouter.get("/:studentId", getStudentHomeworkStatus);

export default homeworkstatusRouter;
