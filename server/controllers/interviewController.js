import InterviewScore from "../models/InterviewScore.js";

// Save interview score
export const saveInterviewScore = async (req, res) => {
  try {
    const { username, topicId, score, total, strengths, weaknesses } = req.body;

    const interview = new InterviewScore({
      username,
      topicId,
      score,
      total,
      strengths,
      weaknesses,
    });

    await interview.save();
    res.status(201).json({ success: true, data: interview });
  } catch (err) {
    console.error("Save interview score error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get scores for a user
export const getUserScores = async (req, res) => {
  try {
    const { username } = req.params;
    const scores = await InterviewScore.find({ username }).populate("topicId", "name");
    res.json({ success: true, data: scores });
  } catch (err) {
    console.error("Get user scores error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all scores (for admin)
export const getAllScores = async (req, res) => {
  try {
    const scores = await InterviewScore.find().populate("topicId", "name");
    res.json({ success: true, data: scores });
  } catch (err) {
    console.error("Get all scores error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
