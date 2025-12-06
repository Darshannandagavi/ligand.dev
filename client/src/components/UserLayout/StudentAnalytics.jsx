import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const API = "https://ligand-dev-7.onrender.com/api";

// ----------------------------------------------------------
// SAFE GET
// ----------------------------------------------------------
async function safeGet(url, config = {}) {
  try {
    const res = await axios.get(url, config);
    return res?.data || null;
  } catch (err) {
    console.warn("SAFE GET FAILED:", url);
    return null;
  }
}

export default function StudentAnalytics() {
  const [data, setData] = useState({
    attendance: [],
    exams: [],
    interview: [],
    fees: [],
    homework: [],
  });

  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState([]);

  // ----------------------------------------------------------
  // LocalStorage
  // ----------------------------------------------------------
  const token = localStorage.getItem("token");
  const studentId = localStorage.getItem("userId");
  const student = JSON.parse(localStorage.getItem("user"));
  const usn = localStorage.getItem("usn");

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // ----------------------------------------------------------
  const loadAnalytics = async () => {
    if (!studentId) return;

    setLoading(true);

    const [attendanceRes, examRes, interviewRes, feeRes, homeworkRes] =
      await Promise.all([
        safeGet(`${API}/attendance?student=${studentId}`),
        safeGet(`${API}/attempts/student/${studentId}`),
        safeGet(`${API}/topics/interviewscore/${usn}`),
        safeGet(
          `${API}/fee-groups/students?collegeName=${student?.collegeName}&batch=${student?.batch}&programName=${student?.programName}&technology=${student?.technology}`,
          authHeader
        ),
        safeGet(`${API}/homeworkstatus/${studentId}`),
      ]);

    setData({
      attendance: attendanceRes || [],
      exams: Array.isArray(examRes) ? examRes : [],
      interview: interviewRes?.data || [],
      fees: Array.isArray(feeRes) ? feeRes : [],
      homework: Array.isArray(homeworkRes) ? homeworkRes : [],
    });

    setLoading(false);
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  // ----------------------------------------------------------
  // CALCULATIONS
  // ----------------------------------------------------------
  const totalDays = data.attendance.length;
  const presentDays = data.attendance.filter(
    (a) => a?.status === "present"
  ).length;
  const attendancePercent = totalDays
    ? Math.round((presentDays / totalDays) * 100)
    : 0;

  let totalFee = 0,
    paidFee = 0,
    pendingFee = 0;

  if (data.fees.length > 0) {
    const entry = data.fees[0]?.students?.find(
      (s) => String(s.student?._id) === String(studentId)
    );

    if (entry) {
      totalFee = entry.totalFee ?? 0;
      paidFee = entry.paidFee ?? 0;
      pendingFee = entry.currentFee ?? 0;
    }
  }

  // Calculate average exam score
  const averageExamScore = data.exams.length > 0
    ? Math.round(data.exams.reduce((acc, exam) => acc + (exam?.percentage || 0), 0) / data.exams.length)
    : 0;

  // Calculate average interview score
  const averageInterviewScore = data.interview.length > 0
    ? Math.round(data.interview.reduce((acc, score) => acc + (score?.score || 0), 0) / data.interview.length)
    : 0;

  // Calculate homework completion rate
  const completedHomework = data.homework.filter(hw => hw?.status === 'completed' || hw?.status === 'graded').length;
  const homeworkCompletionRate = data.homework.length > 0
    ? Math.round((completedHomework / data.homework.length) * 100)
    : 0;

  // Open modal with data
  const openModal = (modalType, modalData) => {
    setActiveModal(modalType);
    setModalData(modalData);
  };

  if (loading) {
    return (
      <div className="student-analytics-loader">
        <div className="student-analytics-spinner"></div>
        <p>Loading your analytics dashboard...</p>
      </div>
    );
  }

  return (
    <div className="student-analytics-container">
      {/* Header */}
      <header className="student-analytics-header">
        <h1 className="student-analytics-title"><MdOutlineSpaceDashboard/> Student Analytics Dashboard</h1>
        <p className="student-analytics-subtitle">Comprehensive overview of your academic performance and progress</p>
      </header>

      {/* Stats Overview Cards */}
      <div className="student-analytics-stats-grid">
        <div className="student-analytics-stat-card student-analytics-stat-attendance">
          <div className="student-analytics-stat-icon">📅</div>
          <div className="student-analytics-stat-content">
            <h3>{attendancePercent}%</h3>
            <p>Attendance</p>
            <span>{presentDays}/{totalDays} days</span>
          </div>
        </div>

        <div className="student-analytics-stat-card student-analytics-stat-exam">
          <div className="student-analytics-stat-icon">📝</div>
          <div className="student-analytics-stat-content">
            <h3>{averageExamScore}%</h3>
            <p>Avg. Exam Score</p>
            <span>{data.exams.length} exams taken</span>
          </div>
        </div>

        <div className="student-analytics-stat-card student-analytics-stat-interview">
          <div className="student-analytics-stat-icon">🎤</div>
          <div className="student-analytics-stat-content">
            <h3>{averageInterviewScore}/10</h3>
            <p>Interview Score</p>
            <span>{data.interview.length} sessions</span>
          </div>
        </div>

        <div className="student-analytics-stat-card student-analytics-stat-homework">
          <div className="student-analytics-stat-icon">📚</div>
          <div className="student-analytics-stat-content">
            <h3>{homeworkCompletionRate}%</h3>
            <p>Homework Done</p>
            <span>{completedHomework}/{data.homework.length} completed</span>
          </div>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="student-analytics-grid">
        {/* Attendance Card */}
        <div className="student-analytics-card student-analytics-card-attendance">
          <div className="student-analytics-card-header">
            <h2 className="student-analytics-card-title">Attendance Overview</h2>
            <span className="student-analytics-card-badge">{attendancePercent}%</span>
          </div>
          <div className="student-analytics-card-content">
            <div className="student-analytics-progress">
              <div 
                className="student-analytics-progress-bar student-analytics-progress-attendance"
                style={{ width: `${attendancePercent}%` }}
              ></div>
            </div>
            <div className="student-analytics-stats-row">
              <div className="student-analytics-stat-item">
                <span className="student-analytics-stat-value">{presentDays}</span>
                <span className="student-analytics-stat-label">Present</span>
              </div>
              <div className="student-analytics-stat-item">
                <span className="student-analytics-stat-value">{totalDays - presentDays}</span>
                <span className="student-analytics-stat-label">Absent</span>
              </div>
              <div className="student-analytics-stat-item">
                <span className="student-analytics-stat-value">{totalDays}</span>
                <span className="student-analytics-stat-label">Total Days</span>
              </div>
            </div>
            <button 
              className="student-analytics-view-details"
              onClick={() => openModal('attendance', data.attendance)}
            >
              View Full Details →
            </button>
          </div>
        </div>

        {/* Exam Performance Card */}
        <div className="student-analytics-card student-analytics-card-exam">
          <div className="student-analytics-card-header">
            <h2 className="student-analytics-card-title">Exam Performance</h2>
            <span className="student-analytics-card-badge">{data.exams.length} exams</span>
          </div>
          <div className="student-analytics-card-content">
            {data.exams.length === 0 ? (
              <p className="student-analytics-no-data">No exams attempted yet</p>
            ) : (
              <>
                <div className="student-analytics-exam-list">
                  {data.exams.slice(0, 3).map((ex, i) => (
                    <div key={i} className="student-analytics-exam-item">
                      <span className="student-analytics-exam-name">{ex?.exam?.examTitle || `Exam ${i + 1}`}</span>
                      <div className="student-analytics-exam-score">
                        <span className="student-analytics-exam-percentage">{ex?.percentage || 0}%</span>
                        <div className="student-analytics-exam-progress">
                          <div 
                            className="student-analytics-exam-progress-bar"
                            style={{ width: `${ex?.percentage || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="student-analytics-view-details"
                  onClick={() => openModal('exams', data.exams)}
                >
                  View All Exams →
                </button>
              </>
            )}
          </div>
        </div>

        {/* Interview Coaching Card */}
        <div className="student-analytics-card student-analytics-card-interview">
          <div className="student-analytics-card-header">
            <h2 className="student-analytics-card-title">Interview Coaching</h2>
            <span className="student-analytics-card-badge">{data.interview.length} sessions</span>
          </div>
          <div className="student-analytics-card-content">
            {data.interview.length === 0 ? (
              <p className="student-analytics-no-data">No interview sessions yet</p>
            ) : (
              <>
                <div className="student-analytics-interview-list">
                  {data.interview.slice(0, 3).map((sc, i) => (
                    <div key={i} className="student-analytics-interview-item">
                      <div className="student-analytics-interview-topic">
                        {sc?.topicId?.name || `Topic ${i + 1}`}
                      </div>
                      <div className="student-analytics-interview-score">
                        <span className="student-analytics-score-value">{sc?.score || 0}/{sc?.total || 10}</span>
                        <div className="student-analytics-score-circle">
                          <svg width="60" height="60">
                            <circle 
                              cx="30" 
                              cy="30" 
                              r="25" 
                              className="student-analytics-score-circle-bg"
                            />
                            <circle 
                              cx="30" 
                              cy="30" 
                              r="25" 
                              className="student-analytics-score-circle-fill"
                              strokeDasharray={`${((sc?.score || 0) / (sc?.total || 10)) * 157} 157`}
                            />
                          </svg>
                          <span className="student-analytics-score-percentage">
                            {Math.round(((sc?.score || 0) / (sc?.total || 10)) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="student-analytics-view-details"
                  onClick={() => openModal('interview', data.interview)}
                >
                  View All Sessions →
                </button>
              </>
            )}
          </div>
        </div>

        {/* Fee Status Card */}
        <div className="student-analytics-card student-analytics-card-fee">
          <div className="student-analytics-card-header">
            <h2 className="student-analytics-card-title">Fee Status</h2>
            <span className="student-analytics-card-badge">
              {paidFee >= totalFee ? 'Paid' : 'Pending'}
            </span>
          </div>
          <div className="student-analytics-card-content">
            <div className="student-analytics-fee-summary">
              <div className="student-analytics-fee-item">
                <span className="student-analytics-fee-label">Total Fee</span>
                <span className="student-analytics-fee-amount">₹{totalFee}</span>
              </div>
              <div className="student-analytics-fee-item student-analytics-fee-paid">
                <span className="student-analytics-fee-label">Paid</span>
                <span className="student-analytics-fee-amount">₹{paidFee}</span>
              </div>
              <div className="student-analytics-fee-item student-analytics-fee-pending">
                <span className="student-analytics-fee-label">Pending</span>
                <span className="student-analytics-fee-amount">₹{pendingFee}</span>
              </div>
            </div>
            <div className="student-analytics-fee-progress">
              <div 
                className="student-analytics-fee-progress-bar"
                style={{ width: `${totalFee > 0 ? (paidFee / totalFee) * 100 : 0}%` }}
              ></div>
            </div>
            <div className="student-analytics-fee-percentage">
              {totalFee > 0 ? Math.round((paidFee / totalFee) * 100) : 0}% Paid
            </div>
            <button 
              className="student-analytics-view-details"
              onClick={() => openModal('fees', data.fees)}
            >
              View Fee Details →
            </button>
          </div>
        </div>

        {/* Homework Progress Card */}
        <div className="student-analytics-card student-analytics-card-homework">
          <div className="student-analytics-card-header">
            <h2 className="student-analytics-card-title">Homework Progress</h2>
            <span className="student-analytics-card-badge">{completedHomework}/{data.homework.length}</span>
          </div>
          <div className="student-analytics-card-content">
            {data.homework.length === 0 ? (
              <p className="student-analytics-no-data">No homework assigned yet</p>
            ) : (
              <>
                <div className="student-analytics-homework-list">
                  {data.homework.slice(0, 3).map((hw, i) => (
                    <div key={i} className="student-analytics-homework-item">
                      <div className="student-analytics-homework-info">
                        <span className="student-analytics-homework-chapter">
                          {hw?.homeworkId?.chapterName || `Assignment ${i + 1}`}
                        </span>
                        <span className="student-analytics-homework-chapter-number">
                          Chapter {hw?.homeworkId?.chapterNumber || i + 1}
                        </span>
                      </div>
                      <span className={`student-analytics-homework-status student-analytics-status-${hw?.status?.toLowerCase()}`}>
                        {hw?.status || 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
                <button 
                  className="student-analytics-view-details"
                  onClick={() => openModal('homework', data.homework)}
                >
                  View All Assignments →
                </button>
              </>
            )}
          </div>
        </div>

        {/* Overall Performance Card */}
        <div className="student-analytics-card student-analytics-card-overall">
          <div className="student-analytics-card-header">
            <h2 className="student-analytics-card-title">Overall Performance</h2>
            <span className="student-analytics-card-badge">
              {Math.round((attendancePercent + averageExamScore + averageInterviewScore * 10 + homeworkCompletionRate) / 4)}%
            </span>
          </div>
          <div className="student-analytics-card-content">
            <div className="student-analytics-performance-metrics">
              <div className="student-analytics-performance-metric">
                <span className="student-analytics-performance-label">Attendance</span>
                <div className="student-analytics-performance-bar">
                  <div 
                    className="student-analytics-performance-fill student-analytics-performance-attendance"
                    style={{ width: `${attendancePercent}%` }}
                  ></div>
                </div>
                <span className="student-analytics-performance-value">{attendancePercent}%</span>
              </div>
              <div className="student-analytics-performance-metric">
                <span className="student-analytics-performance-label">Exams</span>
                <div className="student-analytics-performance-bar">
                  <div 
                    className="student-analytics-performance-fill student-analytics-performance-exam"
                    style={{ width: `${averageExamScore}%` }}
                  ></div>
                </div>
                <span className="student-analytics-performance-value">{averageExamScore}%</span>
              </div>
              <div className="student-analytics-performance-metric">
                <span className="student-analytics-performance-label">Interviews</span>
                <div className="student-analytics-performance-bar">
                  <div 
                    className="student-analytics-performance-fill student-analytics-performance-interview"
                    style={{ width: `${averageInterviewScore * 10}%` }}
                  ></div>
                </div>
                <span className="student-analytics-performance-value">{averageInterviewScore}/10</span>
              </div>
              <div className="student-analytics-performance-metric">
                <span className="student-analytics-performance-label">Homework</span>
                <div className="student-analytics-performance-bar">
                  <div 
                    className="student-analytics-performance-fill student-analytics-performance-homework"
                    style={{ width: `${homeworkCompletionRate}%` }}
                  ></div>
                </div>
                <span className="student-analytics-performance-value">{homeworkCompletionRate}%</span>
              </div>
            </div>
            <p className="student-analytics-performance-note">
              Your overall performance is calculated based on attendance, exams, interviews, and homework completion.
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Details */}
      {activeModal && (
        <div className="student-analytics-modal">
          <div className="student-analytics-modal-overlay" onClick={() => setActiveModal(null)}></div>
          <div className="student-analytics-modal-content">
            <div className="student-analytics-modal-header">
              <h2 className="student-analytics-modal-title">
                {activeModal === 'attendance' && 'Attendance Details'}
                {activeModal === 'exams' && 'Exam Performance Details'}
                {activeModal === 'interview' && 'Interview Sessions'}
                {activeModal === 'fees' && 'Fee Payment History'}
                {activeModal === 'homework' && 'Homework Assignments'}
              </h2>
              <button 
                className="student-analytics-modal-close"
                onClick={() => setActiveModal(null)}
              >
                ×
              </button>
            </div>
            <div className="student-analytics-modal-body">
              {renderModalContent(activeModal, modalData, studentId)}
            </div>
          </div>
        </div>
      )}

      {/* Internal CSS */}
      <style jsx>{`
        /* Reset and Base Styles */
        .student-analytics-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .student-analytics-container {
          min-height: 100vh;
          padding: 24px;
        }

        /* Loading State */
        .student-analytics-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          color: white;
          text-align: center;
        }

        .student-analytics-spinner {
          width: 60px;
          height: 60px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-top: 5px solid white;
          border-radius: 50%;
          animation: student-analytics-spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes student-analytics-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Header */
        .student-analytics-header {
          text-align: center;
          margin-bottom: 40px;
          color: white;
        }

        .student-analytics-title {
          font-size: 36px;
          font-weight: 700;
          color:black;
          margin-bottom: 12px;
          
        }

        .student-analytics-subtitle {
          font-size: 16px;
          opacity: 0.9;
          max-width: 600px;
          color:black;
          margin: 0 auto;
        }

        /* Stats Grid */
        .student-analytics-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .student-analytics-stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        .student-analytics-stat-card:hover {
          transform: translateY(-5px);
        }

        .student-analytics-stat-attendance {
          border-top: 4px solid #48bb78;
        }

        .student-analytics-stat-exam {
          border-top: 4px solid #4299e1;
        }

        .student-analytics-stat-interview {
          border-top: 4px solid #ed8936;
        }

        .student-analytics-stat-homework {
          border-top: 4px solid #9f7aea;
        }

        .student-analytics-stat-icon {
          font-size: 40px;
          width: 70px;
          height: 70px;
          background: rgba(72, 187, 120, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .student-analytics-stat-exam .student-analytics-stat-icon {
          background: rgba(66, 153, 225, 0.1);
        }

        .student-analytics-stat-interview .student-analytics-stat-icon {
          background: rgba(237, 137, 54, 0.1);
        }

        .student-analytics-stat-homework .student-analytics-stat-icon {
          background: rgba(159, 122, 234, 0.1);
        }

        .student-analytics-stat-content h3 {
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 4px;
        }

        .student-analytics-stat-content p {
          color: #4a5568;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .student-analytics-stat-content span {
          color: #718096;
          font-size: 14px;
        }

        /* Main Grid */
        .student-analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        /* Card Styles */
        .student-analytics-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .student-analytics-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .student-analytics-card-header {
          padding: 24px 24px 16px;
          border-bottom: 2px solid #f7fafc;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .student-analytics-card-title {
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
        }

        .student-analytics-card-badge {
          background: #667eea;
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .student-analytics-card-content {
          padding: 20px 24px 24px;
        }

        /* Attendance Card */
        .student-analytics-progress {
          height: 12px;
          background: #e2e8f0;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .student-analytics-progress-bar {
          height: 100%;
          border-radius: 6px;
          transition: width 0.8s ease;
        }

        .student-analytics-progress-attendance {
          background: linear-gradient(90deg, #48bb78, #38a169);
        }

        .student-analytics-stats-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .student-analytics-stat-item {
          text-align: center;
        }

        .student-analytics-stat-value {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 4px;
        }

        .student-analytics-stat-label {
          display: block;
          color: #718096;
          font-size: 14px;
        }

        /* Exam Card */
        .student-analytics-exam-list {
          margin-bottom: 20px;
        }

        .student-analytics-exam-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .student-analytics-exam-item:last-child {
          border-bottom: none;
        }

        .student-analytics-exam-name {
          font-weight: 500;
          color: #4a5568;
          flex: 1;
        }

        .student-analytics-exam-score {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 100px;
        }

        .student-analytics-exam-percentage {
          font-weight: 600;
          color: #2d3748;
          min-width: 40px;
        }

        .student-analytics-exam-progress {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .student-analytics-exam-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #4299e1, #3182ce);
          border-radius: 4px;
          transition: width 0.6s ease;
        }

        /* Interview Card */
        .student-analytics-interview-list {
          margin-bottom: 20px;
        }

        .student-analytics-interview-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .student-analytics-interview-item:last-child {
          border-bottom: none;
        }

        .student-analytics-interview-topic {
          font-weight: 500;
          color: #4a5568;
          flex: 1;
        }

        .student-analytics-interview-score {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .student-analytics-score-value {
          font-weight: 600;
          color: #2d3748;
          min-width: 60px;
        }

        .student-analytics-score-circle {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .student-analytics-score-circle-bg {
          fill: none;
          stroke: #e2e8f0;
          stroke-width: 8;
        }

        .student-analytics-score-circle-fill {
          fill: none;
          stroke: #ed8936;
          stroke-width: 8;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          transition: stroke-dasharray 0.8s ease;
        }

        .student-analytics-score-percentage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          font-weight: 600;
          color: #2d3748;
        }

        /* Fee Card */
        .student-analytics-fee-summary {
          margin-bottom: 20px;
        }

        .student-analytics-fee-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .student-analytics-fee-item:last-child {
          border-bottom: none;
        }

        .student-analytics-fee-label {
          color: #4a5568;
          font-weight: 500;
        }

        .student-analytics-fee-amount {
          font-weight: 600;
          color: #2d3748;
        }

        .student-analytics-fee-paid .student-analytics-fee-amount {
          color: #48bb78;
        }

        .student-analytics-fee-pending .student-analytics-fee-amount {
          color: #f56565;
        }

        .student-analytics-fee-progress {
          height: 10px;
          background: #e2e8f0;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .student-analytics-fee-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #48bb78, #38a169);
          border-radius: 5px;
          transition: width 0.8s ease;
        }

        .student-analytics-fee-percentage {
          text-align: center;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 20px;
        }

        /* Homework Card */
        .student-analytics-homework-list {
          margin-bottom: 20px;
        }

        .student-analytics-homework-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .student-analytics-homework-item:last-child {
          border-bottom: none;
        }

        .student-analytics-homework-info {
          flex: 1;
        }

        .student-analytics-homework-chapter {
          display: block;
          font-weight: 500;
          color: #4a5568;
          margin-bottom: 4px;
        }

        .student-analytics-homework-chapter-number {
          font-size: 12px;
          color: #718096;
        }

        .student-analytics-homework-status {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .student-analytics-status-completed,
        .student-analytics-status-graded {
          background: rgba(72, 187, 120, 0.1);
          color: #38a169;
        }

        .student-analytics-status-pending,
        .student-analytics-status-assigned {
          background: rgba(237, 137, 54, 0.1);
          color: #dd6b20;
        }

        .student-analytics-status-submitted {
          background: rgba(66, 153, 225, 0.1);
          color: #3182ce;
        }

        /* Overall Performance Card */
        .student-analytics-performance-metrics {
          margin-bottom: 20px;
        }

        .student-analytics-performance-metric {
          margin-bottom: 16px;
        }

        .student-analytics-performance-label {
          display: block;
          color: #4a5568;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .student-analytics-performance-bar {
          height: 10px;
          background: #e2e8f0;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .student-analytics-performance-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.8s ease;
        }

        .student-analytics-performance-attendance {
          background: linear-gradient(90deg, #48bb78, #38a169);
        }

        .student-analytics-performance-exam {
          background: linear-gradient(90deg, #4299e1, #3182ce);
        }

        .student-analytics-performance-interview {
          background: linear-gradient(90deg, #ed8936, #dd6b20);
        }

        .student-analytics-performance-homework {
          background: linear-gradient(90deg, #9f7aea, #805ad5);
        }

        .student-analytics-performance-value {
          display: block;
          text-align: right;
          font-weight: 600;
          color: #2d3748;
        }

        .student-analytics-performance-note {
          color: #718096;
          font-size: 14px;
          line-height: 1.6;
          margin-top: 16px;
        }

        /* No Data */
        .student-analytics-no-data {
          color: #a0aec0;
          text-align: center;
          padding: 40px 20px;
          font-style: italic;
        }

        /* View Details Button */
        .student-analytics-view-details {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .student-analytics-view-details:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        /* Modal */
        .student-analytics-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
        }

        .student-analytics-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          animation: student-analytics-fade-in 0.3s ease;
        }

        @keyframes student-analytics-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .student-analytics-modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 20px;
          width: 90%;
          max-width: 800px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          animation: student-analytics-slide-up 0.4s ease;
        }

        @keyframes student-analytics-slide-up {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .student-analytics-modal-header {
          padding: 24px 32px;
          border-bottom: 2px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .student-analytics-modal-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        .student-analytics-modal-close {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .student-analytics-modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .student-analytics-modal-body {
          padding: 32px;
        }

        .student-analytics-modal-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .student-analytics-modal-item {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .student-analytics-modal-item:hover {
          border-color: #667eea;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .student-analytics-modal-item-row {
          display: flex;
          gap: 12px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .student-analytics-modal-item-label {
          font-weight: 600;
          color: #4a5568;
          min-width: 120px;
        }

        .student-analytics-modal-item-value {
          color: #2d3748;
          flex: 1;
        }

        .student-analytics-modal-item-value.status-present {
          color: #48bb78;
          font-weight: 600;
        }

        .student-analytics-modal-item-value.status-absent {
          color: #f56565;
          font-weight: 600;
        }

        .student-analytics-modal-no-data {
          text-align: center;
          color: #a0aec0;
          padding: 60px 20px;
          font-size: 18px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .student-analytics-container {
            padding: 16px;
          }

          .student-analytics-title {
            font-size: 28px;
          }

          .student-analytics-stats-grid {
            grid-template-columns: 1fr;
          }

          .student-analytics-grid {
            grid-template-columns: 1fr;
          }

          .student-analytics-modal-content {
            width: 95%;
            max-height: 90vh;
          }

          .student-analytics-modal-header {
            padding: 20px;
          }

          .student-analytics-modal-body {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .student-analytics-stat-card {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .student-analytics-card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .student-analytics-card-badge {
            align-self: flex-start;
          }

          .student-analytics-stats-row {
            flex-direction: column;
            gap: 16px;
          }

          .student-analytics-exam-item,
          .student-analytics-interview-item,
          .student-analytics-homework-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .student-analytics-interview-score {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}

// Helper function to render modal content
function renderModalContent(modalType, data, studentId) {
  if (!data || data.length === 0) {
    return <p className="student-analytics-modal-no-data">No data available</p>;
  }

  switch (modalType) {
    case 'attendance':
      return (
        <div className="student-analytics-modal-list">
          {data.map((a, i) => (
            <div key={i} className="student-analytics-modal-item">
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Date:</span>
                <span className="student-analytics-modal-item-value">
                  {new Date(a.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Status:</span>
                <span className={`student-analytics-modal-item-value status-${a.status}`}>
                  {a.status}
                </span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Program:</span>
                <span className="student-analytics-modal-item-value">{a.programName || "N/A"}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Technology:</span>
                <span className="student-analytics-modal-item-value">{a.technology || "N/A"}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Batch:</span>
                <span className="student-analytics-modal-item-value">{a.student?.batch || "N/A"}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Marked By:</span>
                <span className="student-analytics-modal-item-value">{a.markedBy?.email || "Admin"}</span>
              </div>
            </div>
          ))}
        </div>
      );

    case 'exams':
      return (
        <div className="student-analytics-modal-list">
          {data.map((ex, i) => (
            <div key={i} className="student-analytics-modal-item">
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Exam:</span>
                <span className="student-analytics-modal-item-value">{ex.exam?.examTitle || `Exam ${i + 1}`}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Score:</span>
                <span className="student-analytics-modal-item-value">{ex.score || 0}/{ex.totalQuestions || 0}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Percentage:</span>
                <span className="student-analytics-modal-item-value">{ex.percentage || 0}%</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Attempted On:</span>
                <span className="student-analytics-modal-item-value">
                  {new Date(ex.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Status:</span>
                <span className={`student-analytics-modal-item-value ${(ex.percentage || 0) >= 60 ? 'status-present' : 'status-absent'}`}>
                  {(ex.percentage || 0) >= 60 ? 'Passed' : 'Failed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      );

    case 'interview':
      return (
        <div className="student-analytics-modal-list">
          {data.map((sc, i) => (
            <div key={i} className="student-analytics-modal-item">
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Topic:</span>
                <span className="student-analytics-modal-item-value">{sc.topicId?.name || `Topic ${i + 1}`}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Score:</span>
                <span className="student-analytics-modal-item-value">{sc.score || 0}/{sc.total || 10}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Strengths:</span>
                <span className="student-analytics-modal-item-value">{sc.strengths || "Not specified"}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Weaknesses:</span>
                <span className="student-analytics-modal-item-value">{sc.weaknesses || "Not specified"}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Feedback:</span>
                <span className="student-analytics-modal-item-value">{sc.feedback || "No feedback provided"}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Date:</span>
                <span className="student-analytics-modal-item-value">
                  {new Date(sc.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      );

    case 'fees':
      if (data.length === 0) return <p className="student-analytics-modal-no-data">No fee data available</p>;
      
      const feeEntry = data[0]?.students?.find(
        (s) => String(s.student?._id) === String(studentId)
      );

      if (!feeEntry) return <p className="student-analytics-modal-no-data">No fee data found for you</p>;

      return (
        <div className="student-analytics-modal-list">
          <div className="student-analytics-modal-item">
            <div className="student-analytics-modal-item-row">
              <span className="student-analytics-modal-item-label">Total Fee:</span>
              <span className="student-analytics-modal-item-value">₹{feeEntry.totalFee || 0}</span>
            </div>
            <div className="student-analytics-modal-item-row">
              <span className="student-analytics-modal-item-label">Paid Fee:</span>
              <span className="student-analytics-modal-item-value">₹{feeEntry.paidFee || 0}</span>
            </div>
            <div className="student-analytics-modal-item-row">
              <span className="student-analytics-modal-item-label">Pending Fee:</span>
              <span className="student-analytics-modal-item-value">₹{feeEntry.currentFee || 0}</span>
            </div>
          </div>

          {feeEntry.paymentHistory?.length > 0 && (
            <>
              <h3 style={{ margin: '24px 0 16px', color: '#2d3748' }}>Payment History</h3>
              {feeEntry.paymentHistory.map((p, i) => (
                <div key={i} className="student-analytics-modal-item">
                  <div className="student-analytics-modal-item-row">
                    <span className="student-analytics-modal-item-label">Date:</span>
                    <span className="student-analytics-modal-item-value">
                      {new Date(p.paidOn).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="student-analytics-modal-item-row">
                    <span className="student-analytics-modal-item-label">Amount:</span>
                    <span className="student-analytics-modal-item-value">₹{p.amount || 0}</span>
                  </div>
                  <div className="student-analytics-modal-item-row">
                    <span className="student-analytics-modal-item-label">Payment Mode:</span>
                    <span className="student-analytics-modal-item-value">{p.paymentMode || "N/A"}</span>
                  </div>
                  <div className="student-analytics-modal-item-row">
                    <span className="student-analytics-modal-item-label">Transaction ID:</span>
                    <span className="student-analytics-modal-item-value">{p.transactionId || "N/A"}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      );

    case 'homework':
      return (
        <div className="student-analytics-modal-list">
          {data.map((hw, i) => (
            <div key={i} className="student-analytics-modal-item">
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Chapter:</span>
                <span className="student-analytics-modal-item-value">{hw.homeworkId?.chapterName || `Assignment ${i + 1}`}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Chapter No:</span>
                <span className="student-analytics-modal-item-value">{hw.homeworkId?.chapterNumber || i + 1}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Status:</span>
                <span className={`student-analytics-modal-item-value ${hw.status?.toLowerCase() === 'completed' || hw.status?.toLowerCase() === 'graded' ? 'status-present' : 'status-absent'}`}>
                  {hw.status || 'Pending'}
                </span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Marked By:</span>
                <span className="student-analytics-modal-item-value">{hw.markedBy?.email || "Not Reviewed"}</span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Marked At:</span>
                <span className="student-analytics-modal-item-value">
                  {hw.markedAt ? new Date(hw.markedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : "Not reviewed yet"}
                </span>
              </div>
              <div className="student-analytics-modal-item-row">
                <span className="student-analytics-modal-item-label">Description:</span>
                <span className="student-analytics-modal-item-value">{hw.homeworkId?.description || "No description provided"}</span>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return <p className="student-analytics-modal-no-data">No data available</p>;
  }
}