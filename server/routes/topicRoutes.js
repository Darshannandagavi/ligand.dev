import express from "express";
import {
  createTopic,
  getTopics,
  getTopic,
  updateTopicName,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  deleteTopic,
} from "../controllers/topicController.js";
import { saveInterviewScore } from "../controllers/interviewController.js";

const topicrouter = express.Router();

// Topics
topicrouter.post("/", createTopic);
topicrouter.get("/", getTopics);
topicrouter.post("/interview/score", saveInterviewScore);
topicrouter.get("/:id", getTopic);
topicrouter.put("/:id", updateTopicName);
topicrouter.delete("/:id", deleteTopic);

// Questions
topicrouter.post("/:id/questions", addQuestion);
topicrouter.put("/:id/questions/:qid", updateQuestion);   
topicrouter.delete("/:id/questions/:qid", deleteQuestion);

export default topicrouter;
