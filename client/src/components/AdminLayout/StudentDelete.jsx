import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDelete = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, name: "" });

  const token = localStorage.getItem("token");

  // ================================
  // GET ALL STUDENTS
  // ================================
  const fetchStudents = async () => {
    try {
      const res = await axios.get("https://ligand-dev-7.onrender.com/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(res.data);
      setFilteredStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
      alert("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // DELETE STUDENT
  // ================================
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://ligand-dev-7.onrender.com/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove deleted user from UI
      setStudents((prev) => prev.filter((user) => user._id !== id));
      setFilteredStudents((prev) => prev.filter((user) => user._id !== id));
      
      setDeleteConfirm({ show: false, id: null, name: "" });
      
      // Show success notification
      showNotification("Student deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting student:", err);
      showNotification("Failed to delete student", "error");
    }
  };

  // ================================
  // SEARCH FUNCTIONALITY - FIXED VERSION
  // ================================
  const filterStudents = () => {
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) => {
        const searchLower = searchTerm.toLowerCase();
        
        // Safe property access with fallbacks
        const name = (student.name || "").toLowerCase();
        const usn = (student.usn || "").toLowerCase();
        const email = (student.email || "").toLowerCase();
        const batch = (student.batch || "").toLowerCase();
        const programName = (student.programName || "").toLowerCase();
        
        return (
          name.includes(searchLower) ||
          usn.includes(searchLower) ||
          email.includes(searchLower) ||
          batch.includes(searchLower) ||
          programName.includes(searchLower)
        );
      });
      setFilteredStudents(filtered);
    }
  };

  // ================================
  // NOTIFICATION FUNCTION
  // ================================
  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Update filtered students when search term changes
  useEffect(() => {
    filterStudents();
  }, [searchTerm, students]);

  // ================================
  // LOADING STATE
  // ================================
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading students data...</p>
      </div>
    );
  }

  // Helper function to safely get property values
  const getSafeValue = (value, fallback = "") => {
    return value || fallback;
  };

  return (
    <div className="student-delete-container">
      {/* Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?
              </p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setDeleteConfirm({ show: false, id: null, name: "" })}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm-delete"
                onClick={() => deleteStudent(deleteConfirm.id)}
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="page-header">
        <h1 className="page-title">Student Management</h1>
        <p className="page-subtitle">View and manage student records</p>
      </header>

      {/* Stats and Controls */}
      <div className="controls-section">
        <div className="stats-card">
          <div className="stats-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stats-info">
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, USN, email, batch, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      {/* Students Table */}
      <div className="table-container">
        {filteredStudents.length === 0 ? (
          <div className="no-data-message">
            <i className="fas fa-user-graduate"></i>
            <h3>No students found</h3>
            <p>{searchTerm ? "Try a different search term" : "No student records available"}</p>
          </div>
        ) : (
          <>
            <div className="table-header">
              <h3>Student Records</h3>
              <span className="results-count">{filteredStudents.length} of {students.length} students</span>
            </div>
            
            <div className="table-wrapper">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>USN</th>
                    <th>Email</th>
                    <th>Batch</th>
                    <th>Program</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id}>
                      <td>
                        <div className="student-name-cell">
                          <div className="avatar">
                            {getSafeValue(student.name).charAt(0).toUpperCase()}
                          </div>
                          <div className="name-info">
                            <span className="name">{getSafeValue(student.name)}</span>
                            <span className="student-id">ID: {student._id ? student._id.substring(0, 8) : "N/A"}...</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="usn-badge">{getSafeValue(student.usn, "N/A")}</span>
                      </td>
                      <td className="email-cell">{getSafeValue(student.email)}</td>
                      <td>
                        <span className="batch-tag">{getSafeValue(student.batch, "N/A")}</span>
                      </td>
                      <td>{getSafeValue(student.programName, "N/A")}</td>
                      <td>
                        <div className="action-buttons">
                          
                          <button 
                            className="btn-delete"
                            onClick={() => setDeleteConfirm({ 
                              show: true, 
                              id: student._id, 
                              name: getSafeValue(student.name) 
                            })}
                          >
                            <i className="fas fa-trash-alt"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="page-footer">
        <p>Use with caution. Deleting a student will permanently remove their records.</p>
        <p className="footer-note">
          <i className="fas fa-exclamation-triangle"></i> 
          This action cannot be undone
        </p>
      </footer>

      <style>{`

        /* StudentDelete.css */

/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #f8fafc;
  color: #334155;
}

/* Main Container */
.student-delete-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  gap: 20px;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container p {
  color: #64748b;
  font-size: 18px;
  font-weight: 500;
}

/* Header Section */
.page-header {
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: #64748b;
  font-weight: 400;
}

/* Controls Section */
.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 20px;
}

.stats-card {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  min-width: 200px;
}

.stats-icon {
  font-size: 28px;
  background: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-info h3 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stats-info p {
  font-size: 14px;
  opacity: 0.9;
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 18px;
}

.search-input {
  width: 100%;
  padding: 16px 20px 16px 50px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.clear-search {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  transition: color 0.2s;
}

.clear-search:hover {
  color: #64748b;
}

/* Table Container */
.table-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin-bottom: 32px;
}

.table-header {
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

.results-count {
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.table-wrapper {
  overflow-x: auto;
}

/* Table Styles */
.students-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

.students-table thead {
  background-color: #f8fafc;
}

.students-table th {
  padding: 18px 16px;
  text-align: left;
  font-weight: 600;
  color: #475569;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e2e8f0;
}

.students-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s;
}

.students-table tbody tr:hover {
  background-color: #f8fafc;
}

.students-table td {
  padding: 20px 16px;
  color: #334155;
  font-size: 15px;
}

/* Student Name Cell */
.student-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  flex-shrink: 0;
}

.name-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  color: #1e293b;
}

.student-id {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 2px;
}

/* Badges and Tags */
.usn-badge {
  background: #f0f9ff;
  color: #0369a1;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
}

.batch-tag {
  background: #f0fdf4;
  color: #166534;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
}

.email-cell {
  color: #3b82f6;
  font-weight: 500;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 10px;
}

.btn-view, .btn-delete {
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Poppins', sans-serif;
}

.btn-view {
  background-color: #f1f5f9;
  color: #475569;
}

.btn-view:hover {
  background-color: #e2e8f0;
}

.btn-delete {
  background-color: #fee2e2;
  color: #dc2626;
}

.btn-delete:hover {
  background-color: #fecaca;
}

/* No Data Message */
.no-data-message {
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
}

.no-data-message i {
  font-size: 64px;
  margin-bottom: 20px;
  color: #cbd5e1;
}

.no-data-message h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #64748b;
}

.no-data-message p {
  font-size: 16px;
}

/* Footer */
.page-footer {
  text-align: center;
  padding: 20px;
  color: #64748b;
  font-size: 14px;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

.footer-note {
  margin-top: 8px;
  color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
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
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: modal-appear 0.3s ease;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  background: #fee2e2;
  padding: 24px;
  border-bottom: 1px solid #fecaca;
}

.modal-header h3 {
  color: #dc2626;
  font-size: 20px;
  font-weight: 600;
}

.modal-body {
  padding: 32px 24px;
  color: #475569;
  line-height: 1.6;
}

.warning-text {
  color: #dc2626;
  font-weight: 500;
  margin-top: 12px;
  font-size: 15px;
}

.modal-footer {
  padding: 20px 24px;
  background: #f8fafc;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-cancel, .btn-confirm-delete {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-family: 'Poppins', sans-serif;
}

.btn-cancel {
  background-color: #e2e8f0;
  color: #475569;
}

.btn-cancel:hover {
  background-color: #cbd5e1;
}

.btn-confirm-delete {
  background-color: #dc2626;
  color: white;
}

.btn-confirm-delete:hover {
  background-color: #b91c1c;
}

/* Notification Styles */
.notification {
  position: fixed;
  top: 24px;
  right: 24px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 1001;
  transform: translateX(120%);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.notification.show {
  transform: translateX(0);
}

.notification-success {
  background-color: #10b981;
}

.notification-error {
  background-color: #dc2626;
}

.notification-info {
  background-color: #3b82f6;
}

/* Responsive Design */
@media (max-width: 992px) {
  .controls-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-container {
    max-width: 100%;
  }
  
  .stats-card {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .student-delete-container {
    padding: 16px;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn-view, .btn-delete {
    width: 100%;
    justify-content: center;
  }
  
  .modal-content {
    width: 95%;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn-cancel, .btn-confirm-delete {
    width: 100%;
  }
}

      `}</style>
    </div>
  );
};

export default StudentDelete;