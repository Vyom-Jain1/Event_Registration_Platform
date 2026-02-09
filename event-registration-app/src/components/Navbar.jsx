import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          🎟️ Event Registration
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/home" className="navbar-link">
              Home
            </Link>
          </li>
          {isAuthenticated() && (
            <li className="navbar-item">
              <Link
                to={isAdmin() ? "/admin/dashboard" : "/dashboard"}
                className="navbar-link navbar-dashboard">
                📊 Dashboard
              </Link>
            </li>
          )}
          {isAuthenticated() ? (
            <>
              <li className="navbar-item">
                <span className="navbar-user">
                  👤 {user?.name || user?.email}
                  {isAdmin() && <span className="admin-badge">ADMIN</span>}
                </span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="navbar-btn-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
