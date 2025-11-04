import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX } from "react-icons/fi";
import "./InterviewControl.css";

const API_BASE = "https://ligand-software-solutions-workshop-2.onrender.com/api";

const AdminPage = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Fetch all topics
  const fetchTopics = async () => {
    try {
      const res = await axios.get(`${API_BASE}/topics`);
      if (res.data.success) setTopics(res.data.data);
    } catch (err) {
      console.error("Fetch topics error:", err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Create new topic
  const createTopic = async () => {
    if (!newTopic.trim()) return;
    try {
      await axios.post(`${API_BASE}/topics`, { name: newTopic.trim() });
      setNewTopic("");
      fetchTopics();
    } catch (err) {
      console.error("Create topic error:", err);
    }
  };
const fetchTopic = async (topicId) => {
  try {
    const res = await axios.get(`${API_BASE}/topics/${topicId}`);
    if (res.data.success) setSelectedTopic(res.data.data); // update the selected topic only
  } catch (err) {
    console.error("Fetch topic error:", err);
  }
};

  // Delete topic (and all its questions)
  const deleteTopic = async (topicId) => {
    if (!window.confirm("Are you sure you want to delete this topic and all its questions?")) return;
    try {
      await axios.delete(`${API_BASE}/topics/${topicId}`);
      // If the deleted topic was selected, clear selection
      if (selectedTopic?._id === topicId) setSelectedTopic(null);
      fetchTopic(selectedTopic._id);
    } catch (err) {
      console.error("Delete topic error:", err);
    }
  };

  // Add question
  const addQuestion = async () => {
    if (!questionText.trim() || !selectedTopic) return;
    try {
      await axios.post(`${API_BASE}/topics/${selectedTopic._id}/questions`, {
        question: questionText.trim(),
      });
      setQuestionText("");
      fetchTopic(selectedTopic._id);
    } catch (err) {
      console.error("Add question error:", err);
    }
  };

  // Delete question
  const deleteQuestion = async (topicId, questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(
        `${API_BASE}/topics/${topicId}/questions/${questionId}`
      );
      fetchTopic(selectedTopic._id);
    } catch (err) {
      console.error("Delete question error:", err);
    }
  };

  // Edit question
  const startEditing = (q) => {
    setEditingQuestion(q);
    setQuestionText(q.question);
  };

  const cancelEditing = () => {
    setEditingQuestion(null);
    setQuestionText("");
  };

  const saveEditedQuestion = async () => {
    if (!questionText.trim() || !editingQuestion) return;
    try {
      await axios.put(
        `${API_BASE}/topics/${selectedTopic._id}/questions/${editingQuestion._id}`,
        { question: questionText.trim() }
      );
      setEditingQuestion(null);
      setQuestionText("");
      fetchTopic(selectedTopic._id);
    } catch (err) {
      console.error("Edit question error:", err);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Interview Questions Admin Dashboard</h1>
        <p>Manage topics and questions for your interview preparation</p>
      </div>

      {/* Create topic */}
      <div className="create-topic">
        <input
          type="text"
          placeholder="Enter new topic name"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && createTopic()}
        />
        <button onClick={createTopic}>
          <FiPlus /> Create Topic
        </button>
      </div>

      {/* Topic selection with delete button */}
      <div className="select-topic">
        <label>Select Topic:</label>
        <div className="topic-options">
          <select
            value={selectedTopic?._id || ""}
            onChange={(e) => {
              const topic = topics.find((t) => t._id === e.target.value);
              setSelectedTopic(topic || null);
              setEditingQuestion(null);
              setQuestionText("");
            }}
          >
            <option value="">-- Select a Topic --</option>
            {topics.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          {selectedTopic && (
            <button
              className="delete-topic-btn"
              onClick={() => deleteTopic(selectedTopic._id)}
            >
              <FiTrash2 /> Delete Topic
            </button>
          )}
        </div>
      </div>

      {selectedTopic ? (
        <div className="questions-section">
          <h2>Questions for "{selectedTopic.name}"</h2>

          {/* Add/Edit question */}
          <textarea
            placeholder="Enter your question here..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={3}
          />
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {editingQuestion ? (
              <>
                <button onClick={saveEditedQuestion} className="add-question-btn">
                  <FiSave /> Save Question
                </button>
                <button onClick={cancelEditing} style={{ backgroundColor: '#6c757d' }} className="add-question-btn">
                  <FiX /> Cancel
                </button>
              </>
            ) : (
              <button onClick={addQuestion} className="add-question-btn">
                <FiPlus /> Add Question
              </button>
            )}
          </div>

          {/* List of questions */}
          {selectedTopic.questions && selectedTopic.questions.length > 0 ? (
            <ul className="questions-list">
              {selectedTopic.questions.map((q) => (
                <li key={q._id}>
                  <div>{q.question}</div>
                  <div className="question-actions">
                    <button onClick={() => startEditing(q)}>
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteQuestion(selectedTopic._id, q._id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>No questions yet for this topic.</p>
              <p>Add your first question using the form above.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <p>Select a topic to view and manage questions, or create a new topic.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPage;