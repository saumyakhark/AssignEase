import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./StudentAssignment.css";

export default function StudentAssignment() {
  const location = useLocation();
  const { year, subject, studentName } = location.state || {};

  const [assignments, setAssignments] = useState([]);
  const [studentAnswer, setStudentAnswer] = useState("");

  useEffect(() => {
    const savedAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];
    const filtered = savedAssignments.filter(
      (a) => a.year === year && a.subject === subject
    );
    setAssignments(filtered);
  }, [year, subject]);

  const handleSubmit = () => {
    if (!studentAnswer.trim()) {
      alert("Please type your answer before submitting.");
      return;
    }

    const submissions =
      JSON.parse(localStorage.getItem("student_submissions")) || [];

    submissions.push({
      studentName: studentName || "Student",
      year,
      subject,
      answer: studentAnswer,
      submittedAt: new Date().toLocaleString(),
      marks: null,
      status: "Submitted",
    });

    localStorage.setItem(
      "student_submissions",
      JSON.stringify(submissions)
    );

    setStudentAnswer("");
    alert("Assignment submitted successfully!");
  };

  const disableCopyPaste = (e) => {
    e.preventDefault();
    alert("Copy & Paste is disabled. Please type the answer manually.");
  };

  return (
    <div className="assign-page-container">
      <h2 className="assign-title">
        Assignment - {subject} ({year})
      </h2>

      {assignments.length === 0 && (
        <p className="no-assign-msg">No assignments uploaded yet.</p>
      )}

      {assignments.map((a, i) => (
        <div key={i} className="assign-card">
          <div className="assign-header">
            <h3>{a.subject}</h3>
            <span className="assign-date">{a.date}</span>
          </div>

          {a.text && <p className="assign-text">{a.text}</p>}

          {a.fileData && (
            <a
              href={a.fileData}
              download={a.fileName}
              className="assign-download-btn"
            >
              Download Attached File
            </a>
          )}
        </div>
      ))}

      <div className="typing-area">
        <h3>Write Your Assignment Below</h3>

        <textarea
          className="assignment-editor"
          value={studentAnswer}
          onChange={(e) => setStudentAnswer(e.target.value)}
          onCopy={disableCopyPaste}
          onCut={disableCopyPaste}
          onPaste={disableCopyPaste}
          placeholder="Start typing your assignment..."
          rows={10}
        ></textarea>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Assignment
        </button>
      </div>
    </div>
  );
}
