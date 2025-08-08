// src/components/Header.js

import React, { useEffect, useState } from "react";
import fetchUserById from "../api/Header";
import { Link, useNavigate } from "react-router-dom";
import { FaBookOpen, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

import '../styles/theme.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      fetchUserById()
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `http://localhost:8080${url}`;
  };

  return (
    <header className={`navbar navbar-expand-lg shadow-sm px-4 py-3 theme-${theme}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/Home" className="navbar-brand d-flex align-items-center">
          <FaBookOpen className="me-2 fs-3 text-white" />
          <span className="fs-4 fw-bold text-white">EngiStudy</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="d-flex align-items-center mb-2 mb-lg-0 me-lg-3">
            {user ? (
              <>
                {user.imageUrl ? (
                  <img
                    src={getImageUrl(user.imageUrl)}
                    alt="Profile"
                    className="rounded-circle me-2 border border-light"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
                ) : (
                  <FaUserCircle className="text-white fs-3 me-2" />
                )}
                <span className="text-white fw-semibold">
                  {user.firstName} {user.lastName}
                </span>
              </>
            ) : null}
          </div>

          <ul className="navbar-nav">

            {/* Admin Dropdown (if user is admin) */}
            {user?.role === "ADMIN" && (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="badge bg-warning text-dark me-2">Admin</span>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white fw-bold"
                    href="#"
                    id="adminDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Panel
                  </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
                  <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/admin/users">User Management</Link></li>
                  <li><Link className="dropdown-item" to="/admin/annonces">Annonce Management</Link></li> {/* ✅ Replaced Settings */}
                </ul>

                </li>
              </>
            )}

            <li className="nav-item">
              <Link to="/about" className="nav-link text-white">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/help" className="nav-link text-white">Help</Link>
            </li>

            {/* Theme Toggle */}
            <li className="nav-item d-flex align-items-center ms-2" title="Toggle Theme">
              <div onClick={toggleTheme} style={{ cursor: "pointer" }}>
                {theme === "light" ? (
                  <FaMoon className="fs-5 text-white" />
                ) : (
                  <FaSun className="fs-5 text-white" />
                )}
              </div>
            </li>
          </ul>

          {/* Login/Logout Button */}
          <div className="ms-lg-3 mt-2 mt-lg-0">
            {user ? (
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-light btn-sm">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
