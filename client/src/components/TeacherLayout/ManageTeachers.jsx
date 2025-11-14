import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaToggleOn, FaToggleOff, FaUserGraduate, FaEnvelope, FaPhone, FaBook, FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Load all teachers
  const loadTeachers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://ligand-software-solutions-workshop-2.onrender.com/api/teacher");
      setTeachers(res.data);
      setFilteredTeachers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  // Filter teachers based on search and status
  useEffect(() => {
    let filtered = teachers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.phoneNo?.includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(teacher => 
        statusFilter === "active" ? teacher.activeStatus : !teacher.activeStatus
      );
    }

    setFilteredTeachers(filtered);
  }, [searchTerm, statusFilter, teachers]);

  // Toggle Active/Inactive
  const toggleStatus = async (id, currentStatus, teacherName) => {
    try {
      await axios.patch(`https://ligand-software-solutions-workshop-2.onrender.com/api/teacher/toggle-status/${id}`);
      
      const newStatus = !currentStatus;
      toast.success(
        `${teacherName} is now ${newStatus ? "active" : "inactive"}. Email notification sent.`
      );

      loadTeachers(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to update teacher status");
    }
  };

  const getTeacherProfilePic = (teacher) => {
    return teacher.profilePic 
      ? `https://ligand-software-solutions-workshop-2.onrender.com/uploads/${teacher.profilePic}`
      : "https://img.freepik.com/premium-vector/female-teacher-cute-woman-stands-with-pointer-book-school-learning-concept-teacher-s-day_335402-428.jpg";
  };

  const getStatusStats = () => {
    const active = teachers.filter(t => t.activeStatus).length;
    const inactive = teachers.filter(t => !t.activeStatus).length;
    return { active, inactive, total: teachers.length };
  };

  const stats = getStatusStats();

  return (
    <div className="manage-teachers-container">
      <ToastContainer 
        position="top-right" 
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <FaUserGraduate className="header-icon" />
            <h1>Manage Teachers</h1>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-card active">
              <span className="stat-number">{stats.active}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-card inactive">
              <span className="stat-number">{stats.inactive}</span>
              <span className="stat-label">Inactive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section card">
        <div className="filters-grid">
          <div className="search-control">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search teachers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label>Status Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Teachers</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teachers List */}
      <div className="teachers-list-section card">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading teachers...</p>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="empty-state">
            <FaUserGraduate className="empty-icon" />
            <h4>No Teachers Found</h4>
            <p>
              {teachers.length === 0 
                ? "No teachers are registered yet." 
                : "No teachers match your search criteria."}
            </p>
          </div>
        ) : (
          <div className="teachers-grid">
            {filteredTeachers.map((teacher) => (
              <div key={teacher._id} className="teacher-card">
                {/* Teacher Profile Section */}
                <div className="teacher-profile">
                  <div className="teacher-avatar">
                    <img
                      src={getTeacherProfilePic(teacher)}
                      alt={`${teacher.firstname} ${teacher.lastname}`}
                      onError={(e) => {
                        e.target.src = "https://img.freepik.com/premium-vector/female-teacher-cute-woman-stands-with-pointer-book-school-learning-concept-teacher-s-day_335402-428.jpg";
                      }}
                    />
                  </div>
                  
                  <div className="teacher-info">
                    <h3 className="teacher-name">
                      {teacher.firstname} {teacher.lastname}
                    </h3>
                    
                    <div className="teacher-details">
                      <div className="detail-item">
                        <FaEnvelope className="detail-icon" />
                        <span>{teacher.email}</span>
                      </div>
                      
                      <div className="detail-item">
                        <FaPhone className="detail-icon" />
                        <span>{teacher.phoneNo || "Not provided"}</span>
                      </div>
                      
                      <div className="detail-item">
                        <FaBook className="detail-icon" />
                        <span>{teacher.education || "Not specified"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Actions Section */}
                <div className="teacher-actions">
                  <div 
                    className={`status-badge ${teacher.activeStatus ? "active" : "inactive"}`}
                  >
                    {teacher.activeStatus ? "Active" : "Inactive"}
                  </div>

                  <button
                    onClick={() => toggleStatus(
                      teacher._id, 
                      teacher.activeStatus, 
                      `${teacher.firstname} ${teacher.lastname}`
                    )}
                    className={`toggle-button ${teacher.activeStatus ? "active" : "inactive"}`}
                    title={`Click to make ${teacher.activeStatus ? "inactive" : "active"}`}
                  >
                    {teacher.activeStatus ? (
                      <FaToggleOn className="toggle-icon" />
                    ) : (
                      <FaToggleOff className="toggle-icon" />
                    )}
                    <span className="toggle-text">
                      {teacher.activeStatus ? "Deactivate" : "Activate"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>
        {
            `
            /* ManageTeachers.css */

.manage-teachers-container {
//   padding: 20px;
  max-width: 1200px;
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
  gap: 15px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  min-width: 100px;
}

.stat-card.active {
  background: rgba(72, 187, 120, 0.3);
}

.stat-card.inactive {
  background: rgba(245, 101, 101, 0.3);
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
color:#fff;
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 500;
}

/* Card Styles */
.card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e8ed;
  margin-bottom: 20px;
}

/* Filters Section */
.filters-section {
  margin-bottom: 25px;
}

.filters-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: end;
}

.search-control {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
}

.filter-select {
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Teachers List */
.teachers-grid {
  display: grid;
  gap: 20px;
}

.teacher-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.teacher-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.teacher-profile {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.teacher-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #e2e8f0;
}

.teacher-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.teacher-info {
  flex: 1;
}

.teacher-name {
  margin: 0 0 12px 0;
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 600;
}

.teacher-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4a5568;
  font-size: 0.9rem;
}

.detail-icon {
  color: #667eea;
  font-size: 0.8rem;
  width: 16px;
}

.teacher-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  min-width: 140px;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: #c6f6d5;
  color: #22543d;
}

.status-badge.inactive {
  background: #fed7d7;
  color: #742a2a;
}

.toggle-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #e2e8f0;
  color: #4a5568;
}

.toggle-button.active {
  background: #fed7d7;
  color: #c53030;
}

.toggle-button.inactive {
  background: #c6f6d5;
  color: #276749;
}

.toggle-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toggle-icon {
  font-size: 1.3rem;
}

.toggle-text {
  font-size: 0.85rem;
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
  .teachers-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .manage-teachers-container {
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
    min-width: 80px;
    padding: 12px 15px;
  }

  .filters-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .teacher-card {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    text-align: center;
  }

  .teacher-profile {
    flex-direction: column;
    text-align: center;
  }

  .teacher-details {
    align-items: center;
  }

  .teacher-actions {
    flex-direction: row;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header-title {
    flex-direction: column;
    gap: 10px;
  }

  .header-title h1 {
    font-size: 1.5rem;
  }

  .header-stats {
    flex-direction: column;
    gap: 10px;
  }

  .teacher-actions {
    flex-direction: column;
  }

  .teacher-name {
    font-size: 1.1rem;
  }
}
            `
        }
      </style>
    </div>
  );
};

export default ManageTeachers;