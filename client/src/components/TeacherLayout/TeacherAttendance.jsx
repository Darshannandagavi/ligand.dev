import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendar,
  FaCalendarWeek,
  FaSave,
  FaUserGraduate,
  FaBook,
  FaTimes,
  FaDownload,
  FaSearch,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TeacherAttendance = () => {
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [technologyOptions, setTechnologyOptions] = useState([]);

  const [collegeName, setCollegeName] = useState("");
  const [batch, setBatch] = useState("");
  const [programName, setProgramName] = useState("");
  const [technology, setTechnology] = useState("");

  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [periodRecords, setPeriodRecords] = useState([]);
  const [periodTitle, setPeriodTitle] = useState("");
  const [periodRecordsMap, setPeriodRecordsMap] = useState({});
  const [periodFrom, setPeriodFrom] = useState(null);
  const [periodTo, setPeriodTo] = useState(null);
  const [periodTotalDays, setPeriodTotalDays] = useState(0);
  const [periodType, setPeriodType] = useState(null);
  const [activeTab, setActiveTab] = useState("daily"); // "daily" or "period"
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchCollegeOptions = async () => {
      try {
        const res = await axios.get(
          "https://ligand-dev-7.onrender.com/api/options/collegeName"
        );
        setCollegeOptions(res.data || []);
      } catch (err) {
        console.error("Failed to load college options", err);
        setCollegeOptions([]);
      }
    };
    fetchCollegeOptions();
  }, []);

  useEffect(() => {
    const fetchBatches = async () => {
      if (!collegeName) {
        setBatchOptions([]);
        setBatch("");
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ligand-dev-7.onrender.com/api/attendance/options/batches",
          {
            params: { collegeName },
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }
        );
        setBatchOptions(res.data || []);
      } catch (err) {
        console.error("Failed to fetch batches", err);
        setBatchOptions([]);
      } finally {
        setBatch("");
        setProgramName("");
        setTechnology("");
        setProgramOptions([]);
        setTechnologyOptions([]);
        setStudents([]);
      }
    };
    fetchBatches();
  }, [collegeName]);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!collegeName || !batch) {
        setProgramOptions([]);
        setProgramName("");
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ligand-dev-7.onrender.com/api/attendance/options/programs",
          {
            params: { collegeName, batch },
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }
        );
        setProgramOptions(res.data || []);
      } catch (err) {
        console.error("Failed to fetch programs", err);
        setProgramOptions([]);
      } finally {
        setProgramName("");
        setTechnology("");
        setTechnologyOptions([]);
        setStudents([]);
      }
    };
    fetchPrograms();
  }, [collegeName, batch]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      if (!collegeName || !batch || !programName) {
        setTechnologyOptions([]);
        setTechnology("");
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ligand-dev-7.onrender.com/api/attendance/options/technologies",
          {
            params: { collegeName, batch, programName },
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }
        );
        setTechnologyOptions(res.data || []);
      } catch (err) {
        console.error("Failed to fetch technologies", err);
        setTechnologyOptions([]);
      } finally {
        setTechnology("");
        setStudents([]);
      }
    };
    fetchTechnologies();
  }, [collegeName, batch, programName]);

  const fetchStudents = async () => {
    if (!collegeName || !batch || !programName || !technology)
      return alert("Select college, batch, program and technology");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const teacher = JSON.parse(localStorage.getItem("teacherInfo"));
      const teacherId = teacher?._id;
      const res = await axios.get(
        "https://ligand-dev-7.onrender.com/api/attendance/students/forteacher",
        {
           params: { collegeName, batch, programName, technology, teacherId },
            headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(res.data || []);
      const studentsData = res.data || [];
      const init = {};
      studentsData.forEach((s) => (init[s._id] = "pending"));

      try {
        const attRes = await axios.get("https://ligand-dev-7.onrender.com/api/attendance", {
          params: { date, programName, technology, collegeName, batch },
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        const existing = attRes.data || [];
        existing.forEach((r) => {
          const sid = r.student?._id || r.student;
          if (sid) init[sid] = r.status;
        });
      } catch (err) {
        console.warn("Failed to fetch existing attendance", err);
      }

      setRecords(init);
      if (!(res.data || []).length)
        alert("No current students found for selected filters.");
    } catch (err) {
      console.error(err);
      setStudents([]);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceForPeriod = async (type = "weekly") => {
    if (!students || students.length === 0) return alert("Load students first");
    try {
      setLoading(true);
      const selected = new Date(date);
      let from, to;
      if (type === "weekly") {
        const day = selected.getDay();
        const diffToMonday = (day + 6) % 7;
        const monday = new Date(selected);
        monday.setDate(selected.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);
        from = monday;
        to = sunday;
      } else {
        const start = new Date(selected.getFullYear(), selected.getMonth(), 1);
        start.setHours(0, 0, 0, 0);
        const end = new Date(
          selected.getFullYear(),
          selected.getMonth() + 1,
          0
        );
        end.setHours(23, 59, 59, 999);
        from = start;
        to = end;
      }

      const token = localStorage.getItem("token");
      const res = await axios.get("https://ligand-dev-7.onrender.com/api/attendance", {
        params: { from: from.toISOString(), to: to.toISOString() },
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const records = res.data || [];
      const map = {};
      records.forEach((r) => {
        const sid =
          r.student && (r.student._id || r.student)
            ? r.student._id || r.student
            : r.student;
        if (!sid) return;
        if (!map[sid]) map[sid] = [];
        map[sid].push(r);
      });

      const fromStart = new Date(from);
      fromStart.setHours(0, 0, 0, 0);
      const toStart = new Date(to);
      toStart.setHours(0, 0, 0, 0);
      const tDays = Math.round((toStart - fromStart) / (24 * 3600 * 1000)) + 1;

      setPeriodRecordsMap(map);
      setPeriodFrom(from);
      setPeriodTo(to);
      setPeriodTotalDays(tDays);
      setPeriodType(type);
      setPeriodTitle(
        `${type === "weekly" ? "Weekly" : "Monthly"} attendance (${from
          .toISOString()
          .slice(0, 10)} - ${to.toISOString().slice(0, 10)})`
      );
      setActiveTab("period");
    } catch (err) {
      console.error(err);
      alert("Failed to load attendance for period");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    const today = new Date().toISOString().slice(0, 10);
    if (selected > today) return alert("Cannot select a future date");
    setDate(selected);
  };

  const toggleStatus = (studentId, status) =>
    setRecords((prev) => ({ ...prev, [studentId]: status }));

  const markAll = (status) => {
    const updatedRecords = { ...records };
    Object.keys(records).forEach((id) => {
      updatedRecords[id] = status;
    });
    setRecords(updatedRecords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (students.length === 0) return alert("No students to mark");
    const payload = {
      date,
      records: students.map((s) => ({
        studentId: s._id,
        status: records[s._id],
        programName: s.programName,
        technology: s.technology,
      })),
    };
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://ligand-dev-7.onrender.com/api/attendance",
        payload,
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );
      alert(`${res.data.insertedCount || 0} attendance records saved`);
    } catch (err) {
      console.error(err);
      alert("Failed to save attendance");
    }
  };
  const exportAttendancePDF = (type = "daily") => {
    if (
      (type === "daily" && students.length === 0) ||
      (type !== "daily" && !periodRecordsMap)
    ) {
      return alert("No attendance data to export");
    }

    const doc = new jsPDF();

    let title = "";
    let data = [];

    if (type === "daily") {
      title = `Daily Attendance - ${date}`;
      data = students.map((s) => [
        s.name,
        s.usn,
        s.programName,
        s.technology,
        records[s._id] || "pending",
      ]);
    } else {
      title = `${type.charAt(0).toUpperCase() + type.slice(1)} Attendance`;
      data = students.map((s) => {
        const sid = s._id;
        const recs = periodRecordsMap[sid] || [];
        const presentCount = recs.filter(
          (r) => String(r.status).toLowerCase() === "present"
        ).length;
        const perc =
          periodTotalDays > 0
            ? Math.round((presentCount / periodTotalDays) * 100)
            : 0;
        return [s.name, s.usn, s.programName, s.technology, `${perc}%`];
      });
    }

    doc.setFontSize(16);
    doc.text(title, 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [
        [
          "Name",
          "USN",
          "Program",
          "Technology",
          type === "daily" ? "Status" : "Attendance %",
        ],
      ],
      body: data,
    });

    doc.save(`${title.replace(/ /g, "_")}.pdf`);
  };

  const exportStudentPdf = async (student, type = "period") => {
    if (!student) return alert("No student selected");
    try {
      // For period type, use periodFrom/periodTo if available, otherwise compute
      let from = periodFrom,
        to = periodTo;
      if (!from || !to) {
        const selected = new Date(date);
        if (type === "weekly") {
          const day = selected.getDay();
          const diffToMonday = (day + 6) % 7;
          const monday = new Date(selected);
          monday.setDate(selected.getDate() - diffToMonday);
          monday.setHours(0, 0, 0, 0);
          const sunday = new Date(monday);
          sunday.setDate(monday.getDate() + 6);
          sunday.setHours(23, 59, 59, 999);
          from = monday;
          to = sunday;
        } else {
          const start = new Date(
            selected.getFullYear(),
            selected.getMonth(),
            1
          );
          start.setHours(0, 0, 0, 0);
          const end = new Date(
            selected.getFullYear(),
            selected.getMonth() + 1,
            0
          );
          end.setHours(23, 59, 59, 999);
          from = start;
          to = end;
        }
      }

      const token = localStorage.getItem("token");
      const res = await axios.get("https://ligand-dev-7.onrender.com/api/attendance", {
        params: {
          from: from.toISOString(),
          to: to.toISOString(),
          student: student._id,
        },
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const entries = res.data || [];

      const doc = new jsPDF();
      const title = `${student.name} - ${student.usn} - Attendance (${from
        .toISOString()
        .slice(0, 10)} - ${to.toISOString().slice(0, 10)})`;
      doc.setFontSize(14);
      doc.text(title, 14, 20);

      const body = entries.map((r, i) => [
        String(i + 1),
        new Date(r.date).toLocaleDateString(),
        r.status,
        r.markedBy?.email || r.markedBy || "N/A",
      ]);

      autoTable(doc, {
        startY: 28,
        head: [["#", "Date", "Status", "Marked By"]],
        body,
      });

      doc.save(`${student.name.replace(/\s+/g, "_")}_attendance.pdf`);
    } catch (err) {
      console.error("Failed exporting student PDF", err);
      alert("Failed to export student PDF");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.usn.toLowerCase().includes(searchTerm.toLowerCase());

    if (attendanceFilter === "all") return matchesSearch;
    return matchesSearch && records[student._id] === attendanceFilter;
  });

  const attendanceCounts = {
    present: Object.values(records).filter((status) => status === "present")
      .length,
    absent: Object.values(records).filter((status) => status === "absent")
      .length,
    pending: Object.values(records).filter((status) => status === "pending")
      .length,
  };

  return (
    <div className="admin-attendance-container">
      <div className="page-header">
        <h1 className="page-title">Attendance Management</h1>
        <div className="header-actions">
          <div className="date-selector">
            <label style={{ color: "grey" }}>Selected Date</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              max={new Date().toISOString().slice(0, 10)}
              style={{ border: "1px solid grey" }}
            />
          </div>
        </div>
      </div>

      <div className="content-grid">
        {/* Filter Section */}
        <div className="filter-section card">
          <div className="section-header">
            <h3 style={{ color: "grey" }}>Student Filters</h3>
            <span className="section-badge">{students.length} students</span>
          </div>

          <div className="filter-grid">
            <div className="filter-group">
              <label>College</label>
              <select
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              >
                <option value="">Select College</option>
                {collegeOptions.map((c) => (
                  <option key={c._id || c.value} value={c.value || c}>
                    {c.value || c}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Batch</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                disabled={!batchOptions.length}
              >
                <option value="">Select Batch</option>
                {batchOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Program</label>
              <select
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                disabled={!programOptions.length}
              >
                <option value="">Select Program</option>
                {programOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Technology</label>
              <select
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                disabled={!technologyOptions.length}
              >
                <option value="">Select Technology</option>
                {technologyOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="btn-primary load-btn"
              onClick={fetchStudents}
              disabled={!collegeName || !batch || !programName || !technology}
            >
              <FaUserGraduate />
              Load Students
            </button>
            {activeTab === "daily" && (
              <button
                className="btn-primary"
                onClick={() => exportAttendancePDF("daily")}
                disabled={!students.length}
              >
                <FaDownload/> Download Daily PDF
              </button>
            )}

            {activeTab === "period" && periodType === "weekly" && (
              <button
                className="btn-primary"
                onClick={() => exportAttendancePDF("weekly")}
                disabled={!students.length || !periodRecordsMap}
              >
                <FaDownload/> Download Weekly PDF
              </button>
            )}

            {activeTab === "period" && periodType === "monthly" && (
              <button
                className="btn-primary"
                onClick={() => exportAttendancePDF("monthly")}
                disabled={!students.length || !periodRecordsMap}
              >
                <FaDownload/> Download Monthly PDF
              </button>
            )}

            <div className="period-buttons">
              <button
                className="btn-secondary"
                onClick={() => fetchAttendanceForPeriod("weekly")}
                disabled={
                  !collegeName ||
                  !batch ||
                  !programName ||
                  !technology ||
                  !students.length
                }
              >
                <FaCalendarWeek /> Weekly View
              </button>
              <button
                className="btn-secondary"
                onClick={() => fetchAttendanceForPeriod("monthly")}
                disabled={
                  !collegeName ||
                  !batch ||
                  !programName ||
                  !technology ||
                  !students.length
                }
              >
                <FaCalendar /> Monthly View
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {students.length > 0 && (
          <div className="main-content">
            <div className="attendance-section card">
              <div className="section-header">
                <div className="tab-navigation">
                  <button
                    className={`tab-btn ${
                      activeTab === "daily" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("daily")}
                  >
                    Daily Attendance
                  </button>
                  <button
                    className={`tab-btn ${
                      activeTab === "period" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("period")}
                  >
                    Period View
                  </button>
                </div>

                <div className="attendance-controls">
                  <div className="search-control">
                    <span className="search-icon"><FaSearch/></span>
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <select
                    value={attendanceFilter}
                    onChange={(e) => setAttendanceFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Students</option>
                    <option value="present">Present Only</option>
                    <option value="absent">Absent Only</option>
                    <option value="pending">Pending Only</option>
                  </select>

                  <div className="batch-actions">
                    <button
                      className="btn-success"
                      onClick={() => markAll("present")}
                    >
                      Mark All Present
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => markAll("absent")}
                    >
                      Mark All Absent
                    </button>
                  </div>
                </div>
              </div>

              {/* Attendance Stats */}
              <div className="attendance-stats">
                <div className="stat-card present">
                  <div className="stat-value">{attendanceCounts.present}</div>
                  <div className="stat-label">Present</div>
                </div>
                <div className="stat-card absent">
                  <div className="stat-value">{attendanceCounts.absent}</div>
                  <div className="stat-label">Absent</div>
                </div>
                <div className="stat-card pending">
                  <div className="stat-value">{attendanceCounts.pending}</div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card total">
                  <div className="stat-value">{students.length}</div>
                  <div className="stat-label">Total</div>
                </div>
              </div>

              {/* Students List */}
              <form onSubmit={handleSubmit}>
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading students...</p>
                  </div>
                ) : (
                  <div className="students-list">
                    {filteredStudents.length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <h4>No students found</h4>
                        <p>Try adjusting your search or filters</p>
                      </div>
                    ) : (
                      filteredStudents.map((s) => {
                        const sid = s._id || s;
                        const recs =
                          periodRecordsMap && periodRecordsMap[sid]
                            ? periodRecordsMap[sid]
                            : [];
                        const presentCount = recs.filter(
                          (r) => String(r.status).toLowerCase() === "present"
                        ).length;
                        const perc =
                          periodTotalDays > 0
                            ? Math.round((presentCount / periodTotalDays) * 100)
                            : null;

                        return (
                          <div
                            key={s._id}
                            className={`student-card ${records[s._id]}`}
                          >
                            <div className="student-main">
                              <div className="student-avatar">
                                {s.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="student-info">
                                <h4 className="student-name">{s.name}</h4>
                                <p className="student-usn">{s.usn}</p>
                                <div className="student-meta">
                                  <span className="meta-item">
                                    {s.programName}
                                  </span>
                                  <span className="meta-item">
                                    {s.technology}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="student-attendance">
                              {activeTab === "period" && (
                                <div className="period-stats">
                                  <div className="attendance-percentage">
                                    <div className="percentage-value">
                                      {perc !== null ? `${perc}%` : "—"}
                                    </div>
                                    <div className="percentage-label">
                                      Attendance
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    className="view-details-btn"
                                    onClick={async () => {
                                      try {
                                        // set selected student for modal
                                        setSelectedStudent(s);
                                        if (
                                          periodFrom &&
                                          periodTo &&
                                          periodRecordsMap &&
                                          periodRecordsMap[s._id]
                                        ) {
                                          setPeriodRecords(
                                            periodRecordsMap[s._id]
                                          );
                                          // use periodTo (not undefined `to`) when building the title from cached period
                                          setPeriodTitle(
                                            `${
                                              periodType === "weekly"
                                                ? "Weekly"
                                                : "Monthly"
                                            } attendance for ${
                                              s.name
                                            } (${periodFrom
                                              .toISOString()
                                              .slice(0, 10)} - ${periodTo
                                              .toISOString()
                                              .slice(0, 10)})`
                                          );
                                          setShowPeriodModal(true);
                                          return;
                                        }
                                        const selected = new Date(date);
                                        let from, to;
                                        const useType = periodType || "weekly";
                                        if (useType === "weekly") {
                                          const day = selected.getDay();
                                          const diffToMonday = (day + 6) % 7;
                                          const monday = new Date(selected);
                                          monday.setDate(
                                            selected.getDate() - diffToMonday
                                          );
                                          monday.setHours(0, 0, 0, 0);
                                          const sunday = new Date(monday);
                                          sunday.setDate(monday.getDate() + 6);
                                          sunday.setHours(23, 59, 59, 999);
                                          from = monday;
                                          to = sunday;
                                        } else {
                                          const start = new Date(
                                            selected.getFullYear(),
                                            selected.getMonth(),
                                            1
                                          );
                                          start.setHours(0, 0, 0, 0);
                                          const end = new Date(
                                            selected.getFullYear(),
                                            selected.getMonth() + 1,
                                            0
                                          );
                                          end.setHours(23, 59, 59, 999);
                                          from = start;
                                          to = end;
                                        }
                                        const token =
                                          localStorage.getItem("token");
                                        const res = await axios.get(
                                          "https://ligand-dev-7.onrender.com/api/attendance",
                                          {
                                            params: {
                                              from: from.toISOString(),
                                              to: to.toISOString(),
                                              student: s._id,
                                            },
                                            headers: {
                                              Authorization: token
                                                ? `Bearer ${token}`
                                                : "",
                                            },
                                          }
                                        );
                                        setPeriodRecords(res.data || []);
                                        setPeriodTitle(
                                          `${
                                            useType === "weekly"
                                              ? "Weekly"
                                              : "Monthly"
                                          } attendance for ${s.name} (${from
                                            .toISOString()
                                            .slice(0, 10)} - ${to
                                            .toISOString()
                                            .slice(0, 10)})`
                                        );
                                        setShowPeriodModal(true);
                                      } catch (err) {
                                        console.error(
                                          "Error loading attendance for student",
                                          err
                                        );
                                        alert(
                                          "Failed to load attendance for student"
                                        );
                                      }
                                    }}
                                  >
                                    View Details
                                  </button>
                                </div>
                              )}

                              <div className="attendance-options">
                                <button
                                  type="button"
                                  className={`attendance-btn present ${
                                    records[s._id] === "present" ? "active" : ""
                                  }`}
                                  onClick={() => toggleStatus(s._id, "present")}
                                >
                                  ✓ Present
                                </button>
                                <button
                                  type="button"
                                  className={`attendance-btn absent ${
                                    records[s._id] === "absent" ? "active" : ""
                                  }`}
                                  onClick={() => toggleStatus(s._id, "absent")}
                                >
                                  ✗ Absent
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}

                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn-primary large save-btn"
                      >
                        <FaSave /> Save Attendance
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Period Modal */}
      {showPeriodModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{periodTitle}</h3>
              <button
                className="close-btn"
                onClick={() => setShowPeriodModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Marked By</th>
                  </tr>
                </thead>
                <tbody>
                  {periodRecords.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="no-records">
                        No attendance records found for this period
                      </td>
                    </tr>
                  ) : (
                    periodRecords.map((r, i) => (
                      <tr
                        key={i}
                        className={`status-${r.status.toLowerCase()}`}
                      >
                        <td>{new Date(r.date).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`status-badge ${r.status.toLowerCase()}`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td>{r.markedBy || r.markedBy?.email || "N/A"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                className="btn-primary"
                onClick={() =>
                  exportStudentPdf(selectedStudent, periodType || "period")
                }
              >
                <FaBook/> Download PDF
              </button>
              <button
                className="btn-primary closebtn"
                onClick={() => setShowPeriodModal(false)}
              >
               <FaTimes/> Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-attendance-container {
          padding: 24px;
          // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          margin-top:60px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          color: white;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: grey;
        }

        .header-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .date-selector {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .date-selector label {
          font-size: 12px;
          font-weight: 500;
          opacity: 0.9;
        }

        .date-selector input {
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.9);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 24px;
          align-items: start;
        }

        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .filter-section {
          padding: 24px;
          position: sticky;
          top: 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h3 {
          margin: 0;
          color: #2d3748;
          font-weight: 600;
        }

        .section-badge {
          background: #edf2f7;
          color: #4a5568;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .filter-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .filter-group label {
          font-weight: 500;
          color: #4a5568;
          font-size: 14px;
        }

        .filter-group select {
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .filter-group select:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: #f7fafc;
          color: #4a5568;
          border: 1px solid #e2e8f0;
          padding: 10px 12px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
        }

        .btn-secondary:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
        }

        .period-buttons {
          display: flex;
          gap: 8px;
        }

        .main-content {
          min-height: 600px;
        }

        .attendance-section {
          padding: 24px;
        }

        .tab-navigation {
          display: flex;
          gap: 8px;
          background: #f7fafc;
          padding: 4px;
          border-radius: 8px;
        }

        .tab-btn {
          padding: 8px 16px;
          border: none;
          background: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          color:white;
        }

        .attendance-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .search-control {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: #a0aec0;
        }

        .search-control input {
          padding: 8px 12px 8px 36px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          width: 200px;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
        }

        .batch-actions {
          display: flex;
          gap: 8px;
        }

        .btn-success {
          background: #48bb78;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-success:hover {
          background: #38a169;
        }

        .btn-danger {
          background: #f56565;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-danger:hover {
          background: #e53e3e;
        }

        .attendance-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin: 24px 0;
        }

        .stat-card {
          padding: 16px;
          border-radius: 8px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }

        .stat-card.present {
          border-color: #c6f6d5;
          background: #f0fff4;
        }

        .stat-card.absent {
          border-color: #fed7d7;
          background: #fff5f5;
        }

        .stat-card.pending {
          border-color: #feebcb;
          background: #fffaf0;
        }

        .stat-card.total {
          border-color: #e2e8f0;
          background: #f7fafc;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stat-card.present .stat-value {
          color: #38a169;
        }
        .stat-card.absent .stat-value {
          color: #e53e3e;
        }
        .stat-card.pending .stat-value {
          color: #dd6b20;
        }
        .stat-card.total .stat-value {
          color: #4a5568;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #718096;
        }

        .students-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 500px;
          overflow-y: auto;
        }

        .student-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .student-card:hover {
          border-color: #cbd5e0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .student-card.present {
          border-left: 4px solid #48bb78;
        }

        .student-card.absent {
          border-left: 4px solid #f56565;
        }

        .student-card.pending {
          border-left: 4px solid #ed8936;
        }

        .student-main {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .student-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #667eea;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .student-info h4 {
          margin: 0 0 4px 0;
          font-weight: 600;
          color: #2d3748;
        }

        .student-usn {
          margin: 0;
          color: #718096;
          font-size: 14px;
        }

        .student-meta {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }

        .meta-item {
          background: #f7fafc;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          color: #4a5568;
        }

        .student-attendance {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .period-stats {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .attendance-percentage {
          text-align: center;
        }

        .percentage-value {
          font-size: 18px;
          font-weight: 700;
          color: #2d3748;
        }

        .percentage-label {
          font-size: 12px;
          color: #718096;
        }

        .view-details-btn {
          background: none;
          border: 1px solid #e2e8f0;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-details-btn:hover {
          background: #f7fafc;
        }

        .attendance-options {
          display: flex;
          gap: 8px;
        }

        .attendance-btn {
          padding: 8px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .attendance-btn.present.active {
          background: #c6f6d5;
          border-color: #48bb78;
          color: #22543d;
        }

        .attendance-btn.absent.active {
          background: #fed7d7;
          border-color: #f56565;
          color: #742a2a;
        }

        .submit-section {
          margin-top: 24px;
          text-align: center;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }

        .save-btn {
          margin: 0 auto;
        }

        .loading-state {
          text-align: center;
          padding: 40px;
          color: #718096;
        }

        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #718096;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .empty-state h4 {
          margin: 0 0 8px 0;
          color: #4a5568;
        }

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
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90vw;
          max-width: 800px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h3 {
          margin: 0;
          color: #2d3748;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #718096;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-body {
          flex: 1;
          overflow: auto;
          padding: 0;
        }

        .records-table {
          width: 100%;
          border-collapse: collapse;
        }

        .records-table th {
          background: #f7fafc;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #4a5568;
          border-bottom: 1px solid #e2e8f0;
        }

        .records-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .no-records {
          text-align: center;
          color: #718096;
          font-style: italic;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-badge.present {
          background: #c6f6d5;
          color: #22543d;
        }

        .status-badge.absent {
          background: #fed7d7;
          color: #742a2a;
        }

        .modal-footer {
          display: flex;
          justify-content: space-between;
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
          text-align: right;
        }
        .closebtn {
          background: rgb(200, 200, 200);
        }
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .filter-section {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .admin-attendance-container {
            padding: 16px;
          }

          .page-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .attendance-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-control input {
            width: 100%;
          }

          .student-card {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .student-attendance {
            justify-content: space-between;
          }

          .attendance-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default TeacherAttendance;
