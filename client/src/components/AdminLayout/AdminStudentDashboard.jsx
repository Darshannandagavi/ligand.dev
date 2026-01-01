import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import Loader from "../StyleComponents/Loader";

window.jspdf = { jsPDF };
window.html2canvas = html2canvas;

const API = "https://ligand-dev-7.onrender.com/api";

// Custom API hook with error handling
const useApi = () => {
  const token = localStorage.getItem("token");
  
  const authHeader = useMemo(() => ({
    headers: { Authorization: `Bearer ${token}` },
  }), [token]);

  const safeRequest = async (method, url, data = null) => {
    try {
      const config = { ...authHeader };
      let response;
      
      switch (method.toLowerCase()) {
        case 'get':
          response = await axios.get(url, config);
          break;
        case 'post':
          response = await axios.post(url, data, config);
          break;
        case 'put':
          response = await axios.put(url, data, config);
          break;
        case 'delete':
          response = await axios.delete(url, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      
      return { data: response?.data, error: null };
    } catch (error) {
      console.error(`API Error (${method} ${url}):`, error);
      return { data: null, error: error.message };
    }
  };

  return { safeRequest };
};

const AdminStudentDashboard = () => {
  const { safeRequest } = useApi();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [notification, setNotification] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Show notification
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const exportPDF = async () => {
  try {
    const element = document.querySelector(".admin-dashboard-container");

    if (!element) {
      alert("Nothing to export");
      return;
    }

    const canvas = await window.html2canvas(element, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new window.jspdf.jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("students-report.pdf");
  } catch (error) {
    console.error("PDF Export Error:", error);
    alert("Failed to export PDF");
  }
};


  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await safeRequest('get', `${API}/users`);
    
    if (error) {
      showNotification("Failed to load students", "error");
      setLoading(false);
      return;
    }
    
    if (Array.isArray(data)) {
      setStudents(data);
    } else {
      setStudents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Load detailed information for selected student
  const loadStudentDetails = async (student) => {
    if (selectedStudent?._id === student._id) {
      setSelectedStudent(null);
      return;
    }

    setDetailsLoading(true);
    setSelectedStudent({ ...student, loading: true });
    
    const id = student._id;
    const usn = student.usn;

    const endpoints = [
      { key: 'homework', url: `${API}/homeworkstatus/${id}` },
      { key: 'interviewScores', url: `${API}/topics/interviewscore/${usn}` },
      { key: 'examHistory', url: `${API}/attempts/student/${id}` },
      { key: 'attendance', url: `${API}/attendance?student=${id}` }
    ];

    try {
      const results = await Promise.allSettled(
        endpoints.map(({ url }) => axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }))
      );

      const details = {};
      results.forEach((result, index) => {
        const { key } = endpoints[index];
        if (result.status === 'fulfilled') {
          details[key] = result.value?.data?.data || result.value?.data || [];
        } else {
          details[key] = [];
          console.warn(`Failed to load ${key}:`, result.reason);
        }
      });

      setSelectedStudent({
        ...student,
        ...details,
        loading: false
      });
      
      showNotification(`Loaded details for ${student.name}`, "success");
    } catch (error) {
      console.error("Error loading student details:", error);
      showNotification("Failed to load student details", "error");
    }
    
    setDetailsLoading(false);
  };

  // Get unique programs for filter dropdown
  const uniquePrograms = useMemo(() => {
    const programs = new Set();
    students.forEach(student => {
      if (student.programName) programs.add(student.programName);
    });
    return Array.from(programs);
  }, [students]);

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.usn && student.usn.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()));

      // Program filter
      const matchesFilter = filterBy === "all" || 
        (student.programName && student.programName.toLowerCase() === filterBy.toLowerCase());

      return matchesSearch && matchesFilter;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'usn':
          aValue = a.usn || '';
          bValue = b.usn || '';
          break;
        case 'program':
          aValue = a.programName || '';
          bValue = b.programName || '';
          break;
        case 'batch':
          aValue = a.batch || '';
          bValue = b.batch || '';
          break;
        default:
          aValue = a.name || '';
          bValue = b.name || '';
      }

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [students, searchTerm, filterBy, sortBy, sortOrder]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter(s => s.isActive !== false).length;
    const uniqueTechs = new Set(students.map(s => s.technology).filter(Boolean)).size;
    const totalPrograms = uniquePrograms.length;
    
    return { total, active, uniqueTechs, totalPrograms };
  }, [students, uniquePrograms]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate attendance percentage
  const calculateAttendancePercentage = (attendance) => {
    if (!attendance || attendance.length === 0) return 0;
    const present = attendance.filter(a => a?.status === 'present').length;
    return Math.round((present / attendance.length) * 100);
  };

  // Calculate average exam score
  const calculateAverageScore = (exams) => {
    if (!exams || exams.length === 0) return 0;
    const total = exams.reduce((sum, exam) => sum + (exam?.percentage || 0), 0);
    return Math.round(total / exams.length);
  };

  // Toggle sort order
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Notification Toast */}
      {notification && (
        <div className={`admin-dashboard-notification admin-dashboard-notification-${notification.type}`}>
          <div className="admin-dashboard-notification-content">
            <span className="admin-dashboard-notification-icon">
              {notification.type === 'success' ? '✓' : notification.type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span className="admin-dashboard-notification-message">{notification.message}</span>
          </div>
          <button 
            className="admin-dashboard-notification-close"
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <header className="admin-dashboard-header">
        <div className="admin-dashboard-header-content">
          <div className="admin-dashboard-header-text">
            <h1 className="admin-dashboard-title">Student Analytics Dashboard</h1>
            <p className="admin-dashboard-subtitle">Comprehensive overview of student performance and progress</p>
          </div>
          <div className="admin-dashboard-header-actions">
            <button 
              className="admin-dashboard-refresh-btn"
              onClick={fetchStudents}
              disabled={loading}
            >
              <span className="admin-dashboard-refresh-icon">🔄</span>
              Refresh Data
            </button>
            <button className="admin-dashboard-export-btn">
              <span className="admin-dashboard-export-icon" onClick={exportPDF}>📥</span>
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Statistics Cards */}
      <div className="admin-dashboard-stats-grid">
        <div className="admin-dashboard-stat-card admin-dashboard-stat-card-primary">
          <div className="admin-dashboard-stat-icon-wrapper">
            <div className="admin-dashboard-stat-icon">👥</div>
          </div>
          <div className="admin-dashboard-stat-content">
            <h3 className="admin-dashboard-stat-value">{stats.total}</h3>
            <p className="admin-dashboard-stat-label">Total Students</p>
            
          </div>
        </div>

        <div className="admin-dashboard-stat-card admin-dashboard-stat-card-success">
          <div className="admin-dashboard-stat-icon-wrapper">
            <div className="admin-dashboard-stat-icon">✅</div>
          </div>
          <div className="admin-dashboard-stat-content">
            <h3 className="admin-dashboard-stat-value">{stats.active}</h3>
       
            <span className="admin-dashboard-stat-change">{Math.round((stats.active/stats.total)*100)}% active rate</span>
          </div>
        </div>

        <div className="admin-dashboard-stat-card admin-dashboard-stat-card-warning">
          <div className="admin-dashboard-stat-icon-wrapper">
            <div className="admin-dashboard-stat-icon">🏫</div>
          </div>
          <div className="admin-dashboard-stat-content">
            <h3 className="admin-dashboard-stat-value">{stats.totalPrograms}</h3>
            <p className="admin-dashboard-stat-label">Programs</p>
            <span className="admin-dashboard-stat-change">Across all departments</span>
          </div>
        </div>

        <div className="admin-dashboard-stat-card admin-dashboard-stat-card-danger">
          <div className="admin-dashboard-stat-icon-wrapper">
            <div className="admin-dashboard-stat-icon">💻</div>
          </div>
          <div className="admin-dashboard-stat-content">
            <h3 className="admin-dashboard-stat-value">{stats.uniqueTechs}</h3>
            <p className="admin-dashboard-stat-label">Technologies</p>
            <span className="admin-dashboard-stat-change">Being studied</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-dashboard-controls-section">
        <div className="admin-dashboard-search-container">
          <div className="admin-dashboard-search-wrapper">
            <span className="admin-dashboard-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search students by name, USN, email, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-dashboard-search-input"
            />
            {searchTerm && (
              <button 
                className="admin-dashboard-clear-search"
                onClick={() => setSearchTerm("")}
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        <div className="admin-dashboard-filters-container">
          <div className="admin-dashboard-filter-group">
            <label className="admin-dashboard-filter-label">Filter by Program</label>
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="admin-dashboard-filter-select"
            >
              <option value="all">All Programs</option>
              {uniquePrograms.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>

          <div className="admin-dashboard-filter-group">
            <label className="admin-dashboard-filter-label">Sort by</label>
            <div className="admin-dashboard-sort-buttons">
              {['name', 'usn', 'program', 'batch'].map(field => (
                <button
                  key={field}
                  className={`admin-dashboard-sort-btn ${sortBy === field ? 'active' : ''}`}
                  onClick={() => handleSort(field)}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortBy === field && (
                    <span className="admin-dashboard-sort-arrow">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-dashboard-results-info">
            <span className="admin-dashboard-results-count">
              {filteredAndSortedStudents.length} of {students.length} students
            </span>
          </div>
        </div>
      </div>

      {/* Student Grid */}
      <div className="admin-dashboard-student-grid-container">
        <div className="admin-dashboard-student-grid-header">
          <h2 className="admin-dashboard-section-title">Student Directory</h2>
        </div>

        {filteredAndSortedStudents.length === 0 ? (
          <div className="admin-dashboard-empty-state">
            <div className="admin-dashboard-empty-icon">👨‍🎓</div>
            <h3 className="admin-dashboard-empty-title">No students found</h3>
            <p className="admin-dashboard-empty-message">
              {searchTerm ? "Try adjusting your search or filter criteria" : "No students available in the system"}
            </p>
            {searchTerm && (
              <button 
                className="admin-dashboard-clear-filters-btn"
                onClick={() => {
                  setSearchTerm("");
                  setFilterBy("all");
                }}
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="admin-dashboard-student-grid">
            {filteredAndSortedStudents.map((student) => (
              <div 
                key={student._id}
                className={`admin-dashboard-student-card ${
                  selectedStudent?._id === student._id ? 'admin-dashboard-student-card-selected' : ''
                }`}
                onClick={() => loadStudentDetails(student)}
              >
                <div className="admin-dashboard-student-card-header">
                  <div className="admin-dashboard-student-avatar">
                    {student.profilePic ? (
                      <img 
                        src={student.profilePic} 
                        alt={student.name}
                        className="admin-dashboard-student-avatar-img"
                      />
                    ) : (
                      <div className="admin-dashboard-student-avatar-fallback">
                        {student.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div className="admin-dashboard-student-status-indicator"></div>
                  </div>
                  <div className="admin-dashboard-student-batch-badge">
                    {student.batch || 'N/A'}
                  </div>
                </div>

                <div className="admin-dashboard-student-card-body">
                  <h3 className="admin-dashboard-student-name">
                    {student.name || "Unnamed Student"}
                  </h3>
                  <p className="admin-dashboard-student-usn">{student.usn || "No USN"}</p>
                  <p className="admin-dashboard-student-email">{student.email || "No email"}</p>
                  
                  <div className="admin-dashboard-student-tags">
                    <span className="admin-dashboard-student-tag admin-dashboard-student-tag-program">
                      {student.programName || "No Program"}
                    </span>
                    {student.technology && (
                      <span className="admin-dashboard-student-tag admin-dashboard-student-tag-tech">
                        {student.technology}
                      </span>
                    )}
                  </div>
                </div>

                <div className="admin-dashboard-student-card-footer">
                  <button className="admin-dashboard-student-view-btn">
                    View Details
                    <span className="admin-dashboard-student-view-arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Details Panel */}
      {selectedStudent && (
        <div className="admin-dashboard-details-panel">
          <div className="admin-dashboard-details-panel-overlay" onClick={() => setSelectedStudent(null)}></div>
          <div className="admin-dashboard-details-panel-content">
            <div className="admin-dashboard-details-panel-header">
              <div className="admin-dashboard-details-header-content">
                <div className="admin-dashboard-details-header-profile">
                  <div className="admin-dashboard-details-avatar">
                    {selectedStudent.profilePic ? (
                      <img 
                        src={selectedStudent.profilePic} 
                        alt={selectedStudent.name}
                        className="admin-dashboard-details-avatar-img"
                      />
                    ) : (
                      <div className="admin-dashboard-details-avatar-fallback">
                        {selectedStudent.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                  <div className="admin-dashboard-details-header-info">
                    <h2 className="admin-dashboard-details-student-name">{selectedStudent.name}</h2>
                    <div className="admin-dashboard-details-header-meta">
                      <span className="admin-dashboard-details-usn">{selectedStudent.usn}</span>
                      <span className="admin-dashboard-details-program">{selectedStudent.programName}</span>
                      <span className="admin-dashboard-details-batch">{selectedStudent.batch}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="admin-dashboard-details-close-btn"
                  onClick={() => setSelectedStudent(null)}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="admin-dashboard-details-panel-body">
              {detailsLoading || selectedStudent.loading ? (
                <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>
              ) : (
                <>
                  {/* Quick Stats */}
                  <div className="admin-dashboard-details-quick-stats">
                    <div className="admin-dashboard-quick-stat">
                      <div className="admin-dashboard-quick-stat-icon">📚</div>
                      <div className="admin-dashboard-quick-stat-info">
                        <span className="admin-dashboard-quick-stat-value">
                          {selectedStudent.homework?.length || 0}
                        </span>
                        <span className="admin-dashboard-quick-stat-label">Assignments</span>
                      </div>
                    </div>
                    <div className="admin-dashboard-quick-stat">
                      <div className="admin-dashboard-quick-stat-icon">📊</div>
                      <div className="admin-dashboard-quick-stat-info">
                        <span className="admin-dashboard-quick-stat-value">
                          {calculateAverageScore(selectedStudent.examHistory)}%
                        </span>
                        <span className="admin-dashboard-quick-stat-label">Avg. Score</span>
                      </div>
                    </div>
                    <div className="admin-dashboard-quick-stat">
                      <div className="admin-dashboard-quick-stat-icon">🎤</div>
                      <div className="admin-dashboard-quick-stat-info">
                        <span className="admin-dashboard-quick-stat-value">
                          {selectedStudent.interviewScores?.length || 0}
                        </span>
                        <span className="admin-dashboard-quick-stat-label">Interviews</span>
                      </div>
                    </div>
                    <div className="admin-dashboard-quick-stat">
                      <div className="admin-dashboard-quick-stat-icon">📅</div>
                      <div className="admin-dashboard-quick-stat-info">
                        <span className="admin-dashboard-quick-stat-value">
                          {calculateAttendancePercentage(selectedStudent.attendance)}%
                        </span>
                        <span className="admin-dashboard-quick-stat-label">Attendance</span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="admin-dashboard-details-tabs">
                    {['overview', 'homework', 'exams', 'interviews', 'attendance'].map(tab => (
                      <button
                        key={tab}
                        className={`admin-dashboard-details-tab ${
                          activeTab === tab ? 'admin-dashboard-details-tab-active' : ''
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="admin-dashboard-details-tab-content">
                    {activeTab === 'overview' && (
                      <div className="admin-dashboard-overview-grid">
                        <div className="admin-dashboard-overview-card">
                          <h3 className="admin-dashboard-overview-card-title">Recent Homework</h3>
                          {selectedStudent.homework?.length > 0 ? (
                            <div className="admin-dashboard-overview-list">
                              {selectedStudent.homework.slice(0, 4).map((hw, i) => (
                                <div key={i} className="admin-dashboard-overview-item">
                                  <div className="admin-dashboard-overview-item-main">
                                    <span className="admin-dashboard-overview-item-title">
                                      {hw?.homeworkId?.chapterName || `Assignment ${i + 1}`}
                                    </span>
                                    <span className={`admin-dashboard-overview-item-status admin-dashboard-status-${hw?.status?.toLowerCase()}`}>
                                      {hw?.status || "Pending"}
                                    </span>
                                  </div>
                                  <div className="admin-dashboard-overview-item-meta">
                                    <span className="admin-dashboard-overview-item-date">
                                      Submitted: {formatDate(hw?.submittedAt)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="admin-dashboard-no-data">No homework data available</p>
                          )}
                        </div>

                        <div className="admin-dashboard-overview-card">
                          <h3 className="admin-dashboard-overview-card-title">Exam Performance</h3>
                          {selectedStudent.examHistory?.length > 0 ? (
                            <div className="admin-dashboard-overview-list">
                              {selectedStudent.examHistory.slice(0, 4).map((exam, i) => (
                                <div key={i} className="admin-dashboard-overview-item">
                                  <div className="admin-dashboard-overview-item-main">
                                    <span className="admin-dashboard-overview-item-title">
                                      {exam?.exam?.examTitle || `Exam ${i + 1}`}
                                    </span>
                                    <span className="admin-dashboard-overview-item-score">
                                      {exam?.percentage || 0}%
                                    </span>
                                  </div>
                                  <div className="admin-dashboard-overview-progress">
                                    <div 
                                      className="admin-dashboard-overview-progress-bar"
                                      style={{ width: `${exam?.percentage || 0}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="admin-dashboard-no-data">No exam history available</p>
                          )}
                        </div>

                        <div className="admin-dashboard-overview-card">
                          <h3 className="admin-dashboard-overview-card-title">Interview Scores</h3>
                          {selectedStudent.interviewScores?.length > 0 ? (
                            <div className="admin-dashboard-overview-list">
                              {selectedStudent.interviewScores.slice(0, 4).map((score, i) => (
                                <div key={i} className="admin-dashboard-overview-item">
                                  <div className="admin-dashboard-overview-item-main">
                                    <span className="admin-dashboard-overview-item-title">
                                      {score?.topicId?.name || `Topic ${i + 1}`}
                                    </span>
                                    <span className="admin-dashboard-overview-item-score">
                                      {score?.score || 0}/{score?.total || 100}
                                    </span>
                                  </div>
                                  <div className="admin-dashboard-overview-item-feedback">
                                    {score?.feedback || "No feedback provided"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="admin-dashboard-no-data">No interview scores available</p>
                          )}
                        </div>

                        <div className="admin-dashboard-overview-card">
                          <h3 className="admin-dashboard-overview-card-title">Attendance Summary</h3>
                          {selectedStudent.attendance?.length > 0 ? (
                            <>
                              <div className="admin-dashboard-attendance-stats">
                                <div className="admin-dashboard-attendance-stat">
                                  <span className="admin-dashboard-attendance-stat-label">Present</span>
                                  <span className="admin-dashboard-attendance-stat-value admin-dashboard-attendance-present">
                                    {selectedStudent.attendance.filter(a => a?.status === 'present').length}
                                  </span>
                                </div>
                                <div className="admin-dashboard-attendance-stat">
                                  <span className="admin-dashboard-attendance-stat-label">Absent</span>
                                  <span className="admin-dashboard-attendance-stat-value admin-dashboard-attendance-absent">
                                    {selectedStudent.attendance.filter(a => a?.status === 'absent').length}
                                  </span>
                                </div>
                                <div className="admin-dashboard-attendance-stat">
                                  <span className="admin-dashboard-attendance-stat-label">Total</span>
                                  <span className="admin-dashboard-attendance-stat-value">
                                    {selectedStudent.attendance.length}
                                  </span>
                                </div>
                              </div>
                              <div className="admin-dashboard-attendance-chart">
                                <div 
                                  className="admin-dashboard-attendance-chart-fill"
                                  style={{ 
                                    width: `${calculateAttendancePercentage(selectedStudent.attendance)}%` 
                                  }}
                                ></div>
                              </div>
                              <div className="admin-dashboard-attendance-percentage">
                                {calculateAttendancePercentage(selectedStudent.attendance)}% Attendance Rate
                              </div>
                            </>
                          ) : (
                            <p className="admin-dashboard-no-data">No attendance records available</p>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === 'homework' && (
                      <div className="admin-dashboard-full-list-section">
                        <h3 className="admin-dashboard-full-list-title">All Homework Assignments</h3>
                        {selectedStudent.homework?.length > 0 ? (
                          <div className="admin-dashboard-homework-grid">
                            {selectedStudent.homework.map((hw, i) => (
                              <div key={i} className="admin-dashboard-homework-card">
                                <div className="admin-dashboard-homework-card-header">
                                  <h4 className="admin-dashboard-homework-card-title">
                                    {hw?.homeworkId?.chapterName || `Assignment ${i + 1}`}
                                  </h4>
                                  <span className={`admin-dashboard-homework-status admin-dashboard-status-${hw?.status?.toLowerCase()}`}>
                                    {hw?.status || "Pending"}
                                  </span>
                                </div>
                                <p className="admin-dashboard-homework-description">
                                  {hw?.homeworkId?.description || "No description available"}
                                </p>
                                <div className="admin-dashboard-homework-card-footer">
                                  <span className="admin-dashboard-homework-due-date">
                                    <strong>Due:</strong> {formatDate(hw?.dueDate) || "No due date"}
                                  </span>
                                  <span className="admin-dashboard-homework-submitted">
                                    <strong>Submitted:</strong> {formatDate(hw?.submittedAt) || "Not submitted"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="admin-dashboard-no-data">No homework assignments found</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'exams' && (
                      <div className="admin-dashboard-full-list-section">
                        <h3 className="admin-dashboard-full-list-title">Exam History</h3>
                        {selectedStudent.examHistory?.length > 0 ? (
                          <div className="admin-dashboard-exams-table-container">
                            <table className="admin-dashboard-exams-table">
                              <thead>
                                <tr>
                                  <th>Exam</th>
                                  <th>Date</th>
                                  <th>Score</th>
                                  <th>Percentage</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedStudent.examHistory.map((exam, i) => (
                                  <tr key={i} className="admin-dashboard-exams-table-row">
                                    <td className="admin-dashboard-exam-name">
                                      {exam?.exam?.examTitle || `Exam ${i + 1}`}
                                    </td>
                                    <td className="admin-dashboard-exam-date">
                                      {formatDate(exam?.createdAt)}
                                    </td>
                                    <td className="admin-dashboard-exam-score">
                                      {exam?.score || 0}/{exam?.totalScore || 100}
                                    </td>
                                    <td className="admin-dashboard-exam-percentage">
                                      <div className="admin-dashboard-percentage-container">
                                        <span className="admin-dashboard-percentage-value">
                                          {exam?.percentage || 0}%
                                        </span>
                                        <div className="admin-dashboard-percentage-bar">
                                          <div 
                                            className="admin-dashboard-percentage-fill"
                                            style={{ width: `${exam?.percentage || 0}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="admin-dashboard-exam-status">
                                      <span className={`admin-dashboard-exam-status-badge ${
                                        (exam?.percentage || 0) >= 60 ? 'admin-dashboard-status-passed' : 'admin-dashboard-status-failed'
                                      }`}>
                                        {(exam?.percentage || 0) >= 60 ? 'Passed' : 'Failed'}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="admin-dashboard-no-data">No exam attempts found</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'interviews' && (
                      <div className="admin-dashboard-full-list-section">
                        <h3 className="admin-dashboard-full-list-title">Interview Performance</h3>
                        {selectedStudent.interviewScores?.length > 0 ? (
                          <div className="admin-dashboard-interviews-grid">
                            {selectedStudent.interviewScores.map((score, i) => (
                              <div key={i} className="admin-dashboard-interview-card">
                                <div className="admin-dashboard-interview-card-header">
                                  <h4 className="admin-dashboard-interview-card-title">
                                    {score?.topicId?.name || `Interview ${i + 1}`}
                                  </h4>
                                  <div className="admin-dashboard-interview-score-display">
                                    <span className="admin-dashboard-interview-score-value">
                                      {score?.score || 0}/{score?.total || 100}
                                    </span>
                                    <div className="admin-dashboard-interview-score-percentage">
                                      {Math.round(((score?.score || 0) / (score?.total || 100)) * 100)}%
                                    </div>
                                  </div>
                                </div>
                                <div className="admin-dashboard-interview-card-body">
                                  <p className="admin-dashboard-interview-date">
                                    <strong>Date:</strong> {formatDate(score?.createdAt)}
                                  </p>
                                  <div className="admin-dashboard-interview-feedback">
                                    <strong>Feedback:</strong>
                                    <p>{score?.feedback || "No specific feedback provided."}</p>
                                  </div>
                                  <div className="admin-dashboard-interview-ratings">
                                    <div className="admin-dashboard-interview-rating">
                                      <span className="admin-dashboard-interview-rating-label">Communication</span>
                                      <div className="admin-dashboard-interview-rating-bar">
                                        <div 
                                          className="admin-dashboard-interview-rating-fill"
                                          style={{ width: `${score?.communication || 0}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                    <div className="admin-dashboard-interview-rating">
                                      <span className="admin-dashboard-interview-rating-label">Technical</span>
                                      <div className="admin-dashboard-interview-rating-bar">
                                        <div 
                                          className="admin-dashboard-interview-rating-fill"
                                          style={{ width: `${score?.technical || 0}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="admin-dashboard-no-data">No interview scores found</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'attendance' && (
                      <div className="admin-dashboard-full-list-section">
                        <h3 className="admin-dashboard-full-list-title">Attendance Records</h3>
                        {selectedStudent.attendance?.length > 0 ? (
                          <>
                            <div className="admin-dashboard-attendance-overview">
                              <div className="admin-dashboard-attendance-overview-card admin-dashboard-attendance-overview-total">
                                <span className="admin-dashboard-attendance-overview-label">Total Sessions</span>
                                <span className="admin-dashboard-attendance-overview-value">
                                  {selectedStudent.attendance.length}
                                </span>
                              </div>
                              <div className="admin-dashboard-attendance-overview-card admin-dashboard-attendance-overview-present">
                                <span className="admin-dashboard-attendance-overview-label">Present</span>
                                <span className="admin-dashboard-attendance-overview-value">
                                  {selectedStudent.attendance.filter(a => a?.status === 'present').length}
                                </span>
                              </div>
                              <div className="admin-dashboard-attendance-overview-card admin-dashboard-attendance-overview-absent">
                                <span className="admin-dashboard-attendance-overview-label">Absent</span>
                                <span className="admin-dashboard-attendance-overview-value">
                                  {selectedStudent.attendance.filter(a => a?.status === 'absent').length}
                                </span>
                              </div>
                              <div className="admin-dashboard-attendance-overview-card admin-dashboard-attendance-overview-rate">
                                <span className="admin-dashboard-attendance-overview-label">Attendance Rate</span>
                                <span className="admin-dashboard-attendance-overview-value">
                                  {calculateAttendancePercentage(selectedStudent.attendance)}%
                                </span>
                              </div>
                            </div>
                            
                            <div className="admin-dashboard-attendance-table-container">
                              <table className="admin-dashboard-attendance-table">
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Session</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                  </tr>
                                </thead>
                                <tbody>
                                   
                                  {selectedStudent.attendance.map((record, i) => (
                                    <tr key={i} className="admin-dashboard-attendance-table-row">
                                      <td className="admin-dashboard-attendance-date">
                                        {formatDate(record?.date)}
                                      </td>
                                      <td className="admin-dashboard-attendance-session">
                                        
                                        {record?.session || "N/A"}
                                      </td>
                                      <td className="admin-dashboard-attendance-status">
                                        <span className={`admin-dashboard-attendance-status-badge admin-dashboard-attendance-status-${record?.status}`}>
                                          {record?.status || "Unknown"}
                                        </span>
                                      </td>
                                      <td className="admin-dashboard-attendance-remarks">
                                        {record?.remarks || "No remarks"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : (
                          <p className="admin-dashboard-no-data">No attendance records found</p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <style>
        {`
        /* AdminStudentDashboard.css - Unique & Modern Styles */

/* Reset and Base Styles */
.admin-dashboard-container * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.admin-dashboard-container {
  min-height: 100vh;
  padding: 24px;
  position: relative;
}

/* Loading State */
.admin-dashboard-loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.admin-dashboard-spinner-wrapper {
  text-align: center;
  background: white;
  padding: 48px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.admin-dashboard-spinner {
  width: 70px;
  height: 70px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #667eea;
  border-radius: 50%;
  animation: admin-dashboard-spin 1s linear infinite;
  margin: 0 auto 24px;
}

@keyframes admin-dashboard-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.admin-dashboard-loading-text {
  color: #4a5568;
  font-size: 18px;
  font-weight: 500;
}

/* Notification */
.admin-dashboard-notification {
  position: fixed;
  top: 30px;
  right: 30px;
  background: white;
  border-radius: 12px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: admin-dashboard-notification-slide 0.3s ease;
  min-width: 350px;
  border-left: 5px solid #667eea;
}

@keyframes admin-dashboard-notification-slide {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.admin-dashboard-notification-success {
  border-left-color: #48bb78;
}

.admin-dashboard-notification-error {
  border-left-color: #f56565;
}

.admin-dashboard-notification-info {
  border-left-color: #4299e1;
}

.admin-dashboard-notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-dashboard-notification-icon {
  font-size: 20px;
  font-weight: bold;
}

.admin-dashboard-notification-message {
  color: #2d3748;
  font-weight: 500;
}

.admin-dashboard-notification-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #a0aec0;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s;
}

.admin-dashboard-notification-close:hover {
  color: #718096;
}

/* Header */
.admin-dashboard-header {
  background: white;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.admin-dashboard-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.admin-dashboard-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-dashboard-header-text {
  flex: 1;
}

.admin-dashboard-title {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.admin-dashboard-subtitle {
  color: #718096;
  font-size: 16px;
  max-width: 600px;
}

.admin-dashboard-header-actions {
  display: flex;
  gap: 16px;
}

.admin-dashboard-refresh-btn,
.admin-dashboard-export-btn {
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
}

.admin-dashboard-refresh-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.admin-dashboard-refresh-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.5);
}

.admin-dashboard-refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-dashboard-export-btn {
  background: white;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}

.admin-dashboard-export-btn:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
}

.admin-dashboard-refresh-icon,
.admin-dashboard-export-icon {
  font-size: 18px;
}

/* Statistics Grid */
.admin-dashboard-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.admin-dashboard-stat-card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.admin-dashboard-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.admin-dashboard-stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.admin-dashboard-stat-card-primary::before {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.admin-dashboard-stat-card-success::before {
  background: linear-gradient(90deg, #48bb78, #38a169);
}

.admin-dashboard-stat-card-warning::before {
  background: linear-gradient(90deg, #ed8936, #dd6b20);
}

.admin-dashboard-stat-card-danger::before {
  background: linear-gradient(90deg, #f56565, #e53e3e);
}

.admin-dashboard-stat-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-dashboard-stat-card-primary .admin-dashboard-stat-icon-wrapper {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
}

.admin-dashboard-stat-card-success .admin-dashboard-stat-icon-wrapper {
  background: linear-gradient(135deg, rgba(72, 187, 120, 0.1), rgba(56, 161, 105, 0.1));
}

.admin-dashboard-stat-card-warning .admin-dashboard-stat-icon-wrapper {
  background: linear-gradient(135deg, rgba(237, 137, 54, 0.1), rgba(221, 107, 32, 0.1));
}

.admin-dashboard-stat-card-danger .admin-dashboard-stat-icon-wrapper {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.1), rgba(229, 62, 62, 0.1));
}

.admin-dashboard-stat-icon {
  font-size: 36px;
}

.admin-dashboard-stat-content {
  flex: 1;
}

.admin-dashboard-stat-value {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 4px;
  color: #2d3748;
}

.admin-dashboard-stat-label {
  color: #718096;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
}

.admin-dashboard-stat-change {
  font-size: 14px;
  color: #a0aec0;
  display: block;
}

/* Controls Section */
.admin-dashboard-controls-section {
  background: white;
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  align-items: center;
}

.admin-dashboard-search-container {
  position: relative;
}

.admin-dashboard-search-wrapper {
  position: relative;
}

.admin-dashboard-search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 20px;
  z-index: 1;
}

.admin-dashboard-search-input {
  width: 100%;
  padding: 18px 24px 18px 56px;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 16px;
  transition: all 0.3s;
  background: #f8fafc;
}

.admin-dashboard-search-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.admin-dashboard-clear-search {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 24px;
  color: #a0aec0;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}

.admin-dashboard-clear-search:hover {
  color: #718096;
}

.admin-dashboard-filters-container {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 20px;
  align-items: end;
}

.admin-dashboard-filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-dashboard-filter-label {
  color: #4a5568;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.admin-dashboard-filter-select {
  padding: 14px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 16px;
  padding-right: 50px;
}

.admin-dashboard-filter-select:focus {
  outline: none;
  border-color: #667eea;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.admin-dashboard-sort-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.admin-dashboard-sort-btn {
  padding: 10px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background: white;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.admin-dashboard-sort-btn:hover {
  border-color: #cbd5e0;
  background: #f7fafc;
}

.admin-dashboard-sort-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.admin-dashboard-sort-arrow {
  font-size: 12px;
}

.admin-dashboard-results-info {
  text-align: right;
}

.admin-dashboard-results-count {
  background: #edf2f7;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  display: inline-block;
}

/* Student Grid Container */
.admin-dashboard-student-grid-container {
  background: white;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.admin-dashboard-student-grid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.admin-dashboard-section-title {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  background: linear-gradient(90deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-dashboard-view-toggle {
  display: flex;
  gap: 8px;
  background: #edf2f7;
  padding: 6px;
  border-radius: 12px;
}

.admin-dashboard-view-btn {
  padding: 10px 20px;
  border: none;
  background: none;
  border-radius: 8px;
  font-weight: 500;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-dashboard-view-btn.active {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Empty State */
.admin-dashboard-empty-state {
  text-align: center;
  padding: 80px 40px;
  border: 3px dashed #e2e8f0;
  border-radius: 20px;
  margin: 20px 0;
}

.admin-dashboard-empty-icon {
  font-size: 80px;
  margin-bottom: 24px;
  opacity: 0.6;
}

.admin-dashboard-empty-title {
  font-size: 24px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 12px;
}

.admin-dashboard-empty-message {
  color: #718096;
  margin-bottom: 24px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.admin-dashboard-clear-filters-btn {
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.admin-dashboard-clear-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

/* Student Grid */
.admin-dashboard-student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.admin-dashboard-student-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.admin-dashboard-student-card:hover {
  border-color: #667eea;
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(102, 126, 234, 0.15);
}

.admin-dashboard-student-card-selected {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
}

.admin-dashboard-student-card-header {
  padding: 24px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.admin-dashboard-student-avatar {
  position: relative;
}

.admin-dashboard-student-avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.admin-dashboard-student-avatar-fallback {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  border: 4px solid white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.admin-dashboard-student-status-indicator {
  position: absolute;
  bottom: 4px;
  right: -2px;
  width: 16px;
  height: 16px;
  background: #48bb78;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
}

.admin-dashboard-student-batch-badge {
  background: linear-gradient(135deg, #ed8936, #dd6b20);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(237, 137, 54, 0.3);
}

.admin-dashboard-student-card-body {
  padding: 20px 24px;
}

.admin-dashboard-student-name {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
  line-height: 1.3;
}

.admin-dashboard-student-usn {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 15px;
}

.admin-dashboard-student-email {
  color: #718096;
  font-size: 14px;
  margin-bottom: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-dashboard-student-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.admin-dashboard-student-tag {
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.admin-dashboard-student-tag-program {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.admin-dashboard-student-tag-tech {
  background: rgba(72, 187, 120, 0.1);
  color: #38a169;
}

.admin-dashboard-student-card-footer {
  padding: 0 24px 24px;
}

.admin-dashboard-student-view-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;
}

.admin-dashboard-student-view-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.admin-dashboard-student-view-arrow {
  font-size: 18px;
  transition: transform 0.3s;
}

.admin-dashboard-student-card:hover .admin-dashboard-student-view-arrow {
  transform: translateX(4px);
}

/* Details Panel */
.admin-dashboard-details-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 900px;
  z-index: 1000;
}

.admin-dashboard-details-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  animation: admin-dashboard-fade-in 0.3s ease;
}

@keyframes admin-dashboard-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.admin-dashboard-details-panel-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: white;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.3);
  animation: admin-dashboard-slide-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow-y: auto;
}

@keyframes admin-dashboard-slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.admin-dashboard-details-panel-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 32px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.admin-dashboard-details-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-dashboard-details-header-profile {
  display: flex;
  align-items: center;
  gap: 24px;
}

.admin-dashboard-details-avatar {
  width: 100px;
  height: 100px;
}

.admin-dashboard-details-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  object-fit: cover;
  border: 5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.admin-dashboard-details-avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  border: 5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.admin-dashboard-details-header-info {
  flex: 1;
}

.admin-dashboard-details-student-name {
  font-size: 32px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
}

.admin-dashboard-details-header-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.admin-dashboard-details-usn,
.admin-dashboard-details-program,
.admin-dashboard-details-batch {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.admin-dashboard-details-close-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

.admin-dashboard-details-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.admin-dashboard-details-panel-body {
  padding: 32px;
}

/* Quick Stats */
.admin-dashboard-details-quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.admin-dashboard-quick-stat {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s;
}

.admin-dashboard-quick-stat:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.15);
}

.admin-dashboard-quick-stat-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-dashboard-quick-stat-info {
  flex: 1;
}

.admin-dashboard-quick-stat-value {
  display: block;
  font-size: 32px;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 4px;
}

.admin-dashboard-quick-stat-label {
  color: #718096;
  font-size: 14px;
  font-weight: 600;
}

/* Tabs */
.admin-dashboard-details-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
  overflow-x: auto;
}

.admin-dashboard-details-tab {
  padding: 14px 28px;
  background: none;
  border: none;
  color: #718096;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  white-space: nowrap;
  transition: all 0.3s;
  position: relative;
}

.admin-dashboard-details-tab:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.admin-dashboard-details-tab-active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.admin-dashboard-details-tab-active::after {
  content: '';
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  height: 4px;
  background: #667eea;
  border-radius: 2px;
}

/* Tab Content */
.admin-dashboard-details-tab-content {
  min-height: 400px;
}

/* Overview Grid */
.admin-dashboard-overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.admin-dashboard-overview-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  padding: 28px;
  transition: all 0.3s;
}

.admin-dashboard-overview-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15);
}

.admin-dashboard-overview-card-title {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #edf2f7;
}

.admin-dashboard-overview-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.admin-dashboard-overview-item {
  padding: 16px;
  background: #f8fafc;
  border-radius: 14px;
  border: 2px solid #e2e8f0;
  transition: all 0.2s;
}

.admin-dashboard-overview-item:hover {
  border-color: #cbd5e0;
  background: #edf2f7;
}

.admin-dashboard-overview-item-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.admin-dashboard-overview-item-title {
  font-weight: 600;
  color: #4a5568;
  flex: 1;
  margin-right: 16px;
}

.admin-dashboard-overview-item-status,
.admin-dashboard-overview-item-score {
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 14px;
  min-width: 80px;
  text-align: center;
}

.admin-dashboard-status-completed {
  background: rgba(72, 187, 120, 0.1);
  color: #38a169;
}

.admin-dashboard-status-pending {
  background: rgba(237, 137, 54, 0.1);
  color: #dd6b20;
}

.admin-dashboard-status-submitted {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.admin-dashboard-overview-item-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #a0aec0;
}

.admin-dashboard-overview-progress {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
}

.admin-dashboard-overview-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #48bb78, #38a169);
  border-radius: 4px;
  transition: width 0.6s ease;
}

.admin-dashboard-overview-item-feedback {
  font-size: 13px;
  color: #718096;
  margin-top: 8px;
  font-style: italic;
}

/* Attendance Stats */
.admin-dashboard-attendance-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.admin-dashboard-attendance-stat {
  text-align: center;
}

.admin-dashboard-attendance-stat-label {
  display: block;
  color: #718096;
  font-size: 14px;
  margin-bottom: 6px;
}

.admin-dashboard-attendance-stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
}

.admin-dashboard-attendance-present {
  color: #48bb78;
}

.admin-dashboard-attendance-absent {
  color: #f56565;
}

.admin-dashboard-attendance-chart {
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 12px;
}

.admin-dashboard-attendance-chart-fill {
  height: 100%;
  background: linear-gradient(90deg, #48bb78, #38a169);
  border-radius: 6px;
  transition: width 0.8s ease;
}

.admin-dashboard-attendance-percentage {
  text-align: center;
  font-weight: 600;
  color: #4a5568;
  font-size: 16px;
}

/* No Data */
.admin-dashboard-no-data {
  text-align: center;
  color: #a0aec0;
  padding: 40px 20px;
  font-style: italic;
}

/* Full List Sections */
.admin-dashboard-full-list-section {
  animation: admin-dashboard-fade-in 0.4s ease;
}

.admin-dashboard-full-list-title {
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 28px;
}

/* Homework Grid */
.admin-dashboard-homework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.admin-dashboard-homework-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  padding: 24px;
  transition: all 0.3s;
}

.admin-dashboard-homework-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.15);
}

.admin-dashboard-homework-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.admin-dashboard-homework-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-right: 16px;
}

.admin-dashboard-homework-status {
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.admin-dashboard-homework-description {
  color: #718096;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.admin-dashboard-homework-card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #a0aec0;
}

/* Exams Table */
.admin-dashboard-exams-table-container {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.admin-dashboard-exams-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-dashboard-exams-table thead {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.admin-dashboard-exams-table th {
  padding: 20px 24px;
  color: white;
  font-weight: 600;
  text-align: left;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-dashboard-exams-table-row {
  border-bottom: 2px solid #f8fafc;
  transition: all 0.2s;
}

.admin-dashboard-exams-table-row:hover {
  background: #f8fafc;
}

.admin-dashboard-exams-table td {
  padding: 20px 24px;
  color: #4a5568;
}

.admin-dashboard-exam-name {
  font-weight: 600;
  color: #2d3748;
}

.admin-dashboard-exam-date {
  color: #718096;
  font-size: 14px;
}

.admin-dashboard-exam-score {
  font-weight: 600;
}

.admin-dashboard-percentage-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-dashboard-percentage-value {
  font-weight: 600;
  color: #2d3748;
  min-width: 50px;
}

.admin-dashboard-percentage-bar {
  flex: 1;
  height: 10px;
  background: #e2e8f0;
  border-radius: 5px;
  overflow: hidden;
}

.admin-dashboard-percentage-fill {
  height: 100%;
  background: linear-gradient(90deg, #48bb78, #38a169);
  border-radius: 5px;
  transition: width 0.6s ease;
}

.admin-dashboard-exam-status-badge {
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
}

.admin-dashboard-status-passed {
  background: rgba(72, 187, 120, 0.1);
  color: #38a169;
}

.admin-dashboard-status-failed {
  background: rgba(245, 101, 101, 0.1);
  color: #e53e3e;
}

/* Interviews Grid */
.admin-dashboard-interviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.admin-dashboard-interview-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  padding: 24px;
  transition: all 0.3s;
}

.admin-dashboard-interview-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.15);
}

.admin-dashboard-interview-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #edf2f7;
}

.admin-dashboard-interview-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-right: 16px;
}

.admin-dashboard-interview-score-display {
  text-align: right;
}

.admin-dashboard-interview-score-value {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: #2d3748;
}

.admin-dashboard-interview-score-percentage {
  font-size: 14px;
  color: #48bb78;
  font-weight: 600;
}

.admin-dashboard-interview-card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.admin-dashboard-interview-date {
  color: #718096;
  font-size: 14px;
}

.admin-dashboard-interview-feedback {
  color: #4a5568;
  line-height: 1.6;
}

.admin-dashboard-interview-feedback strong {
  color: #2d3748;
}

.admin-dashboard-interview-ratings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-dashboard-interview-rating {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-dashboard-interview-rating-label {
  font-size: 14px;
  color: #4a5568;
  min-width: 120px;
}

.admin-dashboard-interview-rating-bar {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.admin-dashboard-interview-rating-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.6s ease;
}

/* Attendance Overview */
.admin-dashboard-attendance-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.admin-dashboard-attendance-overview-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s;
}

.admin-dashboard-attendance-overview-card:hover {
  transform: translateY(-4px);
}

.admin-dashboard-attendance-overview-total:hover {
  border-color: #667eea;
  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.15);
}

.admin-dashboard-attendance-overview-present:hover {
  border-color: #48bb78;
  box-shadow: 0 12px 28px rgba(72, 187, 120, 0.15);
}

.admin-dashboard-attendance-overview-absent:hover {
  border-color: #f56565;
  box-shadow: 0 12px 28px rgba(245, 101, 101, 0.15);
}

.admin-dashboard-attendance-overview-rate:hover {
  border-color: #ed8936;
  box-shadow: 0 12px 28px rgba(237, 137, 54, 0.15);
}

.admin-dashboard-attendance-overview-label {
  display: block;
  color: #718096;
  font-size: 14px;
  margin-bottom: 12px;
}

.admin-dashboard-attendance-overview-value {
  display: block;
  font-size: 36px;
  font-weight: 800;
  color: #2d3748;
}

/* Attendance Table */
.admin-dashboard-attendance-table-container {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.admin-dashboard-attendance-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-dashboard-attendance-table thead {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.admin-dashboard-attendance-table th {
  padding: 20px 24px;
  color: white;
  font-weight: 600;
  text-align: left;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-dashboard-attendance-table-row {
  border-bottom: 2px solid #f8fafc;
  transition: all 0.2s;
}

.admin-dashboard-attendance-table-row:hover {
  background: #f8fafc;
}

.admin-dashboard-attendance-table td {
  padding: 20px 24px;
  color: #4a5568;
}

.admin-dashboard-attendance-date {
  font-weight: 600;
  color: #2d3748;
}

.admin-dashboard-attendance-session {
  color: #718096;
}

.admin-dashboard-attendance-status-badge {
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
}

.admin-dashboard-attendance-status-present {
  background: rgba(72, 187, 120, 0.1);
  color: #38a169;
}

.admin-dashboard-attendance-status-absent {
  background: rgba(245, 101, 101, 0.1);
  color: #e53e3e;
}

.admin-dashboard-attendance-remarks {
  color: #718096;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Loading State in Details */
.admin-dashboard-details-loading {
  text-align: center;
  padding: 80px 20px;
}

.admin-dashboard-details-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: admin-dashboard-spin 1s linear infinite;
  margin: 0 auto 24px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .admin-dashboard-controls-section {
    grid-template-columns: 1fr;
  }
  
  .admin-dashboard-filters-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-dashboard-container {
    padding: 16px;
  }
  
  .admin-dashboard-title {
    font-size: 28px;
  }
  
  .admin-dashboard-header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .admin-dashboard-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .admin-dashboard-student-grid {
    grid-template-columns: 1fr;
  }
  
  .admin-dashboard-details-panel {
    max-width: 100%;
  }
  
  .admin-dashboard-details-header-profile {
    flex-direction: column;
    text-align: center;
  }
  
  .admin-dashboard-details-header-meta {
    justify-content: center;
  }
  
  .admin-dashboard-overview-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .admin-dashboard-header-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .admin-dashboard-refresh-btn,
  .admin-dashboard-export-btn {
    width: 100%;
    justify-content: center;
  }
  
  .admin-dashboard-sort-buttons {
    flex-direction: column;
  }
}
        `}
      </style>
    </div>
  );
};

export default AdminStudentDashboard;