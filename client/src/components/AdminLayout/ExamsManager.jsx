import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../StyleComponents/Loader";

export default function ManageExamAndNoteVisibility() {
  const [exams, setExams] = useState([]);
  const [notes, setNotes] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [activeTab, setActiveTab] = useState("exams");
  const [examSearch, setExamSearch] = useState("");
  const [noteSearch, setNoteSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch exams and notes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch exams
        const examsRes = await axios.get("https://ligand-dev-7.onrender.com/api/exams/examsforadmin");
        setExams(examsRes.data);

        // Fetch notes
        const notesRes = await axios.get("https://ligand-dev-7.onrender.com/api/notes/admin");
        setNotes(notesRes.data);

        // Fetch colleges added by admin
        const collegesRes = await axios.get("https://ligand-dev-7.onrender.com/api/options/collegeName");
        // collegesRes.data is an array of { _id, type, value }
        setColleges(collegesRes.data.map(c => c.value));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle college for exam
  const toggleExamCollege = async (examId, collegeName) => {
    try {
      await axios.put(`https://ligand-dev-7.onrender.com/api/exams/exams/${examId}/college`, { collegeName });
      const updated = await axios.get("https://ligand-dev-7.onrender.com/api/exams/examsforadmin");
      setExams(updated.data);
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  // Toggle college for note
  const toggleNoteCollege = async (noteId, collegeName) => {
    try {
      await axios.put(`https://ligand-dev-7.onrender.com/api/notes/${noteId}/college`, { collegeName });
      const updated = await axios.get("https://ligand-dev-7.onrender.com/api/notes/admin");
      setNotes(updated.data);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Filter exams based on search
  const filteredExams = exams.filter(exam => 
    exam.examTitle.toLowerCase().includes(examSearch.toLowerCase())
  );

  // Filter notes based on search
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(noteSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>
    );
  }

  return (
    <div className="visibility-manager">
      <header className="manager-header">
        <h1>Content Visibility Manager</h1>
        <p>Control which colleges can access exams and notes</p>
      </header>

      <div className="tab-container">
        <button 
          className={`tab-button ${activeTab === "exams" ? "active" : ""}`}
          onClick={() => setActiveTab("exams")}
        >
          Exams
        </button>
        <button 
          className={`tab-button ${activeTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
      </div>

      {activeTab === "exams" && (
        <div className="content-section">
          <div className="section-header">
            <h2>Manage Exam Visibility</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search exams..."
                value={examSearch}
                onChange={(e) => setExamSearch(e.target.value)}
              />
            </div>
          </div>

          {filteredExams.length === 0 ? (
            <div className="empty-state">
              <p>No exams found{matchMedia.examSearch && ` matching "${examSearch}"`}</p>
            </div>
          ) : (
            <div className="cards-container">
              {filteredExams.map(exam => (
                <div key={exam._id} className="content-card">
                  <h3 className="content-title" style={{color: "#606060ff"}}>{exam.examTitle}</h3>
                  <div className="college-visibility">
                    <h4>Visible to:</h4>
                    <div className="college-buttons">
                      {colleges.map(college => (
                        <button
                          key={college}
                          className={`college-toggle ${exam.visibleTo.includes(college) ? "active" : "inactive"}`}
                          onClick={() => toggleExamCollege(exam._id, college)}
                        >
                          <span className="college-name">{college}</span>
                          <span className="toggle-indicator">
                            {exam.visibleTo.includes(college) ? "✓" : "✕"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "notes" && (
        <div className="content-section">
          <div className="section-header">
            <h2>Manage Notes Visibility</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search notes..."
                value={noteSearch}
                onChange={(e) => setNoteSearch(e.target.value)}
              />
            </div>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="empty-state">
              <p>No notes found{noteSearch && ` matching "${noteSearch}"`}</p>
            </div>
          ) : (
            <div className="cards-container">
              {filteredNotes.map(note => (
                <div key={note._id} className="content-card">
                  <h3 className="content-title">{note.title}</h3>
                  <div className="college-visibility">
                    <h4>Visible to:</h4>
                    <div className="college-buttons">
                      {colleges.map(college => (
                        <button
                          key={college}
                          className={`college-toggle ${note.visibleTo.includes(college) ? "active" : "inactive"}`}
                          onClick={() => toggleNoteCollege(note._id, college)}
                        >
                          <span className="college-name">{college}</span>
                          <span className="toggle-indicator">
                            {note.visibleTo.includes(college) ? "✓" : "✕"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <style>
        {`
        .visibility-manager {
 
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.manager-header {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.manager-header h1 {
  margin-bottom: 8px;
  font-weight: 600;
}

.manager-header p {
  color: #7f8c8d;
  font-size: 16px;
}

.tab-container {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 25px;
}

.tab-button {
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tab-button.active {
  color: #3498db;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #3498db;
  border-radius: 3px 3px 0 0;
}

.tab-button:hover {
  color: #3498db;
}

.content-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.section-header h2 {
  color: #2c3e50;
  font-weight: 500;
}

.search-box input {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 250px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.content-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.content-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}

.content-title {
  margin: 0 0 15px 0;
  background: #ffffffff;
  padding:10px;
  border-radius:10px;
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.college-visibility h4 {
  margin: 0 0 12px 0;
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 500;
}

.college-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.college-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.college-toggle.active {
  background-color: #2ecc71;
  color: white;
}

.college-toggle.inactive {
  background-color: #e74c3c;
  color: white;
}

.college-toggle:hover {
  opacity: 0.9;
  transform: scale(1.03);
}

.college-name {
  font-weight: 500;
  font-size: 14px;
}

.toggle-indicator {
  font-weight: bold;
  margin-left: 5px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: #7f8c8d;
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

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
  background-color: #f9f9f9;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .visibility-manager {
    padding: 15px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box input {
    min-width: auto;
    width: 100%;
  }
  
  .cards-container {
    grid-template-columns: 1fr;
  }
  
  .college-buttons {
    justify-content: center;
  }
}
        `}
      </style>
    </div>
  );
}