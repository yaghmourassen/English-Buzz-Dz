// src/pages/AnnonceDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchAnnonceDetails from "../api/AnnonceDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function AnnonceDetails() {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnonce = async () => {
      try {
        const data = await fetchAnnonceDetails(id);
        setAnnonce(data);
      } catch (err) {
        console.error("Error fetching annonce details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadAnnonce();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!annonce) {
    return (
      <div className="text-center mt-5">
        <h4>No annonce found.</h4>
        <Link to="/" className="btn btn-secondary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  // Fix backend file URLs
  const coverUrl = annonce.coverImage
    ? `http://localhost:8080${annonce.coverImage}`
    : null;

  const pdfUrl = annonce.pdfFile
    ? `http://localhost:8080${annonce.pdfFile}`
    : null;

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row align-items-start">
          {/* Left side: Cover Image */}
          <div className="col-md-6">
            {coverUrl && (
              <img
                src={coverUrl}
                alt={annonce.titre}
                className="img-fluid rounded shadow-sm"
              />
            )}
          </div>

          {/* Right side: Details */}
          <div className="col-md-6">
            <h2 className="fw-bold">{annonce.titre}</h2>
            <p className="text-muted">{annonce.type}</p>

            <p>
              <strong>Description:</strong> {annonce.description}
            </p>
            <p>
              <strong>Level:</strong> {annonce.level}
            </p>
            <p>
              <strong>Specialty:</strong> {annonce.specialty}
            </p>
            <p>
              <strong>Release Date:</strong> {annonce.createdAt}
            </p>
            <p>
              <strong>Author:</strong> {annonce.creator}
            </p>

            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary mt-3"
              >
                📄 View PDF
              </a>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AnnonceDetails;
