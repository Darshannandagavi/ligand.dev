import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBook,
  FaUserGraduate,
  FaSearch,
  FaFilter,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaSave,
  FaDownload,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TeacherHomework = () => {
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [technologyOptions, setTechnologyOptions] = useState([]);

  const [collegeName, setCollegeName] = useState("");
  const [batch, setBatch] = useState("");
  const [programName, setProgramName] = useState("");
  const [technology, setTechnology] = useState("");

  const [homeworks, setHomeworks] = useState([]);
  const [selectedHomework, setSelectedHomework] = useState("");
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState(0);
  const [saving, setSaving] = useState(false);

  const API_ASSIGNMENTS = "https://ligand-software-solutions-workshop-2.onrender.com/api/assignments";
  const API_STUDENTS =
    "https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/students/forteacher";

  // Count active filters
  useEffect(() => {
    const count = [collegeName, batch, programName, technology].filter(
      Boolean
    ).length;
    setActiveFilters(count);
  }, [collegeName, batch, programName, technology]);

  // 📚 Load Colleges
  useEffect(() => {
    axios
      .get("https://ligand-software-solutions-workshop-2.onrender.com/api/options/collegeName")
      .then((res) => setCollegeOptions(res.data || []))
      .catch(() => toast.error("Failed to load colleges"));
  }, []);

  // 🎓 Load Batches
  useEffect(() => {
    if (!collegeName) {
      setBatchOptions([]);
      setBatch("");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .get("https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/batches", {
        params: { collegeName },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBatchOptions(res.data || []))
      .catch(() => toast.error("Failed to load batches"));
  }, [collegeName]);

  // 📘 Load Programs
  useEffect(() => {
    if (!collegeName || !batch) {
      setProgramOptions([]);
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .get("https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/programs", {
        params: { collegeName, batch },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProgramOptions(res.data || []))
      .catch(() => toast.error("Failed to load programs"));
  }, [collegeName, batch]);

  // 💻 Load Technologies
  useEffect(() => {
    if (!collegeName || !batch || !programName) {
      setTechnologyOptions([]);
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .get("https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/technologies", {
        params: { collegeName, batch, programName },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTechnologyOptions(res.data || []))
      .catch(() => toast.error("Failed to load technologies"));
  }, [collegeName, batch, programName]);

  // 📝 Load All Homeworks
  useEffect(() => {
    axios
      .get(`${API_ASSIGNMENTS}/gethomework`)
      .then((res) => setHomeworks(res.data || []))
      .catch(() => toast.error("Failed to fetch homework list"));
  }, []);

  // 👨‍🏫 Fetch Students
  const fetchStudents = async () => {
    if (!collegeName || !batch || !programName || !technology)
      return toast.warning("Select all filters first");

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const teacher = JSON.parse(localStorage.getItem("teacherInfo"));
      const teacherId = teacher?._id;

      const res = await axios.get(API_STUDENTS, {
        params: { collegeName, batch, programName, technology, teacherId },
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents(res.data || []);
      setRecords({});
      toast.success(`Loaded ${res.data.length} students successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Whenever Homework Changes → Load Status
  useEffect(() => {
    if (!selectedHomework || students.length === 0) return;

    const updatedRecords = {};
    students.forEach((student) => {
      const hwStatus = student.homeworkStatus?.find((h) => {
        const id =
          typeof h.homeworkId === "object"
            ? h.homeworkId._id?.toString()
            : h.homeworkId?.toString();
        return id === selectedHomework.toString();
      });
      updatedRecords[student._id] = hwStatus ? hwStatus.status : "pending";
    });

    setRecords(updatedRecords);
  }, [selectedHomework, students]);

  // ✅ Toggle Status
  const toggleStatus = (studentId, status) => {
    setRecords((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? "pending" : status,
    }));
  };

  // ✅ Mark All
  const markAll = (status) => {
    const updated = {};
    Object.keys(records).forEach((id) => (updated[id] = status));
    setRecords(updated);
    toast.info(`All students marked as ${status.replace("_", " ")}`);
  };

  // 💾 Save Homework Status
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHomework) return toast.warning("Select a homework first");
    if (!students.length) return toast.warning("No students to mark");

    setSaving(true);
    const teacher = JSON.parse(localStorage.getItem("teacherInfo"));
    const payload = {
      homeworkId: selectedHomework,
      records: students.map((s) => ({
        studentId: s._id,
        status: records[s._id],
      })),
      markedBy: teacher?._id,
    };

    try {
      await axios.post("https://ligand-software-solutions-workshop-2.onrender.com/api/homeworkstatus", payload);
      toast.success("Homework status updated successfully!");
      fetchStudents(); // Reload latest data
    } catch (err) {
      console.error(err);
      toast.error("Failed to update homework status");
    } finally {
      setSaving(false);
    }
  };

  // 📤 Export to PDF
  const exportPDF = () => {
    const hw = homeworks.find((h) => h._id === selectedHomework);
    if (!hw) return toast.warning("Select a homework first");

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Homework Report - ${hw.chapterName}`, 14, 20);
    const data = students.map((s) => {
      const hwStatus = s.homeworkStatus?.find(
        (h) =>
          (h.homeworkId?._id || h.homeworkId)?.toString() ===
          selectedHomework.toString()
      );
      return [
        s.name,
        s.usn,
        hwStatus?.status || "pending",
        hwStatus?.markedBy
          ? `${hwStatus.markedBy.firstname} ${hwStatus.markedBy.lastname}`
          : "—",
        hwStatus?.markedAt ? new Date(hwStatus.markedAt).toLocaleString() : "—",
      ];
    });
    autoTable(doc, {
      startY: 30,
      head: [["Name", "USN", "Status", "Marked By", "Marked On"]],
      body: data,
    });
    doc.save(`${hw.chapterName.replace(/\s+/g, "_")}_Homework_Report.pdf`);
    toast.success("PDF exported successfully!");
  };

  const clearFilters = () => {
    setCollegeName("");
    setBatch("");
    setProgramName("");
    setTechnology("");
    setStudents([]);
    setSearchTerm("");
    setSelectedHomework("");
    setRecords({});
    toast.info("Filters cleared");
  };

  // 🔍 Search Filter
  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.usn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📊 Get Statistics
  const getStats = () => {
    const total = students.length;
    const done = Object.values(records).filter(
      (status) => status === "done"
    ).length;
    const notDone = Object.values(records).filter(
      (status) => status === "not_done"
    ).length;
    const pending = total - done - notDone;

    return { total, done, notDone, pending };
  };

  const stats = getStats();

  // Determine selected homework object and previous homework (for validation)
  const selectedHwObj = homeworks.find((h) => h._id === selectedHomework);
  const prevHomeworkObj = selectedHwObj
    ? homeworks.find((h) => h.chapterNumber === (selectedHwObj.chapterNumber - 1))
    : null;

  return (
    <div className="teacher-student-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="content-grid">
        {/* Filter Section */}
        <div className="filter-section card">
          <div className="section-header">
            <div className="section-title">
              <FaFilter className="section-icon" />
              <h3>Filters</h3>
            </div>
            <div className="filter-badge">{activeFilters}/4 Selected</div>
          </div>

          <div className="filter-grid">
            <div className="form-group">
              <label>College</label>
              <select
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="form-select"
              >
                <option value="">Select College</option>
                {collegeOptions.map((c) => (
                  <option key={c.value || c} value={c.value || c}>
                    {c.value || c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Batch</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="form-select"
                disabled={!collegeName}
              >
                <option value="">Select Batch</option>
                {batchOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Program</label>
              <select
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="form-select"
                disabled={!collegeName || !batch}
              >
                <option value="">Select Program</option>
                {programOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Technology</label>
              <select
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                className="form-select"
                disabled={!collegeName || !batch || !programName}
              >
                <option value="">Select Technology</option>
                {technologyOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Homework Selection */}
            <div className="form-group">
              <label>Select Homework</label>
              <select
                value={selectedHomework}
                onChange={(e) => setSelectedHomework(e.target.value)}
                className="form-select"
                disabled={students.length === 0}
              >
                <option value="">Select Homework</option>
                {homeworks.map((hw) => (
                  <option key={hw._id} value={hw._id}>
                    Chapter {hw.chapterNumber}: {hw.chapterName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="btn-primary"
              onClick={fetchStudents}
              disabled={!collegeName || !batch || !programName || !technology}
            >
              <FaUserGraduate /> Load Students
            </button>
            <button className="btn-secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>

          {/* Homework Statistics */}
          {selectedHomework && students.length > 0 && (
            <div className="homework-stats">
              <h4>Homework Progress</h4>
              <div className="stats-grid">
                <div className="stat-item done">
                  <span className="stat-count">{stats.done}</span>
                  <span className="stat-label">Done</span>
                </div>
                <div className="stat-item not-done">
                  <span className="stat-count">{stats.notDone}</span>
                  <span className="stat-label">Not Done</span>
                </div>
                <div className="stat-item pending">
                  <span className="stat-count">{stats.pending}</span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Student List */}
        <div className="student-list-section card">
          <div className="page-header">
            <div className="header-content">
              <div className="header-title">
                <FaBook className="header-icon" />
                <h1>Homework Management</h1>
              </div>
              <div className="header-stats">
                <div className="stat-card">
                  <span className="stat-number">{students.length}</span>
                  <span className="stat-label" style={{ color: "#fff" }}>
                    Total Students
                  </span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{homeworks.length}</span>
                  <span className="stat-label" style={{ color: "#fff" }}>
                    Homeworks
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="section-header">
            <div className="section-title">
              <h3>Students Homework Status</h3>
              {students.length > 0 && (
                <span className="student-count">
                  ({filteredStudents.length} of {students.length})
                </span>
              )}
            </div>

            <div className="search-control">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or USN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                disabled={students.length === 0}
              />
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading students...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="empty-state">
              <FaUsers className="empty-icon" />
              <h4>No Students Loaded</h4>
              <p>Select filters and click "Load Students" to view students</p>
            </div>
          ) : !selectedHomework ? (
            <div className="empty-state">
              <FaBook className="empty-icon" />
              <h4>Select Homework</h4>
              <p>Please select a homework from the filters to start marking</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="empty-state">
              <FaSearch className="empty-icon" />
              <h4>No Students Found</h4>
              <p>No students match your search criteria</p>
            </div>
          ) : (
            <div className="homework-management">
              {/* Action Buttons */}
              <div className="homework-actions">
                <div className="action-group">
                  <button
                    onClick={() => markAll("done")}
                    className="btn-success"
                  >
                    <FaCheckCircle /> Mark All Done
                  </button>
                  <button
                    onClick={() => markAll("not_done")}
                    className="btn-danger"
                  >
                    <FaTimesCircle /> Mark All Not Done
                  </button>
                </div>
                <div className="action-group">
                  <button onClick={exportPDF} className="btn-warning">
                    <FaDownload /> Export PDF
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="btn-primary"
                  >
                    <FaSave /> {saving ? "Saving..." : "Save Status"}
                  </button>
                </div>
              </div>

              {/* Students List with Homework Status */}
              <div className="students-grid">
                {filteredStudents.map((s) => {
                  const hwStatus = s.homeworkStatus?.find(
                    (h) =>
                      (h.homeworkId?._id || h.homeworkId)?.toString() ===
                      selectedHomework.toString()
                  );

                  // Check previous homework completion
                  const prevStatus = prevHomeworkObj
                    ? s.homeworkStatus?.find(
                        (h) =>
                          (h.homeworkId?._id || h.homeworkId)?.toString() ===
                          prevHomeworkObj._id.toString()
                      )
                    : null;
                  const prevCompleted = prevHomeworkObj ? prevStatus?.status === "done" : true;

                  return (
                    <div key={s._id} className="student-card homework-card">
                      <div className="student-avatar">
                        <img
                          src={
                            s.profilePic
                              ? `https://ligand-software-solutions-workshop-2.onrender.com/uploads/${s.profilePic}`
                              : "/default_user.jpeg"
                          }
                          alt={s.name}
                          onError={(e) => {
                            e.target.src = "/default_user.jpeg";
                          }}
                        />
                      </div>
                      <div className="student-info">
                        <h4 className="student-name">{s.name}</h4>
                        <p className="student-usn">{s.usn}</p>
                        <div className="student-details">
                          <span className="program">{s.programName}</span>
                          <span className="technology">{s.technology}</span>
                        </div>

                        {/* Homework Status */}
                        <div className="homework-status">
                          <div className={`status-indicator ${records[s._id]}`}>
                            {records[s._id] === "done" && "✅ Done"}
                            {records[s._id] === "not_done" && "❌ Not Done"}
                            {records[s._id] === "pending" && "⏳ Pending"}
                          </div>

                          {hwStatus?.markedBy && (
                            <div className="marked-info">
                              <small>
                                Marked by: {hwStatus.markedBy.firstname}{" "}
                                {hwStatus.markedBy.lastname}
                              </small>
                              <small>
                                On:{" "}
                                {new Date(hwStatus.markedAt).toLocaleString()}
                              </small>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons or previous-homework warning */}
                        {!prevCompleted ? (
                          <div className="prev-homework-warning">
                            <strong>Cannot mark:</strong>
                            <div className="warning-text">
                              Student has not submitted the previous homework
                            </div>
                          </div>
                        ) : (
                          <div className="homework-action-buttons">
                            <button
                              className={`status-btn ${
                                records[s._id] === "done" ? "active" : ""
                              }`}
                              onClick={() => toggleStatus(s._id, "done")}
                            >
                              Done
                            </button>
                            <button
                              className={`status-btn ${
                                records[s._id] === "not_done" ? "active" : ""
                              }`}
                              onClick={() => toggleStatus(s._id, "not_done")}
                            >
                              Not Done
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
        .prev-homework-warning {
          padding: 10px;
          border-radius: 8px;
          background: #fff5f5;
          border: 1px solid #f5c6cb;
          text-align: center;
        }
        .prev-homework-warning .warning-text {
          font-size: 0.9rem;
          color: #c53030;
          margin-top: 6px;
        }
        /* TeacherStudent.css - Enhanced for Homework */

.teacher-student-container {
  padding-top:80px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
}

/* Header Styles */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-icon {
  font-size: 2.5rem;
  opacity: 0.9;
}

.header-title h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.header-stats {
  display: flex;
  gap: 20px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 25px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  min-width: 120px;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 30px;
  align-items: start;
}

/* Card Styles */
.card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e8ed;
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-icon {
  color: #667eea;
  font-size: 1.2rem;
}

.section-title h3 {
  margin: 0;
  color: #2d3748;
  font-weight: 600;
}

/* Filter Section */
.filter-badge {
  background: #e2e8f0;
  color: #4a5568;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.filter-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
}

.form-select {
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
}

.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-select:disabled {
  background-color: #f7fafc;
  color: #a0aec0;
  cursor: not-allowed;
}

/* Homework Stats */
.homework-stats {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
}

.homework-stats h4 {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-item {
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  color: white;
  font-weight: 600;
}

.stat-item.done {
  background: linear-gradient(135deg, #48bb78, #38a169);
}

.stat-item.not-done {
  background: linear-gradient(135deg, #f56565, #e53e3e);
}

.stat-item.pending {
  background: linear-gradient(135deg, #ed8936, #dd6b20);
}

.stat-count {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary, .btn-success, .btn-danger, .btn-warning {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
  min-width: 140px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-1px);
}

.btn-success {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
}

.btn-danger {
  background: linear-gradient(135deg, #f56565, #e53e3e);
  color: white;
}

.btn-warning {
  background: linear-gradient(135deg, #ed8936, #dd6b20);
  color: white;
}

.btn-success:hover, .btn-danger:hover, .btn-warning:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Search Control */
.search-control {
  position: relative;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input:disabled {
  background-color: #f7fafc;
  color: #a0aec0;
  cursor: not-allowed;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

/* Student List Section */
.student-list-section {
  min-height: 500px;
}

.student-count {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Homework Management */
.homework-management {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.homework-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 10px;
}

.action-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* Students Grid */
.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.student-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.student-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.homework-card {
  flex-direction: column;
  align-items: stretch;
  gap: 15px;
}

.student-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #e2e8f0;
  align-self: center;
}

.student-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.student-info {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.student-name {
  margin: 0 0 5px 0;
  color: #2d3748;
  font-weight: 600;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.student-usn {
  margin: 0 0 8px 0;
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
}

.student-details {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.program, .technology {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Homework Status */
.homework-status {
  margin: 12px 0;
  padding: 10px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.status-indicator {
  font-weight: 600;
  margin-bottom: 8px;
}

.status-indicator.done {
  color: #38a169;
}

.status-indicator.not_done {
  color: #e53e3e;
}

.status-indicator.pending {
  color: #dd6b20;
}

.marked-info {
  font-size: 0.8rem;
  color: #718096;
}

.marked-info small {
  display: block;
  margin-bottom: 2px;
}

/* Homework Action Buttons */
.homework-action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.status-btn {
  padding: 8px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  font-weight: 600;
  flex: 1;
  max-width: 100px;
}

.status-btn.active {
  color: white;
}

.status-btn:first-child.active {
  background: #48bb78;
  border-color: #48bb78;
}

.status-btn:last-child.active {
  background: #f56565;
  border-color: #f56565;
}

.status-btn:hover {
  transform: translateY(-1px);
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #718096;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-left: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #a0aec0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.5;
}

.empty-state h4 {
  margin: 0 0 10px 0;
  color: #718096;
  font-weight: 600;
}

.empty-state p {
  margin: 0;
  font-size: 0.95rem;
  max-width: 300px;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .filter-section {
    order: 1;
  }
  
  .student-list-section {
    order: 2;
  }
}

@media (max-width: 768px) {
  .teacher-student-container {
    padding: 15px;
  }
  
  .page-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header-stats {
    justify-content: center;
  }
  
  .stat-card {
    min-width: 100px;
    padding: 12px 20px;
  }
  
  .students-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-control {
    min-width: auto;
  }
  
  .action-buttons, .homework-actions {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary, .btn-success, .btn-danger, .btn-warning {
    flex: none;
  }
  
  .action-group {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header-title {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .header-title h1 {
    font-size: 1.5rem;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 10px;
  }
  
  .student-card {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
  
  .student-details, .student-meta {
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* Custom scrollbar for student grid */
.students-grid::-webkit-scrollbar {
  width: 6px;
}

.students-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.students-grid::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.students-grid::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
        `}
      </style>
    </div>
  );
};

export default TeacherHomework;
