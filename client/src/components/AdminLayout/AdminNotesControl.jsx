import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../StyleComponents/Loader";

const AdminNotesControl = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", path: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://ligand-dev-7.onrender.com/api/notes/admin"); 
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add / Update note
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://ligand-dev-7.onrender.com/api/notes/${editingId}`, form);
      } else {
        await axios.post("https://ligand-dev-7.onrender.com/api/notes", form);
      }
      setForm({ title: "", path: "", description: "" });
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      console.error("Error saving note", err);
    }
  };

  // Edit note
  const handleEdit = (note) => {
    setForm({ title: note.title, path: note.path, description: note.description || "" });
    setEditingId(note._id);
  };

  // Delete note
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`https://ligand-dev-7.onrender.com/api/notes/${id}`);
        fetchNotes();
      } catch (err) {
        console.error("Error deleting note", err);
      }
    }
  };

  // Toggle active/inactive
  const handleToggle = async (id) => {
    try {
      await axios.patch(`https://ligand-dev-7.onrender.com/api/notes/${id}/toggle`);
      fetchNotes();
    } catch (err) {
      console.error("Error toggling note", err);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setForm({ title: "", path: "", description: "" });
    setEditingId(null);
  };

  // CSS styles
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      padding: "20px 0"
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "8px"
    },
    formContainer: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.04)",
      padding: "24px",
      marginBottom: "32px",
      maxWidth: "800px",
      margin: "0 auto 32px"
    },
    formTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "20px"
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "16px",
      marginBottom: "16px",
      boxSizing: "border-box"
    },
    textarea: {
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "16px",
      marginBottom: "16px",
      minHeight: "100px",
      resize: "vertical",
      boxSizing: "border-box"
    },
    button: {
      padding: "12px 20px",
      borderRadius: "8px",
      fontWeight: "500",
      cursor: "pointer",
      border: "none",
      fontSize: "16px",
      transition: "all 0.2s ease",
      marginRight: "12px"
    },
    submitButton: {
      backgroundColor: "#0369a1",
      color: "white"
    },
    submitButtonHover: {
      backgroundColor: "#0284c7"
    },
    cancelButton: {
      backgroundColor: "#94a3b8",
      color: "white"
    },
    cancelButtonHover: {
      backgroundColor: "#64748b"
    },
    notesList: {
      maxWidth: "1000px",
      margin: "0 auto"
    },
    noteItem: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.04)",
      padding: "20px",
      marginBottom: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    noteInfo: {
      flex: "1"
    },
    noteTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "8px"
    },
    notePath: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "8px"
    },
    noteDescription: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "8px"
    },
    status: {
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "12px"
    },
    activeStatus: {
      color: "#16a34a"
    },
    inactiveStatus: {
      color: "#dc2626"
    },
    actionButtons: {
      display: "flex",
      gap: "8px"
    },
    toggleButton: {
      padding: "8px 12px",
      backgroundColor: "#f59e0b",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px"
    },
    editButton: {
      padding: "8px 12px",
      backgroundColor: "#0369a1",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px"
    },
    deleteButton: {
      padding: "8px 12px",
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px"
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px"
    },
    spinner: {
      width: "48px",
      height: "48px",
      border: "4px solid #e2e8f0",
      borderTop: "4px solid #0369a1",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    },
    emptyState: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.04)",
      padding: "40px",
      textAlign: "center",
      maxWidth: "600px",
      margin: "0 auto"
    },
    emptyIcon: {
      color: "#cbd5e1",
      fontSize: "64px",
      marginBottom: "20px"
    },
    emptyTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "12px"
    }
  };

  // State for button hover effects
  const [submitHover, setSubmitHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Admin Notes Control</h1>
        <p style={{ color: "#64748b" }}>Manage all chapters and their visibility</p>
      </header>

      {/* Add / Edit Form */}
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>
          {editingId ? "Edit Chapter" : "Add New Chapter"}
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Path (e.g. /notes/chapter1)"
            value={form.path}
            onChange={(e) => setForm({ ...form, path: e.target.value })}
            style={styles.input}
            required
          />
         
          <div>
            <button
              type="submit"
              style={{
                ...styles.button,
                ...styles.submitButton,
                ...(submitHover && styles.submitButtonHover)
              }}
              onMouseOver={() => setSubmitHover(true)}
              onMouseOut={() => setSubmitHover(false)}
            >
              {editingId ? "Update Chapter" : "Add Chapter"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  ...styles.button,
                  ...styles.cancelButton,
                  ...(cancelHover && styles.cancelButtonHover)
                }}
                onMouseOver={() => setCancelHover(true)}
                onMouseOut={() => setCancelHover(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Notes List */}
      <div style={styles.notesList}>
        <h3 style={{ ...styles.formTitle, marginLeft: "8px" }}>All Chapters</h3>
        
        {loading ? (
          <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>
        ) : notes.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📚</div>
            <h3 style={styles.emptyTitle}>No chapters available</h3>
            <p style={{ color: "#64748b" }}>Add your first chapter using the form above.</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note._id} style={styles.noteItem}>
              <div style={styles.noteInfo}>
                <h4 style={styles.noteTitle}>{note.title}</h4>
                <p style={styles.notePath}>
                  <strong>Path:</strong> {note.path}
                </p>
                {note.description && (
                  <p style={styles.noteDescription}>
                    <strong>Description:</strong> {note.description}
                  </p>
                )}
                <p style={{
                  ...styles.status,
                  ...(note.isActive ? styles.activeStatus : styles.inactiveStatus)
                }}>
                  Status: {note.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div style={styles.actionButtons}>
                <button
                  onClick={() => handleToggle(note._id)}
                  style={styles.toggleButton}
                >
                  {note.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleEdit(note)}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotesControl;