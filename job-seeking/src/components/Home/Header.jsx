import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/Header.css";
import "../Styles/Default.css";
import { Person } from "react-bootstrap-icons";
import axios from "axios";

export default function Header() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const {id} = useParams()
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    if(userData?.id){
        axios
      .get(`http://localhost:9999/CV?userId=${userData?.id}`)
      .then(res => {
        const size = res.data.length;
        size === 0 ? setIsCreate(false):setIsCreate(true);
      })
      .catch(err => console.log(err))
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    nav("/login");
    window.location.reload()
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
        {user?.id === undefined ? <Link to="/login">CV</Link> : (isCreate ?
          <Link to={`/addCv`}>CV</Link>
        :
        <Link to={`/addCv`}>CV</Link>)}
        {/* <Link to="/">Recruitment company</Link> */}
        <Link to="/job">Job</Link>
        {/* <Link to="/">Job opportunities</Link> */}
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
                <Link className="text-dark" to={"/MyResume/" + user.id}>
                 My CV
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
