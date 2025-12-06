import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCoins, FaRegMoneyBillAlt, FaUser } from "react-icons/fa";
import { MdGroups2, MdOutlineGroupAdd } from "react-icons/md";
import { SiSinglestore } from "react-icons/si";

export default function AdminGroupingPage() {
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [ungrouped, setUngrouped] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [groupRes, userRes] = await Promise.all([
        axios.get("https://ligand-dev-7.onrender.com/api/fee-groups", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://ligand-dev-7.onrender.com/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      const groupData = groupRes.data || [];
      const userData = userRes.data || [];

      // Keep only student users
      const studentUsers = userData.filter((u) => u.role === "student");

      setGroups(groupData);
      setStudents(studentUsers);

      // Get IDs of grouped students
      const groupedIDs = new Set();
      groupData.forEach((g) => {
        g.students.forEach((s) => {
          if (s?.student?._id) groupedIDs.add(String(s.student._id));
        });
      });

      const notGrouped = studentUsers.filter(
        (s) => !groupedIDs.has(String(s._id))
      );

      setUngrouped(notGrouped);
    } catch (err) {
      console.error("Error loading:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter groups based on search term
  const filteredGroups = groups.filter(group => 
    group.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.programName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter ungrouped students
  const filteredUngrouped = ungrouped.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.usn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const totalStudents = students.length;
  const groupedStudents = totalStudents - ungrouped.length;
  const totalGroups = groups.length;
  const totalFees = groups.reduce((sum, group) => 
    sum + group.students.reduce((groupSum, student) => groupSum + (student.totalFee || 0), 0), 0
  );
  const totalPaid = groups.reduce((sum, group) => 
    sum + group.students.reduce((groupSum, student) => groupSum + (student.paidFee || 0), 0), 0
  );

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Get student initials
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2) || '?';
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return '#38a169';
      case 'partial': return '#d69e2e';
      case 'unpaid': return '#e53e3e';
      default: return '#718096';
    }
  };

  // Get group color
  const groupColors = [
    '#667eea', '#764ba2', '#f56565', '#ed8936', '#38a169',
    '#4299e1', '#9f7aea', '#ed64a6', '#48bb78', '#ecc94b'
  ];

  const getGroupColor = (index) => groupColors[index % groupColors.length];

  return (
    <div className="admin-grouping-container">
      {/* Header */}
      <header className="admin-grouping-header">
        <div className="admin-grouping-header-content">
          <div className="admin-grouping-header-icon"><FaUser/></div>
          <div>
            <h1 className="admin-grouping-title">Student Group Management</h1>
            <p className="admin-grouping-subtitle">Organize and manage student fee groups</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="admin-grouping-main">
        {/* Search and Refresh */}
        <div className="admin-grouping-search-card">
          <div className="admin-grouping-search-wrapper">
            <div className="admin-grouping-search-icon">🔍</div>
            <input
              className="admin-grouping-search-input"
              placeholder="Search groups or students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="admin-grouping-refresh-btn" onClick={loadData} disabled={loading}>
            <span className="admin-grouping-refresh-icon">🔄</span>
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Statistics */}
        <div className="admin-grouping-stats">
          <div className="admin-grouping-stat-card">
            <div className="admin-grouping-stat-icon"><FaUser/></div>
            <div className="admin-grouping-stat-content">
              <div className="admin-grouping-stat-value">{totalStudents}</div>
              <div className="admin-grouping-stat-label">Total Students</div>
            </div>
          </div>
          
          <div className="admin-grouping-stat-card">
            <div className="admin-grouping-stat-icon"><MdOutlineGroupAdd/></div>
            <div className="admin-grouping-stat-content">
              <div className="admin-grouping-stat-value">{groupedStudents}</div>
              <div className="admin-grouping-stat-label">Grouped</div>
              <div className="admin-grouping-stat-percentage">
                {totalStudents > 0 ? ((groupedStudents / totalStudents) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>

          <div className="admin-grouping-stat-card">
            <div className="admin-grouping-stat-icon"><MdGroups2 />
</div>
            <div className="admin-grouping-stat-content">
              <div className="admin-grouping-stat-value">{totalGroups}</div>
              <div className="admin-grouping-stat-label">Total Groups</div>
            </div>
          </div>

          <div className="admin-grouping-stat-card">
            <div className="admin-grouping-stat-icon"><FaCoins/>
</div>
            <div className="admin-grouping-stat-content">
              <div className="admin-grouping-stat-value">{formatCurrency(totalFees)}</div>
              <div className="admin-grouping-stat-label">Total Fees</div>
            </div>
          </div>

          <div className="admin-grouping-stat-card">
            <div className="admin-grouping-stat-icon"><FaRegMoneyBillAlt /></div>
            <div className="admin-grouping-stat-content">
              <div className="admin-grouping-stat-value">{formatCurrency(totalPaid)}</div>
              <div className="admin-grouping-stat-label">Collected</div>
              <div className="admin-grouping-stat-percentage collected">
                {totalFees > 0 ? ((totalPaid / totalFees) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>

          <div className="admin-grouping-stat-card">
            <div className="admin-grouping-stat-icon"><SiSinglestore />
</div>
            <div className="admin-grouping-stat-content">
              <div className="admin-grouping-stat-value">{ungrouped.length}</div>
              <div className="admin-grouping-stat-label">Ungrouped</div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="admin-grouping-loading">
            <div className="admin-grouping-loading-spinner"></div>
            <p>Loading group data...</p>
          </div>
        ) : (
          <>
            {/* Grouped Students */}
            <div className="admin-grouping-section">
              <div className="admin-grouping-section-header">
                <h2 className="admin-grouping-section-title">
                  <span className="admin-grouping-section-icon">👥</span>
                  Student Groups ({filteredGroups.length})
                </h2>
                <div className="admin-grouping-section-subtitle">
                  Organized by college, batch, program, and technology
                </div>
              </div>

              {filteredGroups.length === 0 ? (
                <div className="admin-grouping-empty">
                  <div className="admin-grouping-empty-icon">🏷️</div>
                  <h3>No groups found</h3>
                  <p>{searchTerm ? 'Try a different search term' : 'No student groups created yet'}</p>
                </div>
              ) : (
                <div className="admin-grouping-groups">
                  {filteredGroups.map((group, groupIndex) => {
                    const groupProgress = group.students.reduce((sum, s) => sum + (s.paidFee || 0), 0) / 
                                          group.students.reduce((sum, s) => sum + (s.totalFee || 0), 0) * 100 || 0;
                    
                    return (
                      <div 
                        key={group._id} 
                        className={`admin-grouping-group-card ${activeGroup === group._id ? 'active' : ''}`}
                        onClick={() => setActiveGroup(activeGroup === group._id ? null : group._id)}
                      >
                        <div className="admin-grouping-group-header">
                          <div className="admin-grouping-group-color" style={{ backgroundColor: getGroupColor(groupIndex) }}></div>
                          <div className="admin-grouping-group-info">
                            <h3 className="admin-grouping-group-name">
                              {group.name || `Group ${groupIndex + 1}`}
                            </h3>
                            <div className="admin-grouping-group-details">
                              <span className="admin-grouping-group-college">{group.collegeName}</span>
                              <span className="admin-grouping-group-separator">•</span>
                              <span className="admin-grouping-group-batch">{group.batch}</span>
                              <span className="admin-grouping-group-separator">•</span>
                              <span className="admin-grouping-group-program">{group.programName}</span>
                              <span className="admin-grouping-group-separator">•</span>
                              <span className="admin-grouping-group-tech">{group.technology}</span>
                            </div>
                          </div>
                          <div className="admin-grouping-group-stats">
                            <div className="admin-grouping-group-stat">
                              <span className="admin-grouping-group-stat-icon">👥</span>
                              <span className="admin-grouping-group-stat-value">{group.students.length}</span>
                              <span className="admin-grouping-group-stat-label">students</span>
                            </div>
                            <div className="admin-grouping-group-stat">
                              <span className="admin-grouping-group-stat-icon">💰</span>
                              <span className="admin-grouping-group-stat-value">
                                {formatCurrency(group.students.reduce((sum, s) => sum + (s.totalFee || 0), 0))}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="admin-grouping-group-progress">
                          <div className="admin-grouping-progress-header">
                            <span className="admin-grouping-progress-label">Fee Collection Progress</span>
                            <span className="admin-grouping-progress-percentage">{groupProgress.toFixed(1)}%</span>
                          </div>
                          <div className="admin-grouping-progress-bar">
                            <div 
                              className="admin-grouping-progress-fill"
                              style={{ width: `${groupProgress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Expandable Content */}
                        {activeGroup === group._id && (
                          <div className="admin-grouping-group-expanded">
                            <div className="admin-grouping-group-students">
                              <h4 className="admin-grouping-students-title">Students in this Group</h4>
                              <div className="admin-grouping-students-table">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Student</th>
                                      <th>Fee Details</th>
                                      <th>Status</th>
                                      <th>Payments</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {group.students.map((student, studentIndex) => {
                                      const studentProgress = (student.paidFee / student.totalFee) * 100 || 0;
                                      return (
                                        <tr key={studentIndex}>
                                          <td className="admin-grouping-student-cell">
                                            <div className="admin-grouping-student-avatar">
                                              {getInitials(student.student?.name)}
                                            </div>
                                            <div className="admin-grouping-student-info">
                                              <div className="admin-grouping-student-name">
                                                {student.student?.name || 'Unknown Student'}
                                              </div>
                                              <div className="admin-grouping-student-details">
                                                <span className="admin-grouping-student-usn">{student.student?.usn || 'N/A'}</span>
                                                <span className="admin-grouping-student-email">{student.student?.email || 'No email'}</span>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="admin-grouping-fee-cell">
                                            <div className="admin-grouping-fee-details">
                                              <div className="admin-grouping-fee-row">
                                                <span className="admin-grouping-fee-label">Total:</span>
                                                <span className="admin-grouping-fee-value">{formatCurrency(student.totalFee)}</span>
                                              </div>
                                              <div className="admin-grouping-fee-row">
                                                <span className="admin-grouping-fee-label">Paid:</span>
                                                <span className="admin-grouping-fee-value paid">{formatCurrency(student.paidFee)}</span>
                                              </div>
                                              <div className="admin-grouping-fee-row">
                                                <span className="admin-grouping-fee-label">Pending:</span>
                                                <span className="admin-grouping-fee-value pending">{formatCurrency(student.currentFee)}</span>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="admin-grouping-status-cell">
                                            <span 
                                              className="admin-grouping-status-badge"
                                              style={{ backgroundColor: getStatusColor(student.status) + '20', color: getStatusColor(student.status) }}
                                            >
                                              {student.status || 'Unknown'}
                                            </span>
                                          </td>
                                          <td className="admin-grouping-payments-cell">
                                            <div className="admin-grouping-payments-count">
                                              <span className="admin-grouping-payments-icon">📋</span>
                                              <span className="admin-grouping-payments-value">
                                                {student.paymentHistory?.length || 0}
                                              </span>
                                              <span className="admin-grouping-payments-label">payments</span>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Ungrouped Students */}
            <div className="admin-grouping-section">
              <div className="admin-grouping-section-header">
                <h2 className="admin-grouping-section-title">
                  <span className="admin-grouping-section-icon">👤</span>
                  Ungrouped Students ({filteredUngrouped.length})
                </h2>
                <div className="admin-grouping-section-subtitle">
                  Students not assigned to any fee group
                </div>
              </div>

              {filteredUngrouped.length === 0 ? (
                <div className="admin-grouping-empty">
                  <div className="admin-grouping-empty-icon">✅</div>
                  <h3>All Students Grouped</h3>
                  <p>Great job! All students have been assigned to groups.</p>
                </div>
              ) : (
                <div className="admin-grouping-ungrouped-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Contact</th>
                        <th>Academic Details</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUngrouped.map((student) => (
                        <tr key={student._id}>
                          <td className="admin-grouping-student-cell">
                            <div className="admin-grouping-student-avatar">
                              {getInitials(student.name)}
                            </div>
                            <div className="admin-grouping-student-info">
                              <div className="admin-grouping-student-name">
                                {student.name}
                              </div>
                              <div className="admin-grouping-student-usn">
                                {student.usn}
                              </div>
                            </div>
                          </td>
                          <td className="admin-grouping-contact-cell">
                            <div className="admin-grouping-contact-info">
                              <div className="admin-grouping-contact-email">
                                <span className="admin-grouping-contact-icon">📧</span>
                                {student.email}
                              </div>
                            </div>
                          </td>
                          <td className="admin-grouping-academic-cell">
                            <div className="admin-grouping-academic-details">
                              <div className="admin-grouping-academic-item">
                                <span className="admin-grouping-academic-label">Batch:</span>
                                <span className="admin-grouping-academic-value">{student.batch}</span>
                              </div>
                              <div className="admin-grouping-academic-item">
                                <span className="admin-grouping-academic-label">Program:</span>
                                <span className="admin-grouping-academic-value">{student.programName}</span>
                              </div>
                              <div className="admin-grouping-academic-item">
                                <span className="admin-grouping-academic-label">Technology:</span>
                                <span className="admin-grouping-academic-value">{student.technology}</span>
                              </div>
                            </div>
                          </td>
                          <td className="admin-grouping-ungrouped-status">
                            <span className="admin-grouping-ungrouped-badge">
                              <span className="admin-grouping-ungrouped-icon">⚠️</span>
                              Ungrouped
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Main Container */
        .admin-grouping-container {
          min-height: 100vh;
          
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Header */
        .admin-grouping-header {
          margin-bottom: 30px;
          
        }

        .admin-grouping-header-content {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 25px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .admin-grouping-header-icon {
          font-size: 48px;
          background: white;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
        }

        .admin-grouping-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          color: #667eea;
        }

        .admin-grouping-subtitle {
          
          font-size: 16px;
        }

        .admin-grouping-main {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Search Card */
        .admin-grouping-search-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 24px;
          display: flex;
          gap: 20px;
          align-items: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .admin-grouping-search-wrapper {
          flex: 1;
          position: relative;
        }

        .admin-grouping-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
          font-size: 20px;
        }

        .admin-grouping-search-input {
          width: 100%;
          padding: 16px 20px 16px 55px;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          font-size: 16px;
          background: #f8fafc;
          transition: all 0.3s;
        }

        .admin-grouping-search-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }

        .admin-grouping-refresh-btn {
          padding: 16px 32px;
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          border: none;
          border-radius: 15px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-grouping-refresh-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(72, 187, 120, 0.3);
        }

        .admin-grouping-refresh-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .admin-grouping-refresh-icon {
          font-size: 18px;
        }

        /* Statistics */
        .admin-grouping-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
          max-width:content-fit;
        }

        .admin-grouping-stat-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 15px;
          
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
        }

        .admin-grouping-stat-card:hover {
          transform: translateY(-5px);
        }

        .admin-grouping-stat-icon {
          font-size: 36px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding:10px;
        }

        .admin-grouping-stat-content {
          flex: 1;
        }

        .admin-grouping-stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 5px;
        }

        .admin-grouping-stat-label {
          color: #718096;
          font-size: 14px;
          font-weight: 600;
        }

        .admin-grouping-stat-percentage {
          color: #48bb78;
          font-size: 12px;
          font-weight: 600;
          margin-top: 5px;
        }

        .admin-grouping-stat-percentage.collected {
          color: #38a169;
        }

        /* Loading State */
        .admin-grouping-loading {
          background: white;
          border-radius: 20px;
          padding: 80px 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .admin-grouping-loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Sections */
        .admin-grouping-section {
          background: white;
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .admin-grouping-section-header {
          margin-bottom: 30px;
        }

        .admin-grouping-section-title {
          font-size: 24px;
          font-weight: 700;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .admin-grouping-section-icon {
          font-size: 28px;
        }

        .admin-grouping-section-subtitle {
          color: #718096;
          font-size: 16px;
        }

        /* Empty State */
        .admin-grouping-empty {
          text-align: center;
          padding: 60px 20px;
          color: #a0aec0;
        }

        .admin-grouping-empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .admin-grouping-empty h3 {
          font-size: 24px;
          color: #718096;
          margin-bottom: 8px;
        }

        /* Group Cards */
        .admin-grouping-groups {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .admin-grouping-group-card {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          padding: 25px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .admin-grouping-group-card:hover {
          border-color: #cbd5e0;
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .admin-grouping-group-card.active {
          border-color: #667eea;
          background: white;
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.15);
        }

        .admin-grouping-group-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .admin-grouping-group-color {
          width: 10px;
          height: 60px;
          border-radius: 5px;
          flex-shrink: 0;
        }

        .admin-grouping-group-info {
          flex: 1;
        }

        .admin-grouping-group-name {
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .admin-grouping-group-details {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .admin-grouping-group-college,
        .admin-grouping-group-batch,
        .admin-grouping-group-program,
        .admin-grouping-group-tech {
          color: #4a5568;
          font-size: 14px;
          font-weight: 500;
          background: #e2e8f0;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .admin-grouping-group-separator {
          color: #a0aec0;
        }

        .admin-grouping-group-stats {
          display: flex;
          gap: 30px;
        }

        .admin-grouping-group-stat {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .admin-grouping-group-stat-icon {
          font-size: 18px;
          color: #718096;
        }

        .admin-grouping-group-stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
        }

        .admin-grouping-group-stat-label {
          color: #718096;
          font-size: 14px;
        }

        /* Progress Bar */
        .admin-grouping-group-progress {
          margin-bottom: 20px;
        }

        .admin-grouping-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .admin-grouping-progress-label {
          color: #718096;
          font-size: 14px;
          font-weight: 500;
        }

        .admin-grouping-progress-percentage {
          color: #48bb78;
          font-weight: 700;
          font-size: 16px;
        }

        .admin-grouping-progress-bar {
          height: 10px;
          background: #e2e8f0;
          border-radius: 5px;
          overflow: hidden;
        }

        .admin-grouping-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #48bb78, #38a169);
          border-radius: 5px;
          transition: width 0.6s ease;
        }

        /* Expanded Content */
        .admin-grouping-group-expanded {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .admin-grouping-students-title {
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 20px;
        }

        .admin-grouping-students-table {
          overflow-x: auto;
        }

        .admin-grouping-students-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-grouping-students-table th {
          padding: 16px;
          background: #f7fafc;
          color: #4a5568;
          font-weight: 600;
          text-align: left;
          font-size: 14px;
          border-bottom: 2px solid #e2e8f0;
        }

        .admin-grouping-students-table td {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        /* Student Cells */
        .admin-grouping-student-cell {
          min-width: 250px;
        }

        .admin-grouping-student-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          margin-right: 12px;
          float: left;
        }

        .admin-grouping-student-info {
          overflow: hidden;
        }

        .admin-grouping-student-name {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 4px;
        }

        .admin-grouping-student-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .admin-grouping-student-usn {
          color: #667eea;
          font-weight: 500;
          font-size: 12px;
        }

        .admin-grouping-student-email {
          color: #718096;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Fee Cells */
        .admin-grouping-fee-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .admin-grouping-fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-grouping-fee-label {
          color: #718096;
          font-size: 12px;
        }

        .admin-grouping-fee-value {
          font-weight: 600;
          font-size: 14px;
          color: #2d3748;
        }

        .admin-grouping-fee-value.paid {
          color: #38a169;
        }

        .admin-grouping-fee-value.pending {
          color: #e53e3e;
        }

        /* Status Badge */
        .admin-grouping-status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          min-width: 80px;
          text-align: center;
        }

        /* Payments Cell */
        .admin-grouping-payments-count {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .admin-grouping-payments-icon {
          font-size: 16px;
          color: #718096;
        }

        .admin-grouping-payments-value {
          font-weight: 700;
          color: #2d3748;
        }

        .admin-grouping-payments-label {
          color: #718096;
          font-size: 12px;
        }

        /* Ungrouped Table */
        .admin-grouping-ungrouped-table {
          overflow-x: auto;
        }

        .admin-grouping-ungrouped-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .admin-grouping-ungrouped-table th {
          padding: 20px;
          background: #f7fafc;
          color: #4a5568;
          font-weight: 600;
          text-align: left;
          font-size: 14px;
          border-bottom: 2px solid #e2e8f0;
        }

        .admin-grouping-ungrouped-table td {
          padding: 20px;
          color: #4a5568;
          border-bottom: 1px solid #f1f5f9;
        }

        /* Contact Cell */
        .admin-grouping-contact-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-grouping-contact-email {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #718096;
          font-size: 14px;
        }

        .admin-grouping-contact-icon {
          color: #667eea;
        }

        /* Academic Cell */
        .admin-grouping-academic-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-grouping-academic-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-grouping-academic-label {
          color: #718096;
          font-size: 12px;
          min-width: 80px;
        }

        .admin-grouping-academic-value {
          color: #2d3748;
          font-weight: 500;
          font-size: 14px;
          background: #f7fafc;
          padding: 4px 12px;
          border-radius: 15px;
        }

        /* Ungrouped Status */
        .admin-grouping-ungrouped-badge {
          padding: 8px 16px;
          background: rgba(245, 101, 101, 0.1);
          color: #e53e3e;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .admin-grouping-ungrouped-icon {
          font-size: 16px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .admin-grouping-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .admin-grouping-container {
            padding: 10px;
          }

          .admin-grouping-header-content {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }

          .admin-grouping-header-icon {
            width: 60px;
            height: 60px;
            font-size: 32px;
          }

          .admin-grouping-title {
            font-size: 24px;
          }

          .admin-grouping-search-card {
            flex-direction: column;
            align-items: stretch;
          }

          .admin-grouping-stats {
            grid-template-columns: 1fr;
          }

          .admin-grouping-group-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .admin-grouping-group-color {
            width: 100%;
            height: 5px;
          }

          .admin-grouping-group-stats {
            width: 100%;
            justify-content: space-between;
          }

          .admin-grouping-students-table,
          .admin-grouping-ungrouped-table {
            display: block;
            overflow-x: auto;
          }

          .admin-grouping-student-avatar {
            float: none;
            margin: 0 auto 10px;
          }

          .admin-grouping-student-info {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .admin-grouping-stat-card {
            flex-direction: column;
            text-align: center;
          }

          .admin-grouping-group-details {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .admin-grouping-group-separator {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}