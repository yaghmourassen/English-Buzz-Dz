import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from './pages/Home';
import Users from "./pages/users";
import AddAnnonce from "./pages/AddAnnonce";
import Help from './pages/Help';
import Contact from './pages/Contact';
import About from './pages/About';
import AnnonceDetails from "./pages/AnnonceDetails";
import ManageUsers from "./pages/ManageUsers";
import ManageAnnonce from "./pages/ManageAnnonce"; // ✅ Import ManageAnnonce
import Dashboard from "./pages/Dashboard"; // ✅ Import Dashboard

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add-annonce" element={<AddAnnonce />} />
      <Route path="/help" element={<Help />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/annonce/:id" element={<AnnonceDetails />} />

      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/annonces" element={<ManageAnnonce />} /> {/* ✅ Replaces Settings */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;
