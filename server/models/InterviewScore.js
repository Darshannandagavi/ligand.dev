import mongoose from "mongoose";

const InterviewScoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  strengths: { type: String },
  weaknesses: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const InterviewScore = mongoose.model("InterviewScore", InterviewScoreSchema);

export default InterviewScore;
