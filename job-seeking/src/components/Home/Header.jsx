import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const nav = useNavigate();
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, [user]); 

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUser(null);
    nav("/login");
  };

  return (
    <div id="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {user ? (
              <Link className="nav-item nav-link" onClick={handleLogout}>Logout</Link>
            ) : (
              <>
                <Link className="nav-item nav-link" to="/login">Login</Link>
                <Link className="nav-item nav-link" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
