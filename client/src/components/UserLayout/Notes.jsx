// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Notes = () => {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const res = await axios.get("https://ligand-dev-7.onrender.com/api/notes/active");
//         setNotes(res.data);
//       } catch (err) {
//         console.error("Error fetching notes", err);
//       }
//     };
//     fetchNotes();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Available Chapters</h2>
//       <ul className="space-y-2">
//         {notes.map((note) => (
//           <li key={note._id}>
//             <Link
//               to={note.path}
//               className="block p-3 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
//             >
//               {note.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notes;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../StyleComponents/Loader";

const Notes = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [retryHover, setRetryHover] = useState(false);
  const collegeName = localStorage.getItem("collegeName");// get from logged-in user

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://ligand-dev-7.onrender.com/api/notes/foruser/${collegeName}`);
        setNotes(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching notes", err);
        setError("Failed to load chapters. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [collegeName]);

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
    subtitle: {
      fontSize: "16px",
      color: "#64748b",
      fontWeight: "400"
    },
    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "24px",
      margin: "0 auto"
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      textDecoration: "none",
      display: "block",
      color: "inherit"
    },
    cardHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.08), 0 5px 10px rgba(0, 0, 0, 0.05)"
    },
    cardContent: {
      padding: "24px"
    },
    cardIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "60px",
      width: "60px",
      borderRadius: "12px",
      backgroundColor: "#e0f2fe",
      color: "#0369a1",
      marginBottom: "20px",
      fontSize: "24px"
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "12px",
      lineHeight: "1.4"
    },
    cardDescription: {
      fontSize: "14px",
      color: "#64748b",
      lineHeight: "1.5",
      marginBottom: "20px"
    },
    cardCta: {
      display: "flex",
      alignItems: "center",
      color: "#0369a1",
      fontWeight: "500",
      fontSize: "14px"
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh"
    },
    spinner: {
      width: "48px",
      height: "48px",
      border: "4px solid #e2e8f0",
      borderTop: "4px solid #0369a1",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    },
    errorContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      padding: "20px"
    },
    errorCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.04)",
      padding: "32px",
      textAlign: "center",
      maxWidth: "500px"
    },
    errorIcon: {
      color: "#ef4444",
      fontSize: "48px",
      marginBottom: "16px"
    },
    errorTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "12px"
    },
    errorText: {
      fontSize: "16px",
      color: "#64748b",
      marginBottom: "24px",
      lineHeight: "1.5"
    },
    retryButton: {
      padding: "10px 20px",
      backgroundColor: "#0369a1",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease"
    },
    retryButtonHover: {
      backgroundColor: "#0284c7"
    },
    emptyState: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.04)",
      padding: "40px",
      textAlign: "center",
      gridColumn: "1 / -1",
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
    },
    emptyText: {
      fontSize: "16px",
      color: "#64748b"
    }
  };

  // Add keyframes for spinner animation
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []);

  if (loading) {
    return (
      <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <div style={styles.errorCard}>
            <div style={styles.errorIcon}>⚠️</div>
            <h3 style={styles.errorTitle}>Something went wrong</h3>
            <p style={styles.errorText}>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                ...styles.retryButton,
                ...(retryHover && styles.retryButtonHover)
              }}
              onMouseOver={() => setRetryHover(true)}
              onMouseOut={() => setRetryHover(false)}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Available Chapters</h1>
        <p style={styles.subtitle}>Select a chapter to begin your learning journey</p>
      </header>
      
      <div style={styles.cardContainer}>
        {notes.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📚</div>
            <h3 style={styles.emptyTitle}>No chapters available</h3>
            <p style={styles.emptyText}>Check back later for new content.</p>
          </div>
        ) : (
          notes.map((note) => (
            <Link
              key={note._id}
              to={note.path}
              style={{
                ...styles.card,
                ...(hoveredCard === note._id && styles.cardHover)
              }}
              onMouseOver={() => setHoveredCard(note._id)}
              onMouseOut={() => setHoveredCard(null)}
            >
              <div style={styles.cardContent}>
                <div style={styles.cardIcon}>📖</div>
                <h3 style={styles.cardTitle}>{note.title}</h3>
                <p style={styles.cardDescription}>
                  {note.description || "Explore this chapter to enhance your knowledge."}
                </p>
                <div style={styles.cardCta}>
                  Start learning →
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;