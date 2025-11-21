// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminApproveStudents() {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState("");

//   const token = localStorage.getItem("token");

//   // Fetch all students
//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/users", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const studentList = res.data.filter((u) => u.role === "student");

//       setStudents(studentList);
//       setFilteredStudents(studentList);

//     } catch (err) {
//       console.log(err);
//       alert("Failed to fetch students");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // Real-time filter by date
//   const filterByDate = (date) => {
//     if (!date) {
//       setFilteredStudents(students);
//       return;
//     }

//     const filtered = students.filter((s) => {
//       const created = new Date(s.createdAt).toISOString().split("T")[0];
//       return created === date;
//     });

//     setFilteredStudents(filtered);
//   };

//   // Toggle approval
//   const handleApproval = async (id, value) => {
//     try {
//       await axios.put(
//         `http://localhost:8000/api/users/approve/${id}`,
//         { isApproved: value },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Update UI for both states
//       setStudents(prev =>
//         prev.map(s => (s._id === id ? { ...s, isApproved: value } : s))
//       );

//       setFilteredStudents(prev =>
//         prev.map(s => (s._id === id ? { ...s, isApproved: value } : s))
//       );

//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.error || "Failed to update approval");
//     }
//   };

//   // Approve all users of selected date
//   const approveByDate = async () => {
//     if (!selectedDate) return alert("Please select a date.");

//     try {
//       const res = await axios.put(
//         "http://localhost:8000/api/users/approve-by-date",
//         { date: selectedDate },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(res.data.message);

//       // Update UI for main list
//       setStudents(prev =>
//         prev.map((s) => {
//           const created = new Date(s.createdAt).toISOString().split("T")[0];
//           return created === selectedDate ? { ...s, isApproved: true } : s;
//         })
//       );

//       // Update UI for filtered list
//       setFilteredStudents(prev =>
//         prev.map((s) => ({ ...s, isApproved: true }))
//       );

//     } catch (err) {
//       console.error(err);
//       alert("Failed to approve students");
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Student Approvals</h2>

//       {/* Date Filter */}
//       <div style={{ margin: "20px 0" }}>
//         <label>Select Date: </label>
//         <input
//           type="date"
//           onChange={(e) => {
//             const val = e.target.value;
//             setSelectedDate(val);
//             filterByDate(val);
//           }}
//           style={{ padding: "5px", marginRight: "20px" }}
//         />

//         <button
//           onClick={approveByDate}
//           style={{
//             padding: "8px 15px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer"
//           }}
//         >
//           Approve All by Date
//         </button>
//       </div>

//       {/* Table */}
//       <table
//         style={{
//           width: "100%",
//           marginTop: "20px",
//           borderCollapse: "collapse",
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={th}>Name</th>
//             <th style={th}>USN</th>
//             <th style={th}>Email</th>
//             <th style={th}>Created At</th>
//             <th style={th}>Approved</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredStudents.length === 0 ? (
//             <tr>
//               <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
//                 No students found for this date
//               </td>
//             </tr>
//           ) : (
//             filteredStudents.map((student) => (
//               <tr key={student._id}>
//                 <td style={td}>{student.name}</td>
//                 <td style={td}>{student.usn}</td>
//                 <td style={td}>{student.email}</td>
//                 <td style={td}>{new Date(student.createdAt).toLocaleDateString()}</td>

//                 <td style={td}>
//                   <label className="switch">
//                     <input
//                       type="checkbox"
//                       checked={student.isApproved}
//                       onChange={(e) =>
//                         handleApproval(student._id, e.target.checked)
//                       }
//                     />
//                     <span className="slider round"></span>
//                   </label>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Toggle switch CSS */}
//       <style>{`
//         .switch {
//           position: relative;
//           display: inline-block;
//           width: 50px;
//           height: 25px;
//         }

//         .switch input {
//           opacity: 0;
//           width: 0;
//           height: 0;
//         }

//         .slider {
//           position: absolute;
//           cursor: pointer;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: #ccc;
//           transition: 0.4s;
//           border-radius: 25px;
//         }

//         .slider:before {
//           position: absolute;
//           content: "";
//           height: 18px;
//           width: 18px;
//           left: 4px;
//           bottom: 4px;
//           background-color: white;
//           transition: 0.4s;
//           border-radius: 50%;
//         }

//         input:checked + .slider {
//           background-color: #4CAF50;
//         }

//         input:checked + .slider:before {
//           transform: translateX(24px);
//         }
//       `}</style>
//     </div>
//   );
// }

// // Table cell styles
// const th = {
//   borderBottom: "2px solid #ddd",
//   padding: "10px",
//   textAlign: "left",
// };

// const td = {
//   borderBottom: "1px solid #eee",
//   padding: "10px",
// };


import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminApproveStudents() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("https://ligand-dev-7.onrender.com/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const studentList = res.data.filter((u) => u.role === "student");
      setStudents(studentList);
      setFilteredStudents(studentList);

    } catch (err) {
      console.log(err);
      alert("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = students;

    // Date filter
    if (selectedDate) {
      filtered = filtered.filter((s) => {
        const created = new Date(s.createdAt).toISOString().split("T")[0];
        return created === selectedDate;
      });
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((s) =>
        s.name?.toLowerCase().includes(term) ||
        s.usn?.toLowerCase().includes(term) ||
        s.email?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter === "approved") {
      filtered = filtered.filter((s) => s.isApproved);
    } else if (statusFilter === "pending") {
      filtered = filtered.filter((s) => !s.isApproved);
    }

    setFilteredStudents(filtered);
  }, [students, selectedDate, searchTerm, statusFilter]);

  // Toggle approval
  const handleApproval = async (id, value) => {
    setActionLoading(id);
    try {
      await axios.put(
        `https://ligand-dev-7.onrender.com/api/users/approve/${id}`,
        { isApproved: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudents(prev =>
        prev.map(s => (s._id === id ? { ...s, isApproved: value } : s))
      );

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to update approval");
    } finally {
      setActionLoading(null);
    }
  };

  // Approve all users of selected date
  const approveByDate = async () => {
    if (!selectedDate) return alert("Please select a date.");

    try {
      const res = await axios.put(
        "https://ligand-dev-7.onrender.com/api/users/approve-by-date",
        { date: selectedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);
      fetchStudents(); // Refresh data

    } catch (err) {
      console.error(err);
      alert("Failed to approve students");
    }
  };

  // Stats
  const approvedCount = students.filter(s => s.isApproved).length;
  const pendingCount = students.filter(s => !s.isApproved).length;

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading students...</p>
    </div>
  );

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Student Approval Management</h2>
        <p>Manage student registrations and approvals</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card total">
          <h3>Total Students</h3>
          <span className="stat-number">{students.length}</span>
        </div>
        <div className="stat-card approved">
          <h3>Approved</h3>
          <span className="stat-number">{approvedCount}</span>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <span className="stat-number">{pendingCount}</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Search Students</label>
          <input
            type="text"
            placeholder="Search by name, USN, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Filter by Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-select"
          >
            <option value="all">All Students</option>
            <option value="approved">Approved Only</option>
            <option value="pending">Pending Only</option>
          </select>
        </div>

        {selectedDate && (
          <button
            onClick={approveByDate}
            className="approve-all-btn"
          >
            <span className="btn-icon">✓</span>
            Approve All for {selectedDate}
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="results-info">
        Showing {filteredStudents.length} of {students.length} students
        {(selectedDate || searchTerm || statusFilter !== "all") && (
          <button 
            className="clear-filters"
            onClick={() => {
              setSelectedDate("");
              setSearchTerm("");
              setStatusFilter("all");
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>USN</th>
              <th>Email</th>
              <th>Registration Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">📭</span>
                    <h3>No students found</h3>
                    <p>Try adjusting your filters or search terms</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id} className={student.isApproved ? "approved-row" : "pending-row"}>
                  <td>
                    <div className="student-info">
                      <span className="student-name">{student.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="usn-badge">{student.usn}</span>
                  </td>
                  <td>
                    <span className="student-email">{student.email}</span>
                  </td>
                  <td>
                    <span className="date-display">
                      {new Date(student.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${student.isApproved ? 'status-approved' : 'status-pending'}`}>
                      {student.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <div className="action-container">
                      {actionLoading === student._id ? (
                        <div className="loading-small"></div>
                      ) : (
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={student.isApproved}
                            onChange={(e) =>
                              handleApproval(student._id, e.target.checked)
                            }
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .admin-container {
          max-width:90vw;
          background: #ffffffff;
          min-height: 100vh;
        }

        .admin-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .admin-header h2 {
          color: #1e293b;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .admin-header p {
          color: #64748b;
          font-size: 16px;
        }

        /* Stats Cards */
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
          border-left: 4px solid #e2e8f0;
        }

        .stat-card.total { border-left-color: #3b82f6; }
        .stat-card.approved { border-left-color: #10b981; }
        .stat-card.pending { border-left-color: #f59e0b; }

        .stat-card h3 {
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-number {
          color: #1e293b;
          font-size: 32px;
          font-weight: 700;
        }

        /* Filters Section */
        .filters-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          align-items: end;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-group label {
          color: #374151;
          font-size: 14px;
          font-weight: 600;
        }

        .search-input,
        .date-input,
        .status-select {
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .search-input:focus,
        .date-input:focus,
        .status-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .approve-all-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .approve-all-btn:hover {
          background: #059669;
          transform: translateY(-1px);
        }

        .btn-icon {
          font-size: 16px;
        }

        /* Results Info */
        .results-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          color: #64748b;
          font-size: 14px;
        }

        .clear-filters {
          background: none;
          border: 1px solid #d1d5db;
          color: #64748b;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .clear-filters:hover {
          background: #f8fafc;
          border-color: #9ca3af;
        }

        /* Table Styles */
        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .students-table {
          width: 100%;
          border-collapse: collapse;
        }

        .students-table th {
          background: #f8fafc;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
          border-bottom: 1px solid #e5e7eb;
        }

        .students-table td {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .students-table tr:last-child td {
          border-bottom: none;
        }

        .students-table tr:hover {
          background: #f8fafc;
        }

        .approved-row {
          background: #f0fdf4;
        }

        .pending-row {
          background: #fffbeb;
        }

        /* Student Info */
        .student-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .student-name {
          font-weight: 600;
          color: #1e293b;
        }

        .usn-badge {
          background: #eff6ff;
          color: #1d4ed8;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          font-family: monospace;
        }

        .student-email {
          color: #64748b;
          font-size: 14px;
        }

        .date-display {
          color: #6b7280;
          font-size: 14px;
        }

        /* Status Badges */
        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-approved {
          background: #d1fae5;
          color: #065f46;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        /* Toggle Switch */
        .action-container {
          display: flex;
          justify-content: center;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 52px;
          height: 26px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #d1d5db;
          transition: 0.3s;
          border-radius: 34px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        input:checked + .toggle-slider {
          background-color: #10b981;
        }

        input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }

        /* No Data State */
        .no-data {
          text-align: center;
          padding: 60px 20px;
        }

        .no-data-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .no-data-icon {
          font-size: 48px;
          margin-bottom: 8px;
        }

        .no-data h3 {
          color: #374151;
          font-size: 18px;
          margin: 0;
        }

        .no-data p {
          color: #6b7280;
          margin: 0;
        }

        /* Loading States */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #64748b;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-left: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        .loading-small {
          width: 20px;
          height: 20px;
          border: 2px solid #e2e8f0;
          border-left: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .admin-container {
            padding: 16px;
          }

          .filters-section {
            grid-template-columns: 1fr;
          }

          .stats-container {
            grid-template-columns: 1fr;
          }

          .students-table {
            font-size: 14px;
          }

          .students-table th,
          .students-table td {
            padding: 12px 8px;
          }
        }
      `}</style>
    </div>
  );
}