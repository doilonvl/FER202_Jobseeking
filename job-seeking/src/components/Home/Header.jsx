import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/Header.css";
import "../Styles/Default.css";
import { Person } from "react-bootstrap-icons";

export default function Header() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    nav("/login");
  };

  const toggleMenu = () => {
    console.log("Toggle menu");
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu state:", isMenuOpen);
  };

  return (
    <div id="header">
      <div className="logo-section">
        <Link to="/">
          <img src="/img/Logo.jpg" alt="Logo" style={{ height: "116px" }} />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/">CV</Link>
        <Link to="/">Recruitment company</Link>
        <Link to="/">Job</Link>
        <Link to="/">Job opportunities</Link>
        <Link to="/job-suggestion">Job Suggestion</Link>
      </nav>
      <div className="auth-links">
        {user == null ? (
          <span>
            <Link to="/register">Register</Link>
            <Link to="/login">
              <button className="loginbtn">Login</button>
            </Link>
          </span>
        ) : (
          <>
            <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
              <Person style={{ width: "50px", height: "30px" }} />
            </div>
            {isMenuOpen && (
              <div className="logout-menu">
                <Link className="text-dark" onClick={handleLogout}>
                  Logout
                </Link>
                <Link className="text-dark" to="/profile">
                  User Profile
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
