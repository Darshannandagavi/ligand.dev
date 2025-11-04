import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaEye, 
  FaDownload, 
  FaSearch, 
  FaArrowLeft, 
  FaClipboardList,
  FaUserGraduate,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaIdBadge
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Grade calculation function
const calculateGrade = (percentage) => {
  if (percentage >= 90) return { grade: 'A+', color: '#16a34a', label: 'Excellent' };
  if (percentage >= 80) return { grade: 'A', color: '#22c55e', label: 'Very Good' };
  if (percentage >= 70) return { grade: 'B+', color: '#4ade80', label: 'Good' };
  if (percentage >= 60) return { grade: 'B', color: '#84cc16', label: 'Above Average' };
  if (percentage >= 50) return { grade: 'C', color: '#eab308', label: 'Average' };
  if (percentage >= 40) return { grade: 'D', color: '#f59e0b', label: 'Below Average' };
  return { grade: 'F', color: '#ef4444', label: 'Fail' };
};

export default function AdminExamAttempts() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gradeDistribution, setGradeDistribution] = useState({});

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  // Calculate grade distribution when attempts change
  useEffect(() => {
    if (attempts.length > 0) {
      const distribution = {
        'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 
        'C': 0, 'D': 0, 'F': 0
      };
      
      attempts.forEach(attempt => {
        const { grade } = calculateGrade(attempt.percentage);
        distribution[grade]++;
      });
      
      setGradeDistribution(distribution);
    }
  }, [attempts]);

  // Fetch all exams for admin
  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await axios.get(
          "https://ligand-software-solutions-workshop-2.onrender.com/api/exams/examsforadmin"
        );
        setExams(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchExams();
  }, []);

  // Fetch attempts for selected exam
  const handleExamClick = async (exam) => {
    setSelectedExam(exam);
    setLoading(true);
    try {
      const res = await axios.get(
        `https://ligand-software-solutions-workshop-2.onrender.com/api/attempts/exam/${exam._id}`
      );
      console.log(res.data)
      setAttempts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Back to exams list
  const handleBack = () => {
    setSelectedExam(null);
    setAttempts([]);
    setSearchTerm("");
  };

  // Filter attempts based on search term
  const filteredAttempts = attempts.filter(attempt => {
    const studentName = attempt.student?.name || "Unknown";
    const studentEmail = attempt.student?.email || "Unknown";
    
    return (
      studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // View student answers in modal
  const viewStudentAnswers = (attempt) => {
    setSelectedAttempt(attempt);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedAttempt(null);
  };

  // Prepare chart data
  const chartData = {
    labels: Object.keys(gradeDistribution),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(gradeDistribution),
        backgroundColor: [
          '#16a34a', // A+
          '#22c55e', // A
          '#4ade80', // B+
          '#84cc16', // B
          '#eab308', // C
          '#f59e0b', // D
          '#ef4444'  // F
        ],
        borderColor: [
          '#15803d',
          '#16a34a',
          '#22c55e',
          '#65a30d',
          '#ca8a04',
          '#d97706',
          '#dc2626'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Grade Distribution',
        font: {
          size: 16
        }
      },
    },
  };

  // Download attempts as PDF with both charts as images
  const downloadPDF = async () => {
    const doc = new jsPDF();

    // Add header with branding
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 220, 30, 'F');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text("LIgand Software Solutions", 14, 12);
    doc.setFontSize(10);
    doc.text("MERN Stack Workshop", 14, 18);
    doc.text("Empowering Education Through Technology", 14, 24);

    // Add title
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Exam Attempts - ${selectedExam.examTitle || `Exam #${selectedExam.examNumber}`}`, 14, 40);

    // Add exam details
    doc.setFontSize(10);
    doc.text(`Total Questions: ${selectedExam.questions.length}`, 14, 48);
    doc.text(`Total Attempts: ${attempts.length}`, 14, 54);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 60);

    // Render Bar and Pie charts to images and add to PDF
    // Find the chart canvases by their aria-labels (set below)
    const barCanvas = document.querySelector('canvas[aria-label="Bar Chart"]');
    const pieCanvas = document.querySelector('canvas[aria-label="Pie Chart"]');
    let barImgData = null;
    let pieImgData = null;
    if (barCanvas) {
      barImgData = barCanvas.toDataURL('image/png', 1.0);
    }
    if (pieCanvas) {
      pieImgData = pieCanvas.toDataURL('image/png', 1.0);
    }

    // Set chart image sizes
    const chartWidth = 80;
    const chartHeight = 60;
    const chartX1 = 14;
    const chartX2 = 110;
    const chartY = 70;

    if (barImgData) {
      doc.addImage(barImgData, 'PNG', chartX1, chartY, chartWidth, chartHeight);
    }
    if (pieImgData) {
      doc.addImage(pieImgData, 'PNG', chartX2, chartY, chartWidth, chartHeight);
    }

    // Add chart titles
    doc.setFontSize(10);
    doc.text("Bar Chart", chartX1 + chartWidth / 2, chartY - 5, { align: 'center' });
    doc.text("Pie Chart", chartX2 + chartWidth / 2, chartY - 5, { align: 'center' });

    // Add grade legend
    doc.setFontSize(9);
    let legendX = 14;
    let legendY = chartY + chartHeight + 15;

    const gradeInfo = [
      { range: "90-100%", grade: "A+", color: calculateGrade(95).color },
      { range: "80-89%", grade: "A", color: calculateGrade(85).color },
      { range: "70-79%", grade: "B+", color: calculateGrade(75).color },
      { range: "60-69%", grade: "B", color: calculateGrade(65).color },
      { range: "50-59%", grade: "C", color: calculateGrade(55).color },
      { range: "40-49%", grade: "D", color: calculateGrade(45).color },
      { range: "0-39%", grade: "F", color: calculateGrade(35).color }
    ];

    doc.text("Grade Legend:", 14, legendY);
    legendY += 7;

    gradeInfo.forEach((info, i) => {
      if (i % 2 === 0 && i > 0) {
        legendX += 60;
        legendY = chartY + chartHeight + 22;
      }

      doc.setFillColor(info.color);
      doc.rect(legendX, legendY, 4, 4, 'F');
      doc.text(`${info.grade} (${info.range})`, legendX + 6, legendY + 3);

      legendY += 6;
    });

    const tableStartY = Math.max(legendY + 10, chartY + chartHeight + 50);

    // Add table
    autoTable(doc, {
      startY: tableStartY,
      head: [['USN','Student Name', 'Email', 'Score', 'Grade', 'Status']],
      body: filteredAttempts.map(attempt => {
        const { grade, color, label } = calculateGrade(attempt.percentage);
        return [
          attempt.student?.usn || 'Unknown',
          attempt.student?.name || 'Unknown',
          attempt.student?.email || 'Unknown',
          `${attempt.score}/${attempt.totalQuestions}`,
          { content: grade, styles: { fillColor: color, textColor: 255, fontStyle: 'bold' } },
          label
        ];
      }),
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      margin: { top: tableStartY }
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Page ${i} of ${pageCount} - LIgand Software Solutions`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }

    doc.save(`exam-attempts-${selectedExam.examNumber}.pdf`);
  };

  // Draw bar chart for PDF
  const drawBarChart = (doc, x, y, width, height) => {
    const grades = Object.keys(gradeDistribution);
    const total = attempts.length;
    const barWidth = width / grades.length;
    
    // Draw chart border
    doc.setDrawColor(150);
    doc.rect(x, y, width, height);
    
    // Draw bars
    grades.forEach((grade, i) => {
      const count = gradeDistribution[grade];
      const barHeight = total > 0 ? (count / total) * height : 0;
      const { color } = calculateGrade(
        grade === 'A+' ? 95 : 
        grade === 'A' ? 85 : 
        grade === 'B+' ? 75 : 
        grade === 'B' ? 65 : 
        grade === 'C' ? 55 : 
        grade === 'D' ? 45 : 35
      );
      
      doc.setFillColor(color);
      doc.rect(
        x + (i * barWidth) + 2, 
        y + height - barHeight, 
        barWidth - 4, 
        barHeight,
        'F'
      );
      
      // Add grade labels
      doc.setFontSize(8);
      doc.setTextColor(0);
      doc.text(
        grade, 
        x + (i * barWidth) + (barWidth / 2), 
        y + height + 5,
        { align: 'center' }
      );
    });
    
    // Add chart title
    doc.setFontSize(10);
    doc.text("Bar Chart", x + (width / 2), y - 5, { align: 'center' });
  };

  // Draw pie chart for PDF
  const drawPieChart = (doc, x, y, width, height) => {
    const grades = Object.keys(gradeDistribution);
    const total = attempts.length;
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const radius = Math.min(width, height) / 2 - 5;
    
    if (total === 0) return;
    
    let startAngle = 0;
    
    // Draw pie segments
    grades.forEach((grade) => {
      const count = gradeDistribution[grade];
      if (count === 0) return;
      
      const sliceAngle = (count / total) * 2 * Math.PI;
      const { color } = calculateGrade(
        grade === 'A+' ? 95 : 
        grade === 'A' ? 85 : 
        grade === 'B+' ? 75 : 
        grade === 'B' ? 65 : 
        grade === 'C' ? 55 : 
        grade === 'D' ? 45 : 35
      );
      
      doc.setFillColor(color);
      doc.ellipse(centerX, centerY, radius, radius, 0, startAngle, startAngle + sliceAngle, 'F');
      
      startAngle += sliceAngle;
    });
    
    // Draw circle border
    doc.setDrawColor(0);
    doc.circle(centerX, centerY, radius);
    
    // Add chart title
    doc.setFontSize(10);
    doc.text("Pie Chart", x + (width / 2), y - 5, { align: 'center' });
  };

  // Show attempts for selected exam in table format
  if (selectedExam) {
    return (
      <div className="admin-exam-container">
        <button className="back-button" onClick={handleBack} data-aos="fade-right">
          <FaArrowLeft /> Back to Exams
        </button>
        
        <div className="exam-header" data-aos="fade-up">
          <h2>
            <FaClipboardList /> Exam #{selectedExam.examNumber} -{" "}
            {selectedExam.examTitle || "Untitled"}
          </h2>
          <p>Total Questions: {selectedExam.questions.length}</p>
        </div>

        {/* Grade Distribution Section */}
        {attempts.length > 0 && (
          <div className="grade-section" data-aos="fade-up" data-aos-delay="100">
            <div className="grade-section-header">
              <h3>Grade Distribution</h3>
              <button className="download-btn" onClick={downloadPDF}>
                <FaDownload /> Download Report
              </button>
            </div>
            
            <div className="charts-container">
              <div className="chart-wrapper">
                <h4>Bar Chart</h4>
                <div className="chart-container">
                  <Bar data={chartData} options={chartOptions} aria-label="Bar Chart" />
                </div>
              </div>
              <div className="chart-wrapper">
                <h4>Pie Chart</h4>
                <div className="chart-container">
                  <Pie data={chartData} options={chartOptions} aria-label="Pie Chart" />
                </div>
              </div>
            </div>
            
            <div className="grade-stats">
              <div className="grade-stat">
                <span className="stat-label">Total Attempts:</span>
                <span className="stat-value">{attempts.length}</span>
              </div>
              <div className="grade-stat">
                <span className="stat-label">Highest Grade:</span>
                <span className="stat-value">
                  {Object.keys(gradeDistribution).reduce((max, grade) => 
                    gradeDistribution[grade] > gradeDistribution[max] ? grade : max, 'A+'
                  )}
                </span>
              </div>
              <div className="grade-stat">
                <span className="stat-label">Average Score:</span>
                <span className="stat-value">
                  {attempts.length > 0 
                    ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / attempts.length) + '%'
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="controls-row" data-aos="fade-up" data-aos-delay="200">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by student name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <h3 data-aos="fade-up">Student Attempts</h3>

        {loading ? (
          <div className="loading" data-aos="fade-up">
            <div className="spinner"></div>
            <p>Loading attempts...</p>
          </div>
        ) : filteredAttempts.length === 0 ? (
          <div className="no-data" data-aos="fade-up">
            <p>{searchTerm ? "No matching attempts found." : "No student attempts for this exam yet."}</p>
          </div>
        ) : (
          <div className="table-container" data-aos="fade-up">
            <table className="attempts-table">
              <thead>
                <tr>
                  <th>USN</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttempts.map((attempt) => {
                  const { grade, color, label } = calculateGrade(attempt.percentage);
                  
                  return (
                    <tr key={attempt._id} data-aos="fade-right">
                      <td>{attempt.student?.usn || 'Unknown'}</td>
                      <td>
                        <FaUserGraduate /> {attempt.student?.name || "Unknown"}
                      </td>
                      <td>{attempt.student?.email || "Unknown"}</td>
                      <td>
                        <span className="score">{attempt.score}</span>/
                        <span className="total">{attempt.totalQuestions}</span>
                      </td>
                      <td>
                        <span className="grade-badge" style={{ background: color }}>
                          {grade}
                        </span>
                      </td>
                      <td>
                        <span className="grade-status">{label}</span>
                      </td>
                      <td>
                        <button 
                          className="view-answers-btn"
                          onClick={() => viewStudentAnswers(attempt)}
                        >
                          <FaEye /> View Answers
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for viewing student answers */}
        {showModal && selectedAttempt && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>
                  <FaUserGraduate /> {selectedAttempt.student?.name || "Unknown"}'s Answers
                </h3>
                <button className="close-modal" onClick={closeModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="attempt-summary">
                  <p><strong>Exam:</strong> {selectedExam.examTitle || `Exam #${selectedExam.examNumber}`}</p>
                  <p><strong>Score:</strong> {selectedAttempt.score}/{selectedAttempt.totalQuestions} ({selectedAttempt.percentage}%)</p>
                  <p><strong>Grade:</strong> 
                    <span className="grade-badge" style={{ 
                      background: calculateGrade(selectedAttempt.percentage).color,
                      marginLeft: '8px'
                    }}>
                      {calculateGrade(selectedAttempt.percentage).grade}
                    </span> - {calculateGrade(selectedAttempt.percentage).label}
                  </p>
                  <p><strong>Date:</strong> {new Date(selectedAttempt.createdAt).toLocaleString()}</p>
                </div>
                
                <div className="answers-list">
                  {selectedAttempt.answers.map((a, i) => {
                    const q = selectedExam.questions.find(
                      (q) => q._id === a.questionId
                    );
                    return (
                      <div key={i} className={`answer-item ${a.isCorrect ? 'correct' : 'incorrect'}`}>
                        <div className="question-header">
                          <span className="question-number">
                            <FaIdBadge /> Q{i + 1}
                          </span>
                          {a.isCorrect ? (
                            <FaCheckCircle className="correct-icon" />
                          ) : (
                            <FaTimesCircle className="incorrect-icon" />
                          )}
                        </div>
                        <p className="question-text">{q?.questionText || "Unknown Question"}</p>
                        <div className="answer-comparison">
                          <div className="answer-row">
                            <span className="answer-label">Student's Answer:</span>
                            <span className={`chosen-answer ${a.isCorrect ? 'correct' : 'incorrect'}`}>
                              {a.chosenAnswer || "Not answered"}
                            </span>
                          </div>
                          {!a.isCorrect && (
                            <div className="answer-row">
                              <span className="answer-label">Correct Answer:</span>
                              <span className="correct-answer">{a.correctAnswer}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show list of all exams in card format
  return (
    <div className="admin-exam-container">
      <div className="branding-header" data-aos="fade-down">
        <h1><FaClipboardList /> Ligand Software Solutions</h1>
        <p>MERN Stack Workshop - Empowering Education Through Technology</p>
      </div>
      
      <h2 data-aos="fade-up">All Exams (Admin View)</h2>
      
      {exams.length === 0 ? (
        <div className="no-data" data-aos="fade-up">
          <p>No exams found.</p>
        </div>
      ) : (
        <div className="exams-grid">
          {exams.map((exam, index) => (
            <div 
              key={exam._id} 
              className="exam-card"
              onClick={() => handleExamClick(exam)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="exam-card-header">
                <h3>
                  <FaClipboardList /> Exam #{exam.examNumber}
                </h3>
                <span className={`visibility ${exam.visibility}`}>
                  {exam.visibility}
                </span>
              </div>
              
              <div className="exam-card-body">
                <h4>{exam.examTitle || "Untitled Exam"}</h4>
                <p className="questions-count">
                  <FaChartLine /> {exam.questions.length} Questions
                </p>
              </div>
              
              <div className="exam-card-footer">
                <button className="view-attempts-btn">
                  View Attempts <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Add this CSS to your styles
const styles = `
.admin-exam-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.branding-header {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.branding-header h1 {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.branding-header p {
  margin: 0.5rem 0 0 0;
  font-style: italic;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #4a5568;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background 0.3s;
}

.back-button:hover {
  background: #2d3748;
}

.exam-header {
  margin-bottom: 1.5rem;
}

.exam-header h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

/* Grade Distribution Styles */
.grade-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.grade-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.grade-section h3 {
  margin: 0;
  color: #2d3748;
}

.charts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.chart-wrapper {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.chart-wrapper h4 {
  margin: 0 0 1rem 0;
  text-align: center;
  color: #2d3748;
}

.chart-container {
  height: 250px;
  position: relative;
}

.grade-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.grade-stat {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
}

/* Grade Badge */
.grade-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  min-width: 32px;
  text-align: center;
}

.grade-status {
  font-size: 0.9rem;
  color: #4a5568;
}

.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-box svg {
  position: absolute;
  left: 10px;
  color: #718096;
}

.search-box input {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  width: 100%;
  font-size: 1rem;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3182ce;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.download-btn:hover {
  background: #2c5282;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #3182ce;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-data {
  text-align: center;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 8px;
  color: #718096;
}

.table-container {
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.attempts-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.attempts-table th {
  background: #3182ce;
  color: white;
  padding: 0.75rem 1rem;
  text-align: left;
}

.attempts-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.attempts-table tr:hover {
  background: #f7fafc;
}

.attempts-table td:first-child {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.score {
  font-weight: bold;
  color: #3182ce;
}

.total {
  color: #718096;
}

.view-answers-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #4299e1;
  color: white;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.view-answers-btn:hover {
  background: #3182ce;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: #2d3748;
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #718096;
}

.close-modal:hover {
  color: #2d3748;
}

.modal-body {
  padding: 1.5rem;
}

.attempt-summary {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.attempt-summary p {
  margin: 0.5rem 0;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answer-item {
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid;
}

.answer-item.correct {
  border-color: #48bb78;
  background: #f0fff4;
}

.answer-item.incorrect {
  border-color: #f56565;
  background: #fff5f5;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.question-number {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
}

.correct-icon {
  color: #48bb78;
}

.incorrect-icon {
  color: #f56565;
}

.question-text {
  margin: 0.5rem 0;
  color: #2d3748;
}

.answer-comparison {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.answer-row {
  display: flex;
  gap: 0.5rem;
}

.answer-label {
  font-weight: 500;
  color: #4a5568;
}

.chosen-answer.correct {
  color: #48bb78;
  font-weight: bold;
}

.chosen-answer.incorrect {
  color: #f56565;
  font-weight: bold;
  text-decoration: line-through;
}

.correct-answer {
  color: #48bb78;
  font-weight: bold;
}

/* Exam Cards Grid */
.exams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.exam-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.exam-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.exam-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #3182ce;
  color: white;
}

.exam-card-header h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.1rem;
}

.visibility {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.visibility.public {
  background: #48bb78;
}

.visibility.private {
  background: #f56565;
}

.exam-card-body {
  padding: 1.5rem 1rem;
}

.exam-card-body h4 {
  margin: 0 0 1rem 0;
  color: #2d3748;
  font-size: 1.2rem;
}

.questions-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: #718096;
}

.exam-card-footer {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.view-attempts-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #4299e1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.view-attempts-btn:hover {
  background: #3182ce;
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-exam-container {
    padding: 1rem;
  }
  
  .charts-container {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    height: 200px;
  }
  
  .grade-section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .grade-stats {
    grid-template-columns: 1fr;
  }
  
  .exams-grid {
    grid-template-columns: 1fr;
  }
  
  .attempts-table {
    font-size: 0.9rem;
  }
  
  .attempts-table th,
  .attempts-table td {
    padding: 0.5rem;
  }
  
  .attempts-table td:first-child {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .modal-content {
    margin: 1rem;
    width: calc(100% - 2rem);
  }
}

@media (max-width: 480px) {
  .branding-header h1 {
    font-size: 1.5rem;
  }
  
  .exam-header h2 {
    font-size: 1.2rem;
  }
  
  .attempts-table {
    font-size: 0.8rem;
  }
  
  .view-answers-btn {
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
  }
  
  .download-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.75rem;
  }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);