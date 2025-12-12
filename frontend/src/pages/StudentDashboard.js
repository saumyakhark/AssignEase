import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get student info from localStorage or location state
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
  const studentName = studentInfo?.studentName || location.state?.studentName;
  const studentYear = studentInfo?.studentYear || location.state?.year;

  const [selectedSubject, setSelectedSubject] = useState("");
  const [notes, setNotes] = useState([]);

  // Subjects for each year
  const yearSubjects = {
    FY: ["Math", "English", "Computer Basics"],
    SY: ["Data Structures", "DBMS", "Operating Systems"],
    TY: ["Networks", "AI", "Web Development"],
  };

  // Load notes for the selected year and subject
  useEffect(() => {
    if (!selectedSubject) return;

    const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredNotes = allNotes.filter(
      (n) => n.year === studentYear && n.subject === selectedSubject
    );
    setNotes(filteredNotes);
  }, [studentYear, selectedSubject]);

  const goToPage = (page) => {
    if (!selectedSubject) {
      alert("Please select a subject first!");
      return;
    }

    navigate(`/student-dashboard/${page}`, {
      state: { studentName, year: studentYear, subject: selectedSubject },
    });
  };

  return (
    <div className="student-dashboard-container">
      <h1 className="dashboard-title">
        Welcome, {studentName} ({studentYear})
      </h1>

      <div className="input-block">
        <label>Subject</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">--Choose Subject--</option>
          {yearSubjects[studentYear].map((subj, i) => (
            <option key={i} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      {selectedSubject && (
        <div className="dashboard-sections">
          {/* Assignments */}
          <div className="dashboard-card" onClick={() => goToPage("assignments")}>
            <h3>Assignments</h3>
            <p>View and submit assignments for {selectedSubject}</p>
          </div>

          {/* Marks / Report */}
          <div className="dashboard-card" onClick={() => goToPage("marks")}>
            <h3>Marks / Report</h3>
            <p>Check your marks uploaded by the teacher.</p>
          </div>

          {/* Notes */}
          <div className="dashboard-card">
            <h3>Notes</h3>
            {notes.length === 0 ? (
              <p>No notes uploaded for {selectedSubject} yet.</p>
            ) : (
              <ul>
                {notes.map((n, i) => (
                  <li key={i}>
                    <a
                      href={n.fileName ? `/uploads/${n.fileName}` : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {n.fileName || "Note"}
                    </a>{" "}
                    - {n.date}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


