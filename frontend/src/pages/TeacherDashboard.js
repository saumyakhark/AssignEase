import { useState, useEffect } from "react";
import "./TeacherDashboard.css";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("assignment");

  const subjectsByYear = {
    FY: ["Math", "English", "Computer Basics"],
    SY: ["Data Structures", "DBMS", "Operating Systems"],
    TY: ["Networks", "AI", "Web Development"],
  };

  // ---- Assignment States ----
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [assignmentText, setAssignmentText] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [assignments, setAssignments] = useState([]);

  // ---- Notes States ----
  const [noteFile, setNoteFile] = useState(null);
  const [notes, setNotes] = useState([]);

  // ---- Student Submissions ----
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const savedSubmissions = JSON.parse(localStorage.getItem("student_submissions")) || [];

    setAssignments(savedAssignments);
    setNotes(savedNotes);
    setSubmissions(savedSubmissions);
  }, []);

  // -------- Save Assignment --------
  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!year || !subject || (!assignmentText && !assignmentFile)) {
      alert("Add at least text or file!");
      return;
    }

    const newAssignment = {
      year,
      subject,
      text: assignmentText,
      fileName: assignmentFile ? assignmentFile.name : null,
      date: new Date().toLocaleDateString(),
    };

    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));

    alert("Assignment Posted Successfully!");
    setAssignmentText("");
    setAssignmentFile(null);
  };

  // -------- Save Notes --------
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!year || !subject || !noteFile) {
      alert("Please fill all fields!");
      return;
    }

    const newNote = {
      year,
      subject,
      fileName: noteFile.name,
      date: new Date().toLocaleDateString(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    alert("Note Uploaded Successfully!");
    setNoteFile(null);
  };

  // -------- Update Marks Temporarily in State --------
  const handleMarksChange = (index, value) => {
    const updated = [...submissions];
    updated[index].marks = value; // store temporarily
    setSubmissions(updated);
  };

  // -------- Submit Marks to localStorage --------
  const handleSubmitMarks = () => {
    const updated = submissions.map(s => ({
      ...s,
      marks: Number(s.marks),
      status: "Evaluated"
    }));
    setSubmissions(updated);
    localStorage.setItem("student_submissions", JSON.stringify(updated));
    alert("Marks submitted successfully!");
  };

  return (
    <div className="teacher-dashboard-container">
      {/* -------------------- Side Menu -------------------- */}
      <div className="teacher-sidebar">
        <h2 className="sidebar-title">Teacher Dashboard</h2>

        <button
          onClick={() => setActiveTab("assignment")}
          className={activeTab === "assignment" ? "active-tab" : ""}
        >
          Post Assignment
        </button>

        <button
          onClick={() => setActiveTab("notes")}
          className={activeTab === "notes" ? "active-tab" : ""}
        >
          Upload Notes
        </button>

        <button
          onClick={() => setActiveTab("evaluation")}
          className={activeTab === "evaluation" ? "active-tab" : ""}
        >
          Evaluate Students
        </button>
      </div>

      {/* -------------------- Content Area -------------------- */}
      <div className="teacher-content">

        {/* ------------- POST ASSIGNMENT TAB -------------- */}
        {activeTab === "assignment" && (
          <div className="card">
            <h2>Post Assignment</h2>

            <form onSubmit={handleAddAssignment}>
              <select
                value={year}
                onChange={(e) => { setYear(e.target.value); setSubject(""); }}
                required
              >
                <option value="">Select Year</option>
                <option value="FY">FY</option>
                <option value="SY">SY</option>
                <option value="TY">TY</option>
              </select>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={!year}
                required
              >
                <option value="">Select Subject</option>
                {year && subjectsByYear[year].map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))}
              </select>

              <textarea
                placeholder="Write assignment here..."
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
              ></textarea>

              <input
                type="file"
                onChange={(e) => setAssignmentFile(e.target.files[0])}
              />

              <button type="submit">Submit Assignment</button>
            </form>

            <h3 className="section-title">Posted Assignments</h3>
            {assignments.map((a, i) => (
              <div key={i} className="list-item">
                <b>{a.year} - {a.subject}</b>
                {a.text && <p>{a.text}</p>}
                {a.fileName && <p>📎 File: {a.fileName}</p>}
                <span>{a.date}</span>
              </div>
            ))}
          </div>
        )}

        {/* ------------- UPLOAD NOTES TAB -------------- */}
        {activeTab === "notes" && (
          <div className="card">
            <h2>Upload Notes</h2>

            <form onSubmit={handleAddNote}>
              <select
                value={year}
                onChange={(e) => { setYear(e.target.value); setSubject(""); }}
                required
              >
                <option value="">Select Year</option>
                <option value="FY">FY</option>
                <option value="SY">SY</option>
                <option value="TY">TY</option>
              </select>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={!year}
                required
              >
                <option value="">Select Subject</option>
                {year && subjectsByYear[year].map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))}
              </select>

              <input
                type="file"
                onChange={(e) => setNoteFile(e.target.files[0])}
                required
              />

              <button type="submit">Upload Note</button>
            </form>

            <h3 className="section-title">Uploaded Notes</h3>
            {notes.map((n, i) => (
              <div key={i} className="list-item">
                <b>{n.year} - {n.subject}</b>
                <p>{n.fileName}</p>
                <span>{n.date}</span>
              </div>
            ))}
          </div>
        )}

        {/* ------------- EVALUATION TAB -------------- */}
        {activeTab === "evaluation" && (
          <div className="card">
            <h2>Evaluate Assignments</h2>

            {submissions.length === 0 ? (
              <p>No submissions yet.</p>
            ) : (
              <>
                {submissions.map((s, i) => (
                  <div key={i} className="eval-row">
                    <h4>{s.studentName} | {s.year} | {s.subject}</h4>
                    <p><b>Answer:</b> {s.answer}</p>

                    <input
                      type="number"
                      placeholder="Marks"
                      value={s.marks != null ? s.marks : ""}
                      onChange={(e) => handleMarksChange(i, e.target.value)}
                    />

                    <p>Status: {s.status || "Submitted"}</p>
                  </div>
                ))}

                <button style={{ marginTop: "15px" }} onClick={handleSubmitMarks}>
                  Submit Marks
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}



