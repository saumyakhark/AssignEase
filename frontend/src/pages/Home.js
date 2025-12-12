import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">

      {/* Top App Header */}
      <div className="app-header">
        AssignEase
      </div>

      <div className="home-card">
        <h2 className="home-title">Digital Student Platform</h2>
        <p className="home-subtitle">Select your login type</p>

        <div className="home-btns">
          <Link className="home-btn student" to="/student-login">
            Login as Student
          </Link>
          <Link className="home-btn teacher" to="/teacher-login">
            Login as Teacher
          </Link>
        </div>
      </div>

    </div>
  );
}

