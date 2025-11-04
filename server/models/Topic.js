import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
});

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    questions: [questionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);
