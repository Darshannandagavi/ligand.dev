import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import Loader from "../StyleComponents/Loader";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function ExamHistory() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAttempt, setExpandedAttempt] = useState(null);
  // const [selectedAttemptForTradingChart, setSelectedAttemptForTradingChart] = useState(null);

  const studentId = localStorage.getItem("userId");
  const student = localStorage.getItem("username");
  const usn = localStorage.getItem("usn");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    async function fetchHistory() {
      try {
        const res = await axios.get(
          `https://ligand-dev-7.onrender.com/api/attempts/student/${studentId}`
        );
        // Filter out attempts with createdAt date 12-9-2025 (September 12, 2025)
        const excludeDate = new Date(2025, 8, 12); // Months are 0-indexed: 8 = September
        excludeDate.setHours(0, 0, 0, 0);
        const filtered = res.data.filter((attempt) => {
          const attemptDate = new Date(attempt.createdAt);
          attemptDate.setHours(0, 0, 0, 0);
          return attemptDate.getTime() !== excludeDate.getTime();
        });
        setAttempts(filtered);
        console.log("Exam attempts (excluding 12-9-2025):", filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [studentId]);

  const toggleAttempt = (attemptId) => {
    if (expandedAttempt === attemptId) {
      setExpandedAttempt(null);
    } else {
      setExpandedAttempt(attemptId);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 60) return "#FF9800";
    return "#F44336";
  };

  const getScoreEmoji = (percentage) => {
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👍";
    return "💪";
  };

  // Generate trading chart data for a specific attempt (cumulative correct answers)
  const generateTradingChartData = (attempt) => {
    if (!attempt || !attempt.answers) return null;
    const data = [];
    let correctCount = 0;
    attempt.answers.forEach((answer, index) => {
      if (answer.isCorrect) {
        correctCount += 1;
      }
      data.push({
        question: `Q${index + 1}`,
        value: correctCount,
        isCorrect: answer.isCorrect,
        index: index + 1
      });
    });
    return data;
  };

  // Download exam as PDF
  const handleDownload = (attempt) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Exam Attempt Report", 14, 15);

    doc.setFontSize(12);
    doc.text(`Student Name: ${student || "N/A"}`, 14, 30);
    doc.text(`USN: ${usn || "N/A"}`, 14, 38);
    doc.text(
      `Exam: ${attempt.exam?.examTitle || `Exam #${attempt.exam?.examNumber}`}`,
      14,
      46
    );
    doc.text(
      `Date: ${new Date(attempt.createdAt).toLocaleString()}`,
      14,
      54
    );
    doc.text(
      `Score: ${attempt.score}/${attempt.totalQuestions} (${attempt.percentage.toFixed(
        2
      )}%)`,
      14,
      62
    );

    autoTable(doc, {
      startY: 70,
      head: [["#", "Question", "Your Answer", "Correct Answer", "Status"]],
      body: attempt.answers.map((a, i) => [
        i + 1,
        a.questionText,
        a.chosenAnswer || "Not answered",
        a.correctAnswer,
        a.isCorrect ? "Correct" : "Incorrect",
      ]),
      styles: { fontSize: 10, cellWidth: "wrap" },
      headStyles: { fillColor: [102, 126, 234] },
      columnStyles: {
        1: { cellWidth: 70 },
        2: { cellWidth: 35 },
        3: { cellWidth: 35 },
        4: { cellWidth: 25 },
      },
    });

    doc.save(
      `Exam_${attempt.exam?.examTitle || attempt.exam?.examNumber}_${
        student || "student"
      }.pdf`
    );
  };

  // Only include attempts with visible results in summary charts
  // const visibleAttempts = attempts.filter(a => !a.resultsHidden);

  // const chartData = {
  //   labels: visibleAttempts.map((a, i) => a.exam?.examTitle || `Exam #${a.exam?.examNumber}`),
  //   datasets: [
  //     {
  //       label: "Score (%)",
  //       data: visibleAttempts.map(a => a.percentage ?? 0),
  //       backgroundColor: visibleAttempts.map(a =>
  //         (a.percentage ?? 0) >= 80 ? "#4CAF50" : (a.percentage ?? 0) >= 60 ? "#FF9800" : "#F44336"
  //       ),
  //     },
  //   ],
  // };

  // const pieData = {
  //   labels: ["Correct", "Incorrect"],
  //   datasets: [
  //     {
  //       data: [
  //         visibleAttempts.reduce((sum, a) => sum + (a.score || 0), 0),
  //         visibleAttempts.reduce((sum, a) => sum + ((a.totalQuestions || 0) - (a.score || 0)), 0),
  //       ],
  //       backgroundColor: ["#4CAF50", "#F44336"],
  //     },
  //   ],
  // };

  if (loading)
    return (
      <div className="exam-history-container">
        <div className="exam-history-card">
          <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>
          <div className="loading">Loading exam history... ⏳</div>
        </div>
      </div>
    );

  if (attempts.length === 0) {
    return (
      <div className="exam-history-container">
        <div className="exam-history-card">
          <div className="exam-history-header">
            <h2>📊 Exam History</h2>
            <p>Your past exam attempts will appear here</p>
          </div>
          <div className="no-attempts">
            <div className="no-attempts-icon">📝</div>
            <h3>No Exam Attempts Yet</h3>
            <p>
              You haven't taken any exams yet. Start your first exam to see your
              history here!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-history-container">
      <div className="exam-history-card">
        <div className="exam-history-header">
          <h2>📊 Exam History</h2>
          <p>Review your past exam performances and track your progress</p>
          {/* Show student name and USN */}
          <div
            style={{
              marginTop: "10px",
              fontWeight: 500,
              color: "#2c3e50",
            }}
          >
            Student Name:{" "}
            <span style={{ color: "#667eea" }}>{student}</span>
            {" | "}
            USN: <span style={{ color: "#667eea" }}>{usn}</span>
          </div>
        </div>

        <div className="attempts-list">
          {attempts.map((attempt, idx) => {
            const tradingData = generateTradingChartData(attempt);
            const tradingChartData = tradingData ? {
              labels: tradingData.map(d => d.question),
              datasets: [
                {
                  label: 'Performance Trend',
                  data: tradingData.map(d => d.value),
                  borderColor: '#667eea',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  pointBackgroundColor: tradingData.map(d => d.isCorrect ? '#4CAF50' : '#F44336'),
                  pointBorderColor: tradingData.map(d => d.isCorrect ? '#4CAF50' : '#F44336'),
                  pointRadius: 6,
                  pointHoverRadius: 8,
                  fill: true,
                  tension: 0.4,
                }
              ]
            } : null;

            return (
              <div
                key={attempt._id || idx}
                className="attempt-card"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div
                  className="attempt-header"
                  onClick={() => toggleAttempt(attempt._id)}
                >
                  <div className="attempt-title">
                    <h3>
                      {attempt.exam?.examTitle ||
                        `Exam #${attempt.exam?.examNumber}`}
                    </h3>
                    <p className="attempt-date">
                      {new Date(attempt.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="attempt-score">
                    {attempt.resultsHidden ? (
                      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{background: '#f1c40f', color: '#1f2937', padding: '8px 12px', borderRadius: 8, fontWeight: 700}}>Results Hidden</div>
                        <div style={{fontSize: 12, color: '#666', marginTop: 6}}>Awaiting admin release</div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="score-circle"
                          style={{
                            backgroundColor: getScoreColor(attempt.percentage),
                            borderColor: getScoreColor(attempt.percentage),
                          }}
                        >
                          <span>{(attempt.percentage ?? 0).toFixed(2)}%</span>
                        </div>
                        <div className="score-details">
                          <p>
                            {attempt.score}/{attempt.totalQuestions} correct
                          </p>
                          <p className="score-emoji">
                            {getScoreEmoji(attempt.percentage)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="expand-icon">
                    {expandedAttempt === attempt._id ? "▲" : "▼"}
                  </div>
                  {/* Download button */}
                  <button
                    className="download-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!attempt.resultsHidden) handleDownload(attempt);
                    }}
                    title={attempt.resultsHidden ? "Results hidden" : "Download this exam as PDF"}
                    disabled={attempt.resultsHidden}
                    style={attempt.resultsHidden ? {opacity: 0.6, cursor: 'not-allowed'} : {}}
                  >
                    ⬇️ Download
                  </button>
                </div>

                {expandedAttempt === attempt._id && (
                  <div className="attempt-details">
                    {/* Trading Chart for this attempt */}
                    {!attempt.resultsHidden && tradingChartData && (
                      <div className="trading-chart-container">
                        <h4>Performance Trend (Trading View)</h4>
                        <div className="chart-wrapper" style={{background: '#fff'}}>
                          <Line
                            data={tradingChartData}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              devicePixelRatio: window.devicePixelRatio || 1,
                              plugins: {
                                legend: {
                                  position: 'top',
                                },
                                tooltip: {
                                  callbacks: {
                                    label: function(context) {
                                      const index = context.dataIndex;
                                      const value = context.parsed.y;
                                      const isCorrect = tradingData[index].isCorrect;
                                      return `Q${index + 1}: ${value} (${isCorrect ? 'Correct' : 'Incorrect'})`;
                                    }
                                  }
                                }
                              },
                              scales: {
                                x: {
                                  title: {
                                    display: true,
                                    text: 'Question Number',
                                    color: '#2c3e50',
                                    font: {
                                      size: 14,
                                      weight: 'bold'
                                    }
                                  },
                                  grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                  },
                                  ticks: {
                                    stepSize: 1,
                                  }
                                },
                                y: {
                                  title: {
                                    display: true,
                                    text: 'Cumulative Correct Answers',
                                    color: '#2c3e50',
                                    font: {
                                      size: 14,
                                      weight: 'bold'
                                    }
                                  },
                                  min: 0,
                                  max: attempt.totalQuestions,
                                  ticks: {
                                    stepSize: 1,
                                  },
                                  grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                        <div className="trading-chart-legend">
                          <div className="legend-item">
                            <span className="legend-color correct"></span>
                            <span>Correct Answer (+5 points)</span>
                          </div>
                          <div className="legend-item">
                            <span className="legend-color incorrect"></span>
                            <span>Incorrect Answer (-5 points)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Performance Overview charts for this attempt */}
                    <div className="charts-section">
                      <h3>📈 Performance Overview</h3>
                      <div className="chart-container side-by-side">
                        <div className="bar-chart">
                          <h4>Score Distribution</h4>
                          <Bar
                            data={{
                              labels: [attempt.exam?.examTitle || `Exam #${attempt.exam?.examNumber}`],
                              datasets: [
                                {
                                  label: "Correct Answers",
                                  data: [attempt.score],
                                  backgroundColor: [attempt.score >= attempt.totalQuestions * 0.8 ? "#4CAF50" : attempt.score >= attempt.totalQuestions * 0.6 ? "#FF9800" : "#F44336"],
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "top",
                                },
                                tooltip: {
                                  callbacks: {
                                    label: (tooltipItem) => {
                                      return `Correct Answers: ${attempt.score}`;
                                    },
                                  },
                                },
                              },
                              scales: {
                                x: {
                                  title: {
                                    display: true,
                                    text: "Exam",
                                    color: "#2c3e50",
                                    font: {
                                      size: 16,
                                      weight: "bold",
                                    },
                                  },
                                },
                                y: {
                                  title: {
                                    display: true,
                                    text: "Number of Questions",
                                    color: "#2c3e50",
                                    font: {
                                      size: 16,
                                      weight: "bold",
                                    },
                                  },
                                  beginAtZero: true,
                                  ticks: {
                                    color: "#2c3e50",
                                    font: {
                                      size: 14,
                                    },
                                    stepSize: 1,
                                  },
                                  suggestedMax: attempt.totalQuestions,
                                },
                              },
                            }}
                          />
                        </div>
                        <div className="pie-chart">
                          <h4>Correct vs Incorrect Answers</h4>
                          <Pie
                            data={{
                              labels: ["Correct", "Incorrect"],
                              datasets: [
                                {
                                  data: [attempt.score, attempt.totalQuestions - attempt.score],
                                  backgroundColor: ["#4CAF50", "#F44336"],
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "bottom",
                                  labels: {
                                    color: "#2c3e50",
                                    font: {
                                      size: 14,
                                      weight: "bold",
                                    },
                                  },
                                },
                                tooltip: {
                                  callbacks: {
                                    label: (tooltipItem) => {
                                      const { label, formattedValue } = tooltipItem;
                                      return `${label}: ${formattedValue}`;
                                    },
                                  },
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {!attempt.resultsHidden && (
                      <div className="answers-summary">
                      <div className="summary-item correct">
                        <span className="summary-count">{attempt.score}</span>
                        <span className="summary-label">Correct</span>
                      </div>
                      <div className="summary-item incorrect">
                        <span className="summary-count">
                          {attempt.totalQuestions - attempt.score}
                        </span>
                        <span className="summary-label">Incorrect</span>
                      </div>
                      <div className="summary-item total">
                        <span className="summary-count">
                          {attempt.totalQuestions}
                        </span>
                        <span className="summary-label">Total</span>
                      </div>
                      </div>
                    )}

                    {!attempt.resultsHidden ? (
                      <>
                        <h4>Detailed Answers:</h4>
                        <div className="answers-list">
                          {attempt.answers.map((a, i) => (
                            <div
                              key={i}
                              className={`answer-item ${
                                a.isCorrect ? "correct" : "incorrect"
                              }`}
                            >
                              <div className="question-header">
                                <span className="question-number">
                                  Q{i + 1}: {a.questionText}
                                </span>
                                <span className="answer-status">
                                  {a.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                                </span>
                              </div>

                              <div className="answer-comparison">
                                <div className="answer-row">
                                  <span className="answer-label">Your Answer:</span>
                                  <span
                                    className={`answer-value ${
                                      a.isCorrect ? "correct" : "incorrect"
                                    }`}
                                  >
                                    {a.chosenAnswer || "Not answered"}
                                  </span>
                                </div>
                                {!a.isCorrect && (
                                  <div className="answer-row">
                                    <span className="answer-label">
                                      Correct Answer:
                                    </span>
                                    <span className="answer-value correct">
                                      {a.correctAnswer}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div style={{padding: 20, background: '#fff7e6', borderRadius: 8, marginTop: 12}}>
                        <strong>Results are currently hidden by the administrator.</strong>
                        <div style={{marginTop: 8, color: '#666'}}>You will be able to view detailed results once the admin enables them.</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>


        

        <style jsx>{`
          .exam-history-container {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 20px;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }

          .exam-history-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            padding: 30px;
            width: 100%;
            max-width: 1000px;
          }

          .exam-history-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e9ecef;
          }

          .exam-history-header h2 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-weight: 700;
            font-size: 28px;
          }

          .exam-history-header p {
            color: #666;
            font-size: 16px;
          }

          .loading {
            text-align: center;
            padding: 40px;
            color: #666;
            font-size: 18px;
          }

          .no-attempts {
            text-align: center;
            padding: 40px 20px;
            color: #666;
          }

          .no-attempts-icon {
            font-size: 60px;
            margin-bottom: 20px;
          }

          .no-attempts h3 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 22px;
          }

          .attempts-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .attempt-card {
            background: #f8f9fa;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease;
            border: 1px solid #e9ecef;
          }

          .attempt-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }

          .attempt-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }

          .attempt-header:hover {
            background-color: #e9ecef;
          }

          .attempt-title h3 {
            color: #2c3e50;
            margin-bottom: 5px;
            font-size: 18px;
          }

          .attempt-date {
            color: #666;
            font-size: 14px;
            margin: 0;
          }

          .attempt-score {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .score-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: 700;
            font-size: 16px;
            border: 3px solid;
          }

          .score-details {
            text-align: center;
          }

          .score-details p {
            margin: 0;
            color: #2c3e50;
            font-size: 14px;
          }

          .score-emoji {
            font-size: 16px;
          }

          .expand-icon {
            font-size: 18px;
            color: #667eea;
          }

          .attempt-details {
            padding: 20px;
            background: white;
            border-top: 1px solid #e9ecef;
          }

          .answers-summary {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
          }

          .summary-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
          }

          .summary-item.correct {
            color: #4caf50;
          }

          .summary-item.incorrect {
            color: #f44336;
          }

          .summary-item.total {
            color: #667eea;
          }

          .summary-count {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
          }

          .summary-label {
            font-size: 14px;
            font-weight: 600;
          }

          .attempt-details h4 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 18px;
          }

          .answers-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-height: 400px;
            overflow-y: auto;
            padding-right: 10px;
          }

          .answer-item {
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid;
          }

          .answer-item.correct {
            background: #d4edda;
            border-left-color: #4caf50;
          }

          .answer-item.incorrect {
            background: #f8d7da;
            border-left-color: #f44336;
          }

          .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .question-number {
            font-weight: 700;
            color: #2c3e50;
          }

          .answer-status {
            font-weight: 600;
            font-size: 14px;
          }

          .answer-comparison {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .answer-row {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .answer-label {
            font-weight: 600;
            color: #2c3e50;
            min-width: 120px;
          }

          .answer-value {
            font-weight: 500;
          }

          .answer-value.correct {
            color: #4caf50;
          }

          .answer-value.incorrect {
            color: #f44336;
          }

          .download-btn {
            background: #667eea;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 6px 14px;
            font-size: 14px;
            font-weight: 600;
            margin-left: 18px;
            cursor: pointer;
            transition: background 0.2s;
          }
          .download-btn:hover {
            background: #4c51bf;
          }

          .charts-section {
            margin-top: 40px;
          }

          .chart-container.side-by-side {
            display: flex;
            flex-direction: row;
            gap: 30px;
            justify-content: space-between;
          }

          .bar-chart,
          .pie-chart {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            border: 1px solid #e9ecef;
            flex: 1;
            min-width: 0;
          }

          .bar-chart h4,
          .pie-chart h4 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 18px;
          }

          /* Trading Chart Styles */
          .trading-chart-container {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border: 1px solid #e9ecef;
          }

          .trading-chart-container h4 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 18px;
            text-align: center;
          }

          .chart-wrapper {
            height: 300px;
            position: relative;
          }

          .trading-chart-legend {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 15px;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #2c3e50;
          }

          .legend-color {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: inline-block;
          }

          .legend-color.correct {
            background-color: #4CAF50;
          }

          .legend-color.incorrect {
            background-color: #F44336;
          }

          @media (max-width: 768px) {
            .attempt-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 15px;
            }

            .attempt-score {
              width: 100%;
              justify-content: space-between;
            }

            .answers-summary {
              flex-direction: column;
              gap: 15px;
            }

            .answer-row {
              flex-direction: column;
              align-items: flex-start;
              gap: 5px;
            }

            .answer-label {
              min-width: auto;
            }

            .chart-container.side-by-side {
              flex-direction: column;
              gap: 20px;
            }

            .trading-chart-legend {
              flex-direction: column;
              align-items: center;
              gap: 10px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}