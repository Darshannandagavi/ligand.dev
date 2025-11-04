import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { RiSettings4Fill } from "react-icons/ri";

const AdminOptions = () => {
  const [options, setOptions] = useState({
    batch: [],
    collegeName: [],
    programName: [],
    technology: [],
  });

  const [newValue, setNewValue] = useState("");
  const [selectedType, setSelectedType] = useState("batch");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const API_URL = "https://ligand-software-solutions-workshop-2.onrender.com/api/options";

  // Show notification
  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  // Load all dropdown values
  const fetchOptions = async () => {
    try {
      setLoading(true);
      const types = ["batch", "collegeName", "programName", "technology"];
      const responses = await Promise.all(
        types.map((type) => axios.get(`${API_URL}/${type}`))
      );

      setOptions({
        batch: responses[0].data,
        collegeName: responses[1].data,
        programName: responses[2].data,
        technology: responses[3].data,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching options:", err);
      showNotification("Failed to load options", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  // Add new value
  const handleAdd = async () => {
    if (!newValue.trim()) {
      showNotification("Please enter a value", "error");
      return;
    }

    try {
      await axios.post(API_URL, { type: selectedType, value: newValue });
      setNewValue("");
      fetchOptions();
      showNotification("Option added successfully", "success");
    } catch (err) {
      showNotification(
        err.response?.data?.error || "Failed to add option",
        "error"
      );
    }
  };

  // Update value
  const handleUpdate = async (id) => {
    if (!newValue.trim()) {
      showNotification("Please enter a value", "error");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, { value: newValue });
      setEditing(null);
      setNewValue("");
      fetchOptions();
      showNotification("Option updated successfully", "success");
    } catch (err) {
      showNotification(
        err.response?.data?.error || "Failed to update option",
        "error"
      );
    }
  };

  // Delete value
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this option?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchOptions();
      showNotification("Option deleted successfully", "success");
    } catch (err) {
      showNotification(
        err.response?.data?.error || "Failed to delete option",
        "error"
      );
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditing(null);
    setNewValue("");
    showNotification("Edit cancelled", "info");
  };

  return (
    <div className="admin-options-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="admin-header">
        <h2><RiSettings4Fill />
 Admin Dashboard - Manage Options</h2>
        <p>Add, edit, or remove options for application dropdowns</p>
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        <div className="panel-header">
          <h3>{editing ? "Edit Option" : "Add New Option"}</h3>
        </div>

        <div className="form-group">
          <label htmlFor="option-type">Option Type</label>
          <select
            id="option-type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            disabled={editing !== null}
          >
            <option value="batch">Batch</option>
            <option value="collegeName">College</option>
            <option value="programName">Program</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="option-value">
            {editing ? "Edit Value" : "New Value"}
          </label>
          <input
            id="option-value"
            type="text"
            placeholder={`Enter ${selectedType}`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        </div>

        <div className="form-actions">
          {editing ? (
            <>
              <button
                className="btn-primary"
                onClick={() => handleUpdate(editing)}
              >
                <span className="icon">✓</span> Update Option
              </button>
              <button className="btn-secondary" onClick={handleCancelEdit}>
                <span className="icon">×</span> Cancel
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={handleAdd}>
              <span className="icon">+</span> Add Option
            </button>
          )}
        </div>
      </div>

      {/* Options Lists */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading options...</p>
        </div>
      ) : (
        <div className="options-grid">
          {Object.keys(options).map((type) => (
            <div key={type} className="option-card">
              <div className="card-header">
                <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <span className="count-badge">
                  {options[type].length} items
                </span>
              </div>

              {options[type].length === 0 ? (
                <p className="empty-message">No options added yet</p>
              ) : (
                <ul className="options-list">
                  {options[type].map((opt) => (
                    <li
                      key={opt._id}
                      className={editing === opt._id ? "editing" : ""}
                    >
                      <span className="option-text">{opt.value}</span>
                      <div className="option-actions">
                        <button
                          className="icon-btn edit-btn"
                          onClick={() => {
                            setEditing(opt._id);
                            setNewValue(opt.value);
                            setSelectedType(type);
                            showNotification(`Editing: ${opt.value}`, "info");
                          }}
                          title="Edit"
                        >
                         Edit <BiSolidMessageSquareEdit />

                        </button>
                        <button
                          className="icon-btn delete-btn"
                          onClick={() => handleDelete(opt._id)}
                          title="Delete"
                        >
                        Delete<AiFillDelete />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      <style>
        {`
        /* AdminOptions.css */

.admin-options-container {
  
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7f9;
  min-height: 100vh;
}

/* Notification */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #f44336;
}

.notification.info {
  background-color: #2196f3;
}

@keyframes slideIn {
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Header */
.admin-header {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
}

.admin-header h2 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  display:flex;
  align-items:center;
  gap:10px;
}

.admin-header p {
  margin: 0;
  color: #7f8c8d;
  font-size: 16px;
}

/* Control Panel */
.control-panel {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.panel-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.panel-header h3 {
  margin: 0;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #34495e;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group select:focus,
.form-group input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-actions {
  display: flex;
  gap: 12px;
}

.btn-primary, .btn-secondary {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #e7e9ed;
  color: #7f8c8d;
}

.btn-secondary:hover {
  background-color: #d5d8dc;
}

.icon {
  margin-right: 8px;
}

/* Options Grid */
.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.option-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.option-card:hover {
  transform: translateY(-5px);
}

.card-header {
  background: #f8f9fa;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
  text-transform: capitalize;
}

.count-badge {
  background: #3498db;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

/* Options List */
.options-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 350px;
  overflow-y: auto;
}

.options-list li {
  padding: 15px 20px;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.options-list li:last-child {
  border-bottom: none;
}

.options-list li:hover {
  background-color: #f9f9f9;
}

.options-list li.editing {
  background-color: #e3f2fd;
}

.option-text {
  flex: 1;
  font-size: 16px;
  color: #2c3e50;
}

.option-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: background-color 0.2s;
  font-size: 16px;
  display:flex;
  gap:5px;
  border:2px solid rgba(221, 217, 217, 1);
}

.edit-btn:hover {
  background-color: #e3f2fd;
}

.delete-btn:hover {
  background-color: #ffebee;
  color: #f44336;
}

.empty-message {
  padding: 30px 20px;
  text-align: center;
  color: #95a5a6;
  font-style: italic;
  margin: 0;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary {
    justify-content: center;
  }
}
        `}
      </style>
    </div>
  );
};

export default AdminOptions;
