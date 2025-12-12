import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";
import logo from "../assets/birla-logo.png";

export default function StudentLogin() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!(name && roll && year && password)) {
      alert("Please fill all fields!");
      return;
    }

    // Generate unique session token
    const sessionToken = Date.now() + "-" + Math.random().toString(36).substr(2, 9);

    // Save student info + token
    const studentInfo = {
      studentName: name,
      studentYear: year,
      rollNumber: roll,
      token: sessionToken,
    };
    localStorage.setItem("studentInfo", JSON.stringify(studentInfo));

    navigate("/student-dashboard", { state: { studentName: name, year } });
  };

  return (
    <div className="student-login-container">
      <div className="student-login-card">
        <img src={logo} alt="AssignEase Logo" className="student-login-logo" />
        <h2 className="student-login-title">Student Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Roll Number"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            required
          />
          <select value={year} onChange={(e) => setYear(e.target.value)} required>
            <option value="">Select Year</option>
            <option value="FY">Fist Year</option>
            <option value="SY">Second Year</option>
            <option value="TY">Third Year</option>
          </select>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

