import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../StyleComponents/Loader";

const Homework = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [formData, setFormData] = useState({
    chapterNumber: "",
    chapterName: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const API_URL = "https://ligand-dev-7.onrender.com/api/assignments";

  // 📦 Fetch all homeworks
  const fetchHomeworks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/gethomework`);
      setHomeworks(res.data);
    } catch (error) {
      console.error("Error fetching homework:", error);
      showAlert("Error fetching homework", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeworks();
  }, []);

  // 📩 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Show alert message
  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 4000);
  };

  // ➕ Add or ✏️ Edit Homework
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.chapterNumber || !formData.chapterName || !formData.description) {
      showAlert("Please fill all fields", "warning");
      return;
    }

    try {
      setIsLoading(true);
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        showAlert("Homework updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        showAlert("Homework added successfully!");
      }
      setFormData({ chapterNumber: "", chapterName: "", description: "" });
      setEditingId(null);
      fetchHomeworks();
    } catch (error) {
      showAlert(error?.response?.data?.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // 🗑️ Delete homework
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this homework?")) {
      try {
        setIsLoading(true);
        await axios.delete(`${API_URL}/${id}`);
        showAlert("Homework deleted successfully!");
        fetchHomeworks();
      } catch (error) {
        console.error("Error deleting homework:", error);
        showAlert("Error deleting homework", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ✏️ Edit handler
  const handleEdit = (hw) => {
    setFormData({
      chapterNumber: hw.chapterNumber,
      chapterName: hw.chapterName,
      description: hw.description,
    });
    setEditingId(hw._id);
    // Scroll to form
    document.getElementById("homework-form").scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setFormData({ chapterNumber: "", chapterName: "", description: "" });
    setEditingId(null);
  };

  return (
    <div className="homework-container">
      <style jsx>{`
        .homework-container {
          min-height: 100vh;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .alert {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 16px 20px;
          border-radius: 12px;
          color: white;
          font-weight: 500;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
          max-width: 400px;
        }

        .alert.success {
          background: linear-gradient(135deg, #4CAF50, #45a049);
        }

        .alert.error {
          background: linear-gradient(135deg, #f44336, #da190b);
        }

        .alert.warning {
          background: linear-gradient(135deg, #ff9800, #e68900);
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .form-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          margin-bottom: 40px;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
        }

        .form-title {
          text-align: center;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .form-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 40px;
          font-size: 1.1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-label {
          display: block;
          color: #333;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 1rem;
        }

        .required {
          color: #e74c3c;
          margin-left: 4px;
        }

        .form-input {
          width: 100%;
          padding: 15px;
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .button-group {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }

        .btn {
          padding: 15px 30px;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-primary {
          flex: 1;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
          padding: 15px 25px;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #5a6268;
          transform: translateY(-2px);
        }

        .btn-edit {
          background: linear-gradient(135deg, #ffb347, #ffcc33);
          color: white;
          padding: 10px 20px;
          font-size: 0.9rem;
        }

        .btn-edit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 179, 71, 0.3);
        }

        .btn-delete {
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
          color: white;
          padding: 10px 20px;
          font-size: 0.9rem;
        }

        .btn-delete:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }

        .section-title {
          text-align: center;
          color: rgba(46, 44, 44, 0.8);
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .section-subtitle {
          text-align: center;
          color: rgba(46, 44, 44, 0.8);
          margin-bottom: 40px;
          font-size: 1.1rem;
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .homework-list {
          display: grid;
          gap: 25px;
        }

        .homework-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .homework-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .chapter-badge {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .date-text {
          color: #666;
          font-size: 0.9rem;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: #ddd;
          border-radius: 50%;
        }

        .chapter-title {
          color: #333;
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .chapter-description {
          color: #555;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 1.05rem;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .empty-state {
          background: white;
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .empty-title {
          color: #333;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .empty-text {
          color: #666;
          font-size: 1.1rem;
        }

        .loading-state {
          text-align: center;
          padding: 60px 20px;
          color: white;
        }

        .spinner-large {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
      `}</style>

      {/* Alert Message */}
      {alert.show && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className="container">
        {/* Form Card */}
        <div id="homework-form" className="form-card">
          <h2 className="form-title">
            {editingId ? "Edit Homework" : "Add New Homework"}
          </h2>
          <p className="form-subtitle">
            {editingId ? "Update the homework details" : "Create a new homework assignment"}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Chapter Number <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="chapterNumber"
                  value={formData.chapterNumber}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter chapter number"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Chapter Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="chapterName"
                  value={formData.chapterName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter chapter name"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Homework Description <span className="required">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Enter detailed description of the homework..."
                rows="4"
              />
            </div>

            <div className="button-group">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? (
                  <>
                    <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>
                    {editingId ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  editingId ? "Update Homework" : "Add Homework"
                )}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Homework List */}
        <div>
          <h3 className="section-title">Homework Assignments</h3>
          <p className="section-subtitle">Manage all your homework tasks</p>

          {isLoading && homeworks.length === 0 ? (
            <div className="loading-state">
              <div className="spinner-large"></div>
              <p>Loading homeworks...</p>
            </div>
          ) : homeworks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h4 className="empty-title">No Homework Yet</h4>
              <p className="empty-text">Get started by adding your first homework assignment above!</p>
            </div>
          ) : (
            <div className="homework-list">
              {homeworks.map((hw) => (
                <div key={hw._id} className="homework-card">
                  <div className="card-header">
                    <span className="chapter-badge">
                      Chapter {hw.chapterNumber}
                    </span>
                    <div className="dot"></div>
                    <span className="date-text">
                      {new Date(hw.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <h4 className="chapter-title">{hw.chapterName}</h4>
                  
                  <p className="chapter-description">{hw.description}</p>
                  
                  <div className="card-footer">
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(hw)}
                        disabled={isLoading}
                        className="btn btn-edit"
                      >
                        <FaEdit/> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(hw._id)}
                        disabled={isLoading}
                        className="btn btn-delete"
                      >
                       <FaTrash/> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homework;