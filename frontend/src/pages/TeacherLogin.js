import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherLogin.css";
import logo from "../assets/birla-logo.png";

export default function TeacherLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // You can also add check here for valid teachers
    navigate("/teacher-dashboard");
  };

  return (
    <div className="teacher-login-container">
      <div className="teacher-login-card">

        <img src={logo} alt="Logo" className="teacher-logo" />

        <h2 className="teacher-login-title">Teacher Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="teacher-input"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="teacher-input"
          />

          <button type="submit" className="teacher-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
