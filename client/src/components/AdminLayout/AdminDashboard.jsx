import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import Loader from "../StyleComponents/Loader";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("current");
  const [batchToPassout, setBatchToPassout] = useState("");
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [collegeToPassout, setCollegeToPassout] = useState("");
  const [yearToPassout, setYearToPassout] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [technologyFilter, setTechnologyFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("https://ligand-dev-7.onrender.com/api/users", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      setStudents(res.data || []);
    } catch (err) {
      console.error("Failed to fetch students", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    // fetch options used in Register page
    const fetchOptions = async () => {
      try {
        const types = ["batch", "collegeName"];
        const responses = await Promise.all(
          types.map((type) =>
            axios.get(`https://ligand-dev-7.onrender.com/api/options/${type}`)
          )
        );
        setBatchOptions(responses[0].data || []);
        setCollegeOptions(responses[1].data || []);
      } catch (err) {
        console.error("Error fetching options", err);
      }
    };
    fetchOptions();
  }, []);

  const currentStudents = students.filter((s) => !s.isPassout);
  const pastStudents = students.filter((s) => s.isPassout);

  // Get unique values for filter dropdowns
  const collegeNames = useMemo(() => 
    [...new Set(students.map(s => s.collegeName).filter(Boolean))].sort(), 
    [students]
  );
  
  const technologies = useMemo(() => 
    [...new Set(students.map(s => s.technology).filter(Boolean))].sort(), 
    [students]
  );
  
  const batches = useMemo(() => 
    [...new Set(students.map(s => s.batch).filter(Boolean))].sort(), 
    [students]
  );

  // Filter students based on selected filters
  const filteredStudents = useMemo(() => {
    const targetStudents = selectedGroup === "current" ? currentStudents : pastStudents;
    
    return targetStudents.filter(student => {
      return (
        (!nameFilter || student.name?.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (!emailFilter || student.email?.toLowerCase().includes(emailFilter.toLowerCase())) &&
        (!collegeFilter || student.collegeName === collegeFilter) &&
        (!technologyFilter || student.technology === technologyFilter) &&
        (!batchFilter || student.batch === batchFilter)
      );
    });
  }, [selectedGroup, currentStudents, pastStudents, nameFilter, emailFilter, collegeFilter, technologyFilter, batchFilter]);

  const handleMakeBatchPassout = async (e) => {
    e.preventDefault();
    if (!collegeToPassout) return alert("Select college");
    if (!yearToPassout) return alert("Select academic year");
    try {
      const token = localStorage.getItem("token");
      const payload = {
        collegeName: collegeToPassout,
        year: Number(yearToPassout),
      };
      if (batchToPassout) payload.batch = batchToPassout;

      const res = await axios.post(
        "https://ligand-dev-7.onrender.com/api/users/make-passout",
        payload,
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );

      const n = res.data?.modifiedCount ?? 0;
      setBatchToPassout("");
      setCollegeToPassout("");
      setYearToPassout("");
      fetchStudents();
      alert(`${n} students passout successfully`);
    } catch (err) {
      console.error(err);
      alert("Failed to update passout status");
    }
  };

  const renderStudentCard = (student) => (
    <div key={student._id} className="student-card">
      <img
        src={
          student.profilePic
            ? `https://ligand-dev-7.onrender.com/uploads/${student.profilePic}`
            : "/default_user.jpeg"
        }
        alt="Profile"
        className="student-avatar"
      />
      <div className="student-info">
        <div className="student-name">
          {student.name} ({student.usn})
        </div>
        <div className="student-email">{student.email}</div>
        <div className="student-program">
          {student.programName} - {student.technology}
        </div>
        <div className="student-details">
          {student.batch} • {student.collegeName}
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2 className="adminheader">Admin Dashboard - Students</h2>

        <div className="group-selector">
          <div 
            className={`group-card ${selectedGroup === "current" ? "active" : ""}`}
            onClick={() => setSelectedGroup("current")}
          >
            <div className="group-card-inner">
              <div className="group-title">Current Students</div>
              <div className="group-count">{currentStudents.length}</div>
            </div>
          </div>
          <div 
            className={`group-card ${selectedGroup === "past" ? "active" : ""}`}
            onClick={() => setSelectedGroup("past")}
          >
            <div className="group-card-inner">
              <div className="group-title">Passout Students</div>
              <div className="group-count">{pastStudents.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="passout-form-section">
        <h3>Mark Students as Passout</h3>
        <form onSubmit={handleMakeBatchPassout} className="passout-form">
          <div className="form-group">
            <label>College</label>
            <select
              value={collegeToPassout}
              onChange={(e) => setCollegeToPassout(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select College</option>
              {collegeOptions.map((opt) => (
                <option key={opt._id || opt.value} value={opt.value}>
                  {opt.value}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Academic Year</label>
            <select
              value={yearToPassout}
              onChange={(e) => setYearToPassout(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Year</option>
              {Array.from(new Set(students.map((s) => s.year)))
                .sort((a, b) => a - b)
                .map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Batch (Optional)</label>
            <select
              value={batchToPassout}
              onChange={(e) => setBatchToPassout(e.target.value)}
              className="form-select"
            >
              <option value="">Select Batch</option>
              {batchOptions.map((opt) => (
                <option key={opt._id || opt.value} value={opt.value}>
                  {opt.value}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="form-button">
            Make Passout
          </button>
        </form>
        <p className="form-note">
          Select college and academic year (optionally batch) — this will mark
          matching students as passout and make them eligible for notes.
        </p>
      </div>

      <div className="filter-section">
        <h3>Filter Students</h3>
        <div className="filter-grid">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Search by name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="filter-input"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Search by email"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              className="filter-input"
            />
          </div>
          
          <div className="form-group">
            <label>College</label>
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="filter-input"
            >
              <option value="">All Colleges</option>
              {collegeNames.map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Technology</label>
            <select
              value={technologyFilter}
              onChange={(e) => setTechnologyFilter(e.target.value)}
              className="filter-input"
            >
              <option value="">All Technologies</option>
              {technologies.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Batch</label>
            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="filter-input"
            >
              <option value="">All Batches</option>
              {batches.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>&nbsp;</label>
            <button 
              className="form-button"
              onClick={() => {
                setNameFilter("");
                setEmailFilter("");
                setCollegeFilter("");
                setTechnologyFilter("");
                setBatchFilter("");
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="student-section">
        <h3>
          {selectedGroup === "current" ? "Current Students" : "Passout Students"}
          {filteredStudents.length > 0 && ` (${filteredStudents.length})`}
        </h3>
        {loading ? (
          <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>
        ) : (
          <div className="student-grid">
            {filteredStudents.map(renderStudentCard)}
            {filteredStudents.length === 0 && (
              <div className="empty-state">
                No students found matching your filters
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;