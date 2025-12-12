import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./StudentMarks.css";

export default function StudentMarks() {
  const location = useLocation();
  const stateStudent = location.state?.studentName;
  const stateYear = location.state?.year;
  const stateSubject = location.state?.subject; // optional

  const [studentName, setStudentName] = useState(stateStudent || "");
  const [studentYear, setStudentYear] = useState(stateYear || "");
  const [marksData, setMarksData] = useState([]);

  // Fallback: get from localStorage
  useEffect(() => {
    if (!studentName || !studentYear) {
      const stored = JSON.parse(localStorage.getItem("studentInfo"));
      if (stored) {
        setStudentName(stored.studentName);
        setStudentYear(stored.studentYear);
      }
    }
  }, [studentName, studentYear]);

  // Load marks for this student (filter by name and year)
  useEffect(() => {
    if (!studentName || !studentYear) return;

    const allSubmissions = JSON.parse(localStorage.getItem("student_submissions")) || [];

    const myMarks = allSubmissions.filter(
      (sub) =>
        sub.studentName === studentName &&
        sub.year === studentYear &&
        (stateSubject ? sub.subject === stateSubject : true) // filter by subject if provided
    );

    setMarksData(myMarks);
  }, [studentName, studentYear, stateSubject]);

  if (!studentName || !studentYear) {
    return <p className="no-marks">Student not recognized. Please login again.</p>;
  }

  if (marksData.length === 0) {
    return <p className="no-marks">No evaluated submissions yet for {studentYear}.</p>;
  }

  return (
    <div className="student-marks-container">
      <h2>My Marks - {studentYear}</h2>
      <table className="student-marks-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {marksData.map((s, i) => (
            <tr key={i}>
              <td>{s.subject}</td>
              <td>{s.marks != null ? s.marks : "-"}</td>
              <td>{s.status || "Submitted"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

