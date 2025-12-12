import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentAssignment from "./pages/StudentAssignment";
import StudentMarks from "./pages/StudentMarks";

function App() {
  // For testing, hardcode logged-in student name (replace with real login later)
  const loggedInStudent = "John Doe";

  return (
    <Router>
      <Routes>

        {/* Default Home Page */}
        <Route path="/" element={<Home />} />

        {/* Student Login */}
        <Route path="/student-login" element={<StudentLogin />} />

        {/* Student Dashboard */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route
          path="/student-dashboard/assignments"
          element={<StudentAssignment />}
        />
        <Route
          path="/student-dashboard/marks"
          element={<StudentMarks studentName={loggedInStudent} />}
        />

        {/* Teacher Login */}
        <Route path="/teacher-login" element={<TeacherLogin />} />

        {/* Teacher Dashboard */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
