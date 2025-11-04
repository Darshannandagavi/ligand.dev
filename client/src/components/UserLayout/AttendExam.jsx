import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AttendExam() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [timeoutMessage, setTimeoutMessage] = useState("");
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState({
    exams: true,
    submission: false,
    examStart: false,
  });

  const studentId = localStorage.getItem("userId");
  const studentName = localStorage.getItem("username") || "Student";
  const collegeName = localStorage.getItem("collegeName");

  useEffect(() => {
    async function fetchExams() {
      try {
        setLoading((prev) => ({ ...prev, exams: true }));
        const res = await axios.get(
          `https://ligand-software-solutions-workshop-2.onrender.com/api/exams/foruser/${collegeName}`
        );
        setExams(res.data);
      } catch (err) {
        console.error("Error fetching exams:", err);
      } finally {
        setLoading((prev) => ({ ...prev, exams: false }));
      }
    }
    if (collegeName) fetchExams();
  }, [collegeName]);

  useEffect(() => {
    if (!selectedExam || submitted) return;

    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    if (timeLeft <= 10 && !alertShown) {
      alert("Only 10 seconds remaining!");
      setAlertShown(true);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedExam, submitted, alertShown]);

  useEffect(() => {
    if (selectedExam && !submitted) {
      enterFullScreen();
    }
  }, [selectedExam, submitted]);

  const enterFullScreen = () => {
    const elem = document.getElementById("exam-container");
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.log("Fullscreen error:", err);
      });
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.log("Exit fullscreen error:", err);
      });
    }
    setIsFullScreen(false);
  };

  const handleAutoSubmit = () => {
    setTimeoutMessage("Time's up! Your answers have been submitted automatically.");
    handleSubmit();
  };

  const startExam = async (exam) => {
    try {
      setLoading((prev) => ({ ...prev, examStart: true }));
      setSelectedExam(exam);
      setAnswers({});
      setSubmitted(false);
      setResult(null);
      setTimeLeft(exam.duration || 1800);
      setCurrentQuestion(0);
      setReviewQuestions([]);
      setTimeoutMessage("");
      setAlertShown(false);
    } catch (error) {
      console.error("Error starting exam:", error);
    } finally {
      setLoading((prev) => ({ ...prev, examStart: false }));
    }
  };

  const handleAnswerChange = (qId, optionIndex) => {
    setAnswers({ ...answers, [qId]: optionIndex });
    setReviewQuestions((prev) => prev.filter((id) => id !== qId));
  };

  const markForReview = (qId) => {
    if (!reviewQuestions.includes(qId)) {
      setReviewQuestions([...reviewQuestions, qId]);
    } else {
      setReviewQuestions(reviewQuestions.filter((id) => id !== qId));
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = async () => {
    try {
      setLoading((prev) => ({ ...prev, submission: true }));
      const payload = {
        examId: selectedExam._id,
        studentId: studentId,
        answers: selectedExam.questions.map((q) => ({
          questionId: q._id,
          chosenAnswer:
            answers[q._id] !== undefined
              ? q.options[answers[q._id]]
              : "NOT ANSWERED",
        })),
      };

      const res = await axios.post(
        "https://ligand-software-solutions-workshop-2.onrender.com/api/attempts/submit",
        payload
      );

      setResult(res.data.attempt);
      setSubmitted(true);
      exitFullScreen();
    } catch (err) {
      console.error("Error submitting exam:", err);
      alert("Error submitting exam!");
    } finally {
      setLoading((prev) => ({ ...prev, submission: false }));
    }
  };

  const backToList = () => {
    setSelectedExam(null);
    setSubmitted(false);
    setResult(null);
    exitFullScreen();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const formatMinutes = (seconds) => {
    return `${Math.floor(seconds / 60)} minutes`;
  };

  if (loading.exams) {
    return (
      <div className="exam-container">
        <div className="loading-container" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <div className="spinner"></div>
          <p className="mt-3">Loading exams...</p>
        </div>
      </div>
    );
  }

  if (!selectedExam) {
    return (
      <div className="exam-home-container">
        <div className="exam-home-header">
          <h1>Available Exams</h1>
          <p>Welcome, {studentName}</p>
        </div>
        
        <div className="exam-grid">
          {exams.length === 0 ? (
            <div className="no-exams-card">
              <div className="no-exams-icon">📚</div>
              <h3>No exams available</h3>
              <p>There are no exams available for your college at this time.</p>
            </div>
          ) : (
            exams.map((exam) => (
              <div key={exam._id} className="exam-card">
                <div className="exam-card-header">
                  <h3>{exam.examTitle || `Exam #${exam.examNumber}`}</h3>
                  <span className="exam-badge">{exam.questions.length} Questions</span>
                </div>
                
                <div className="exam-card-body">
                  <div className="exam-info">
                    <div className="info-item">
                      <span className="info-icon">⏱️</span>
                      <span>{formatMinutes(exam.duration || 1800)}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📅</span>
                      <span>{new Date(exam.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="exam-description">
                    <p>Prepare yourself for this important assessment. Make sure you have a stable internet connection and enough time to complete the exam.</p>
                  </div>
                </div>
                
                <div className="exam-card-footer">
                  <button 
                    className="start-exam-btn"
                    onClick={() => startExam(exam)}
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <style>{`
          .exam-home-container {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .exam-home-header {
            text-align: center;
            margin-bottom: 2.5rem;
            color: #2c3e50;
          }
          
          .exam-home-header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
          }
          
          .exam-home-header p {
            font-size: 1.1rem;
            color: #7f8c8d;
          }
          
          .exam-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
          }
          
          .exam-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
          }
          
          .exam-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
          }
          
          .exam-card-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem;
            position: relative;
          }
          
          .exam-card-header h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.4rem;
          }
          
          .exam-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
          }
          
          .exam-card-body {
            padding: 1.5rem;
            flex-grow: 1;
          }
          
          .exam-info {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            margin-bottom: 1.5rem;
          }
          
          .info-item {
            display: flex;
            align-items: center;
            gap: 0.7rem;
            color: #34495e;
          }
          
          .info-icon {
            font-size: 1.1rem;
          }
          
          .exam-description {
            border-top: 1px solid #f1f2f6;
            padding-top: 1.2rem;
          }
          
          .exam-description p {
            color: #7f8c8d;
            line-height: 1.5;
            margin: 0;
          }
          
          .exam-card-footer {
            padding: 1.2rem 1.5rem;
            background: #f9fafc;
            border-top: 1px solid #f1f2f6;
          }
          
          .start-exam-btn {
            width: 100%;
            padding: 0.9rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .start-exam-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(37, 117, 252, 0.3);
          }
          
          .no-exams-card {
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }
          
          .no-exams-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
          }
          
          .no-exams-card h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
          }
          
          .no-exams-card p {
            color: #7f8c8d;
            max-width: 500px;
            margin: 0 auto;
            line-height: 1.6;
          }
          
          @media (max-width: 768px) {
            .exam-home-container {
              padding: 1.5rem;
            }
            
            .exam-grid {
              grid-template-columns: 1fr;
            }
            
            .exam-home-header h1 {
              font-size: 2rem;
            }
          }
        `}</style>
      </div>
    );
  }

  if (submitted && result) {
    // Only display the detailed result if admin has allowed showing results
    if (selectedExam && !selectedExam.showResult) {
      return (
        <div className="exam-container">
          <div className="result-card">
            <div className="result-icon">🔒</div>
            <h3>Results Hidden</h3>
            <p>The exam results are currently hidden by the administrator. Please check back later.</p>
            {timeoutMessage && <div className="alert">{timeoutMessage}</div>}
            <button className="back-to-exams-btn" onClick={backToList}>
              Back to Exams
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="exam-container">
        <div className="result-card">
          <div className="result-icon">🎉</div>
          <h3>Congratulations!</h3>
          <p>Exam Submitted Successfully</p>
          {timeoutMessage && <div className="alert">{timeoutMessage}</div>}
          <button className="back-to-exams-btn" onClick={backToList}>
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  const currentQ = selectedExam.questions[currentQuestion];
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = selectedExam.questions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div id="exam-container" className="fullscreen-exam">
      <div className="exam-topbar">
        <div className="exam-title">
          <h4>{selectedExam.examTitle || `Exam #${selectedExam.examNumber}`}</h4>
          <span className="student-name">{studentName}</span>
        </div>
        
        <div className="exam-controls">
          <div className="timer-container">
            <div className="timer-icon">⏱️</div>
            <div className="timer">{formatTime(timeLeft)}</div>
          </div>
          
          <div className="progress-container">
            <div className="progress-text">
              {answeredQuestions}/{totalQuestions} Answered
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${(answeredQuestions/totalQuestions) * 100}%`}}
              ></div>
            </div>
          </div>
          
          <button className="submit-exam-btn" onClick={handleSubmit}>
            Submit Exam
          </button>
        </div>
      </div>

      <div className="exam-content">
        <div className="sidebar">
          <div className="sidebar-header">
            <h5>Questions</h5>
            <div className="status-legend">
              <div className="legend-item">
                <div className="legend-color answered"></div>
                <span>Answered</span>
              </div>
              <div className="legend-item">
                <div className="legend-color marked"></div>
                <span>Marked</span>
              </div>
            </div>
          </div>
          
          <div className="questions-grid">
            {selectedExam.questions.map((q, index) => {
              const isAnswered = answers[q._id] !== undefined;
              const isMarked = reviewQuestions.includes(q._id);
              const isCurrent = index === currentQuestion;

              let questionClass = "question-number ";
              if (isCurrent) questionClass += "current ";
              if (isAnswered) questionClass += "answered ";
              else if (isMarked) questionClass += "marked ";

              return (
                <div
                  key={q._id}
                  className={questionClass}
                  onClick={() => goToQuestion(index)}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
          
          <button 
            className="mark-review-btn"
            onClick={() => markForReview(currentQ._id)}
          >
            {reviewQuestions.includes(currentQ._id) 
              ? "Unmark for Review" 
              : "Mark for Review"}
          </button>
        </div>

        <div className="question-area">
          <div className="question-header">
            <h5>Question {currentQuestion + 1} of {totalQuestions}</h5>
            <div className="question-status">
              {answers[currentQ._id] !== undefined ? (
                <span className="status-badge answered">Answered</span>
              ) : (
                <span className="status-badge not-answered">Not Answered</span>
              )}
              {reviewQuestions.includes(currentQ._id) && (
                <span className="status-badge marked">Marked for Review</span>
              )}
            </div>
          </div>
          
          <div className="question-text">
            <p>{currentQ.questionText}</p>
          </div>

          <div className="options-container">
            {currentQ.options.map((opt, optIndex) => (
              <div 
                key={optIndex} 
                className={`option-item ${answers[currentQ._id] === optIndex ? 'selected' : ''}`}
                onClick={() => handleAnswerChange(currentQ._id, optIndex)}
              >
                <div className="option-selector">
                  <div className={`option-circle ${answers[currentQ._id] === optIndex ? 'selected' : ''}`}>
                    {answers[currentQ._id] === optIndex && <div className="option-dot"></div>}
                  </div>
                  <span className="option-letter">{String.fromCharCode(65 + optIndex)}</span>
                </div>
                <div className="option-text">{opt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="exam-nav">
        <button 
          className="nav-btn prev-btn"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>
        
        <div className="nav-page-info">
          Page {currentQuestion + 1} of {totalQuestions}
        </div>
        
        {!isLastQuestion ? (
          <button 
            className="nav-btn next-btn"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next →
          </button>
        ) : (
          <button 
            className="nav-btn submit-btn"
            onClick={handleSubmit}
          >
            Submit Exam
          </button>
        )}
      </div>

      <style>{`
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          margin: 0; 
          background: #f5f7fa;
        }
        
        .fullscreen-exam {
          background: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .exam-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: white;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          z-index: 10;
        }
        
        .exam-title h4 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.4rem;
        }
        
        .student-name {
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        
        .exam-controls {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .timer-container {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          background: #fff6f6;
          padding: 0.7rem 1.2rem;
          border-radius: 12px;
          border: 1px solid #ffecec;
        }
        
        .timer {
          font-weight: 700;
          color: #e74c3c;
          font-size: 1.1rem;
        }
        
        .progress-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 150px;
        }
        
        .progress-text {
          font-size: 0.85rem;
          color: #7f8c8d;
          text-align: center;
        }
        
        .progress-bar {
          height: 8px;
          background: #f1f2f6;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #2575fc, #6a11cb);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .submit-exam-btn {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(135deg, #2575fc, #6a11cb);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .submit-exam-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37, 117, 252, 0.3);
        }
        
        .exam-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .sidebar {
          width: 250px;
          background: #f9fafc;
          border-right: 1px solid #eaeef2;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }
        
        .sidebar-header {
          margin-bottom: 1.5rem;
        }
        
        .sidebar-header h5 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }
        
        .status-legend {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.85rem;
          color: #7f8c8d;
        }
        
        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }
        
        .legend-color.answered {
          background: #28a745;
        }
        
        .legend-color.marked {
          background: #ffc107;
        }
        
        .questions-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.7rem;
          margin-bottom: 1.5rem;
        }
        
        .question-number {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 2px solid #e1e5eb;
          background: white;
          cursor: pointer;
          font-weight: 600;
          color: #7f8c8d;
          transition: all 0.2s ease;
        }
        
        .question-number:hover {
          border-color: #2575fc;
          color: #2575fc;
        }
        
        .question-number.answered {
          background: #28a745;
          border-color: #28a745;
          color: white;
        }
        
        .question-number.marked {
          background: #ffc107;
          border-color: #ffc107;
          color: white;
        }
        
        .question-number.current {
          border: 2px solid #2575fc;
          color: #2575fc;
          box-shadow: 0 0 0 3px rgba(37, 117, 252, 0.2);
        }
        
        .mark-review-btn {
          margin-top: auto;
          padding: 0.8rem;
          background: #f8f9fa;
          border: 1px solid #e1e5eb;
          border-radius: 10px;
          font-weight: 600;
          color: #7f8c8d;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .mark-review-btn:hover {
          background: #6a11cb;
          color: white;
          border-color: #6a11cb;
        }
        
        .question-area {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }
        
        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f2f6;
        }
        
        .question-header h5 {
          margin: 0;
          color: #7f8c8d;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .question-status {
          display: flex;
          gap: 0.7rem;
        }
        
        .status-badge {
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .status-badge.answered {
          background: #e8f5e9;
          color: #28a745;
        }
        
        .status-badge.not-answered {
          background: #ffebee;
          color: #e74c3c;
        }
        
        .status-badge.marked {
          background: #fff8e1;
          color: #f57c00;
        }
        
        .question-text {
          margin-bottom: 2rem;
          font-size: 1.2rem;
          line-height: 1.6;
          color: #2c3e50;
        }
        
        .options-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .option-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem 1.5rem;
          border: 2px solid #f1f2f6;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .option-item:hover {
          border-color: #2575fc;
          background: #f8fbff;
        }
        
        .option-item.selected {
          border-color: #2575fc;
          background: #f0f7ff;
        }
        
        .option-selector {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        
        .option-circle {
          width: 24px;
          height: 24px;
          border: 2px solid #e1e5eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .option-circle.selected {
          border-color: #2575fc;
          background: #2575fc;
        }
        
        .option-dot {
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
        }
        
        .option-letter {
          font-weight: 700;
          color: #7f8c8d;
          min-width: 20px;
        }
        
        .option-item.selected .option-letter {
          color: #2575fc;
        }
        
        .option-text {
          color: #2c3e50;
          line-height: 1.5;
        }
        
        .exam-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: white;
          border-top: 1px solid #eaeef2;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03);
        }
        
        .nav-btn {
          padding: 0.9rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .prev-btn, .next-btn {
          background: #f8f9fa;
          color: #7f8c8d;
        }
        
        .prev-btn:hover:not(:disabled), .next-btn:hover {
          background: #2575fc;
          color: white;
        }
        
        .prev-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        .submit-btn {
          background: linear-gradient(135deg, #2575fc, #6a11cb);
          color: white;
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37, 117, 252, 0.3);
        }
        
        .nav-page-info {
          color: #7f8c8d;
          font-weight: 600;
        }
        
        @media (max-width: 1024px) {
          .sidebar {
            width: 200px;
          }
          
          .questions-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .exam-topbar {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          
          .exam-controls {
            width: 100%;
            justify-content: space-between;
          }
          
          .exam-content {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            order: 2;
            border-right: none;
            border-top: 1px solid #eaeef2;
          }
          
          .question-area {
            order: 1;
          }
          
          .exam-nav {
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .nav-btn {
            flex: 1;
          }
          
          .nav-page-info {
            flex-basis: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}