import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../StyleComponents/Loader";

export default function ManageExam() {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    examTitle: "",
    examNumber: "",
    visibility: "draft",
    questions: [
      {
        questionText: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
  });
  const [editingExamId, setEditingExamId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewingExam, setViewingExam] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading,setloading]=useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Fetch all exams
  const fetchExams = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        "https://ligand-dev-7.onrender.com/api/exams/examsforadmin"
      );
      setExams(res.data);
      setFilteredExams(res.data);
      setloading(false);
    } catch (err) {
      setloading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Filter exams based on visibility and search term
  useEffect(() => {
    let result = exams;

    if (filter !== "all") {
      result = result.filter((exam) => exam.visibility === filter);
    }

    if (searchTerm) {
      result = result.filter(
        (exam) =>
          exam.examTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exam.examNumber.toString().includes(searchTerm) ||
          exam.questions.some((q) =>
            q.questionText.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredExams(result);
  }, [exams, filter, searchTerm]);

  // Handle input changes
  const handleChange = (e, qIndex, optIndex) => {
    const { name, value } = e.target;
    const newQuestions = [...formData.questions];

    if (name === "questionText") {
      newQuestions[qIndex].questionText = value;
    } else if (name === "answer") {
      newQuestions[qIndex].answer = value;
    } else if (name.startsWith("option")) {
      newQuestions[qIndex].options[optIndex] = value;
    } else {
      setFormData({ ...formData, [name]: value });
      return;
    }

    setFormData({ ...formData, questions: newQuestions });
  };

  // Add new question
  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { questionText: "", options: ["", "", "", ""], answer: "" },
      ],
    });
  };

  // Remove question
  const removeQuestion = (index) => {
    if (formData.questions.length <= 1) return;
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData({ ...formData, questions: newQuestions });
  };

  // Submit form (create or update exam)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sanitizedData = {
        ...formData,
        questions: formData.questions.map((q) => ({
          ...q,
          answer: q.answer || q.options[0] || "",
        })),
      };

      if (editingExamId) {
        await axios.put(
          `https://ligand-dev-7.onrender.com/api/exams/${editingExamId}`,
          sanitizedData
        );
      } else {
        await axios.post("https://ligand-dev-7.onrender.com/api/exams", sanitizedData);
      }

      setFormData({
        examTitle: "",
        examNumber: "",
        visibility: "draft",
        questions: [
          { questionText: "", options: ["", "", "", ""], answer: "" },
        ],
      });
      setEditingExamId(null);
      setIsFormVisible(false);
      fetchExams();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit exam
  const editExam = (exam) => {
    setFormData({
      examTitle: exam.examTitle || "",
      examNumber: exam.examNumber || "",
      visibility: exam.visibility || "draft",
      questions: exam.questions || [
        {
          questionText: "",
          options: ["", "", "", ""],
          answer: "",
        },
      ],
    });
    setEditingExamId(exam._id);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete exam
  const deleteExam = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await axios.delete(`https://ligand-dev-7.onrender.com/api/exams/${id}`);
        fetchExams();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      examTitle: "",
      examNumber: "",
      visibility: "draft",
      questions: [{ questionText: "", options: ["", "", "", ""], answer: "" }],
    });
    setEditingExamId(null);
    setIsFormVisible(false);
  };

  // View exam questions in modal
  const viewExamQuestions = (exam) => {
    setViewingExam(exam);
    setIsViewModalOpen(true);
  };

  // Update exam visibility
  const updateExamVisibility = async (id, visibility) => {
    try {
      const exam = exams.find((exam) => exam._id === id);
      await axios.put(`https://ligand-dev-7.onrender.com/api/exams/${id}`, {
        ...exam,
        visibility,
      });
      fetchExams();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="exam-management-container">
      <h1 className="main-title" data-aos="fade-down">
        Exam Management System
      </h1>

      {/* Filters and Search */}
      <div className="filter-container" data-aos="fade-right">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search exams or questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-group">
          <label className="filter-label">Filter by visibility: </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Exams</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="toggle-form-btn"
        >
          {isFormVisible ? "Hide Form" : "Create New Exam"}
        </button>
      </div>

      {/* Exam Form */}
      {isFormVisible && (
        <div className="form-container" data-aos="fade-up">
          <h2 className="form-title">
            {editingExamId ? "Edit Exam" : "Create New Exam"}
          </h2>
          <form onSubmit={handleSubmit} className="exam-form">
            <div className="form-section">
              <label className="form-label">Exam Title: </label>
              <input
                type="text"
                name="examTitle"
                value={formData.examTitle}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-section">
              <label className="form-label">Exam Number: </label>
              <input
                type="number"
                name="examNumber"
                value={formData.examNumber}
                onChange={handleChange}
                className="form-input"
                required
                disabled={!!editingExamId}
              />
            </div>
            <div className="form-section">
              <label className="form-label">Visibility: </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="form-select"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <h3 className="questions-title">Questions</h3>
            {formData.questions.map((q, qIndex) => (
              <div key={qIndex} className="question-card" data-aos="fade-left">
                <div className="question-header">
                  <h4>Question #{qIndex + 1}</h4>
                  {formData.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="remove-question-btn"
                    >
                      ×
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  name="questionText"
                  placeholder="Enter question text"
                  value={q.questionText}
                  onChange={(e) => handleChange(e, qIndex)}
                  className="question-input"
                  required
                />

                <div className="options-container">
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} className="option-row">
                      <span className="option-label">
                        {String.fromCharCode(65 + optIndex)}.
                      </span>
                      <input
                        type="text"
                        name={`option${optIndex}`}
                        placeholder={`Option ${String.fromCharCode(
                          65 + optIndex
                        )}`}
                        value={opt}
                        onChange={(e) => handleChange(e, qIndex, optIndex)}
                        className="option-input"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="answer-section">
                  <label className="form-label">Correct Answer: </label>
                  <select
                    name="answer"
                    value={q.answer}
                    onChange={(e) => handleChange(e, qIndex)}
                    className="answer-select"
                    required
                  >
                    {q.options.map((opt, optIndex) => (
                      <option key={optIndex} value={opt}>
                        {String.fromCharCode(65 + optIndex)}. {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <div className="form-buttons">
              <button
                type="button"
                onClick={addQuestion}
                className="secondary-btn"
              >
                + Add Question
              </button>
              <button type="submit" className="primary-btn">
                {editingExamId ? "Update Exam" : "Create Exam"}
              </button>
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Exams List */}
      <div className="exams-container">
        <h2 className="section-title" data-aos="fade-right">
          {filteredExams.length} {filter === "all" ? "" : filter} Exam(s) Found
        </h2>

        {loading && <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>}
        {(!loading && filteredExams.length === 0) ? (
          <div className="no-exams" data-aos="fade-up">
            <h3>No exams found</h3>
            <p>Create your first exam to get started!</p>
          </div>
        ) : (
          <div className="exams-grid">
            {filteredExams.map((exam, index) => (
              <div
                key={exam._id}
                className="exam-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="exam-title">{exam.examTitle}</h3>
                <br />
                <div className="exam-card-header">
                  {/* Visibility Toggle */}
                  <div className="visibility-toggle">
                    <span className="visibility-label">Visibility:</span>
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        id={`toggle-${exam._id}`}
                        checked={exam.visibility === "public"}
                        onChange={(e) =>
                          updateExamVisibility(
                            exam._id,
                            e.target.checked ? "public" : "private"
                          )
                        }
                        className="toggle-input"
                      />
                      <label
                        htmlFor={`toggle-${exam._id}`}
                        className="toggle-label"
                      >
                        <span className="toggle-public">Public</span>
                        <span className="toggle-private">Private</span>
                      </label>
                    </div>
                  </div>

                  {/* Show Result Toggle */}
                  <div className="result-toggle" style={{ marginLeft: 12 }}>
                    <span className="visibility-label">Show Result:</span><br />
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        id={`result-toggle-${exam._id}`}
                        checked={!!exam.showResult}
                        onChange={async (e) => {
                          try {
                            await axios.put(
                              `https://ligand-dev-7.onrender.com/api/exams/${exam._id}/show-result`,
                              { showResult: e.target.checked }
                            );
                            fetchExams();
                          } catch (err) {
                            console.error("Failed to update showResult", err);
                            alert("Failed to update show result");
                          }
                        }}
                        className="toggle-input"
                      />
                      <label
                        htmlFor={`result-toggle-${exam._id}`}
                        className="toggle-label"
                      >
                        <span className="toggle-public">On</span>
                        <span className="toggle-private">Off</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="exam-meta">
                  <span className="exam-number">Exam #{exam.examNumber}</span>
                  <span className="questions-count">
                    {exam.questions.length} questions
                  </span>
                </div>

                <div className="exam-actions">
                  <button
                    onClick={() => viewExamQuestions(exam)}
                    className="view-questions-btn"
                  >
                    View Questions
                  </button>
                  <button
                    onClick={() => editExam(exam)}
                    className="edit-exam-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExam(exam._id)}
                    className="delete-exam-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Questions Modal */}
      {isViewModalOpen && viewingExam && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{viewingExam.examTitle} - Questions</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="modal-close-btn"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="questions-list">
                {viewingExam.questions.map((q, idx) => (
                  <div key={idx} className="modal-question-item">
                    <p className="modal-question-text">
                      <strong>Q{idx + 1}:</strong> {q.questionText}
                    </p>
                    <div className="modal-options-grid">
                      {q.options.map((opt, oidx) => (
                        <div
                          key={oidx}
                          className={`modal-option-item ${
                            opt === q.answer ? "correct" : ""
                          }`}
                        >
                          <span className="modal-option-letter">
                            {String.fromCharCode(65 + oidx)}
                          </span>
                          <span className="modal-option-text">{opt}</span>
                          {opt === q.answer && (
                            <span className="modal-correct-indicator">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="modal-close-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Global Styles */
        .exam-management-container {
          padding: 2rem;

          margin: 0 auto;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
        }

        .main-title {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 2rem;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Filter Container */
        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
          outline: none;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #7f8c8d;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-label {
          font-weight: 600;
          color: #2c3e50;
        }

        .filter-select {
          padding: 0.75rem;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          cursor: pointer;
        }

        .toggle-form-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #5d94ff 0%, #b252c9 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(52, 152, 219, 0.3);
        }

        .toggle-form-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(52, 152, 219, 0.4);
        }

        /* Form Container */
        .form-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
        }

        .form-title {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .exam-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-weight: 600;
          color: #2c3e50;
          font-size: 1rem;
        }

        .form-input,
        .form-select {
          padding: 0.875rem;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
          outline: none;
        }

        .questions-title {
          color: #2c3e50;
          margin-top: 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
        }

        /* Question Card */
        .question-card {
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          padding: 1.5rem;
          background: #f9fafb;
          margin-bottom: 1rem;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .question-header h4 {
          color: #2c3e50;
          margin: 0;
          font-size: 1.2rem;
        }

        .remove-question-btn {
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .remove-question-btn:hover {
          background: #c0392b;
          transform: scale(1.1);
        }

        .question-input {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .question-input:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
          outline: none;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .option-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .option-label {
          font-weight: bold;
          min-width: 25px;
          color: #2c3e50;
        }

        .option-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .option-input:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
          outline: none;
        }

        .answer-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .answer-select {
          padding: 0.75rem;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .answer-select:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
          outline: none;
        }

        /* Form Buttons */
        .form-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .primary-btn {
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(46, 204, 113, 0.3);
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(46, 204, 113, 0.4);
        }

        .secondary-btn {
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(52, 152, 219, 0.3);
        }

        .secondary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(52, 152, 219, 0.4);
        }

        .cancel-btn {
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(149, 165, 166, 0.3);
        }

        /* Exams Container */
        .exams-container {
          margin-top: 2rem;
        }

        .section-title {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .no-exams {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .no-exams h3 {
          color: #7f8c8d;
          margin-bottom: 1rem;
        }

        .exams-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        /* Exam Card */
        .exam-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
          transition: all 0.3s ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .exam-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .exam-card-header {
          display: flex;
          background: rgba(241, 241, 241, 1);
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          border-radius: inherit;
        }

        .exam-title {
          color: #565656ff;
          margin: 0;
          font-size: 1.4rem;
          font-weight: 600;
          flex: 1;
        }

        .visibility-toggle {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .visibility-label {
          font-size: 0.8rem;
          color: #565656ff;
          font-weight: 500;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 100px;
          height: 32px;
        }

        .toggle-input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-label {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #e74c3c;
          border-radius: 16px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          font-weight: 600;
          font-size: 0.8rem;
          color: white;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .toggle-input:checked + .toggle-label {
          background-color: #2ecc71;
        }

        .toggle-label:before {
          content: "";
          position: absolute;
          height: 26px;
          width: 26px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .toggle-input:checked + .toggle-label:before {
          transform: translateX(68px);
        }

        .toggle-public,
        .toggle-private {
          z-index: 2;
          transition: all 0.3s ease;
        }

        .toggle-private {
          opacity: 1;
        }

        .toggle-input:checked + .toggle-label .toggle-private {
          opacity: 0;
        }

        .toggle-input:not(:checked) + .toggle-label .toggle-public {
          opacity: 0;
        }

        .exam-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #7f8c8d;
        }

        .exam-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: auto;
        }

        .view-questions-btn,
        .edit-exam-btn,
        .delete-exam-btn {
          padding: 0.6rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
        }

        .view-questions-btn {
          background: linear-gradient(135deg, #5087ffa1 0%, #5429b9b6 100%);
          color: #ffffffff;
        }

        .view-questions-btn:hover {
          background:  linear-gradient(135deg, #5087ffb4 0%, #5429b9a0 100%);
          transform: translateY(-2px);
        }

        .edit-exam-btn {
          background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
          color: white;
        }

        .edit-exam-btn:hover {
          background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
          transform: translateY(-2px);
        }

        .delete-exam-btn {
          background: linear-gradient(135deg, #ec6859ff 0%, #c0392b 100%);
          color: white;
        }

        .delete-exam-btn:hover {
          background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
          transform: translateY(-2px);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
          color: white;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .questions-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .modal-question-item {
          padding: 1.5rem;
          border: 1px solid #e1e5e9;
          border-radius: 8px;
          background: #f9fafb;
        }

        .modal-question-text {
          margin: 0 0 1rem 0;
          color: #2c3e50;
          font-size: 1rem;
          line-height: 1.5;
        }

        .modal-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .modal-option-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 6px;
          background: white;
          border: 1px solid #e1e5e9;
          font-size: 0.9rem;
        }

        .modal-option-item.correct {
          background: #e8f5e9;
          border: 1px solid #c8e6c9;
        }

        .modal-option-letter {
          font-weight: bold;
          color: #2c3e50;
          min-width: 20px;
        }

        .modal-option-text {
          flex: 1;
        }

        .modal-correct-indicator {
          color: #2e7d32;
          font-weight: bold;
        }

        .modal-footer {
          padding: 1rem 1.5rem;
          background: #f5f7fa;
          display: flex;
          justify-content: flex-end;
        }

        .modal-close-button {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close-button:hover {
          background: linear-gradient(135deg, #2980b9 0%, #2573a7 100%);
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .exam-management-container {
            padding: 1rem;
          }

          .filter-container {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box,
          .filter-group {
            width: 100%;
          }

          .exams-grid {
            grid-template-columns: 1fr;
          }

          .exam-card-header {
            flex-direction: column;
            gap: 1rem;
          }

          .visibility-toggle {
            align-items: flex-start;
          }

          .exam-actions {
            flex-direction: column;
          }

          .modal-options-grid {
            grid-template-columns: 1fr;
          }

          .form-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
