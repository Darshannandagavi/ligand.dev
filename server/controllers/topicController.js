import Topic from "../models/Topic.js";

// Create topic with questions
export const createTopic = async (req, res) => {
  try {
    const { name, questions } = req.body; // questions = [{ question }]
    const topic = new Topic({ name, questions });
    await topic.save();
    res.status(201).json({ success: true, data: topic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all topics
export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json({ success: true, data: topics });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single topic
export const getTopic = async (req, res) => {
  try {
    console.log("get topic hit", req.params.id);
    const topic = await Topic.findById(req.params.id);

    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, data: topic });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update topic name
export const updateTopicName = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, data: topic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Add question
export const addQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });

    topic.questions.push({ question });
    await topic.save();

    res.json({ success: true, data: topic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  try {
    const { id, qid } = req.params; // topicId = id
    const { question } = req.body;

    const topic = await Topic.findOneAndUpdate(
      { _id: id, "questions._id": qid },
      { $set: { "questions.$.question": question } },
      { new: true }
    );

    if (!topic) return res.status(404).json({ success: false, message: "Question not found" });

    res.json({ success: true, data: topic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const { id, qid } = req.params; // topicId = id

    const topic = await Topic.findByIdAndUpdate(
      id,
      { $pull: { questions: { _id: qid } } },
      { new: true }
    );

    if (!topic) return res.status(404).json({ success: false, message: "Question not found" });

    res.json({ success: true, data: topic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// Delete topic
export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, message: "Topic deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
