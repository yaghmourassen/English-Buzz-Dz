// src/pages/AnnonceDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AnnonceDetails.css';
import axiosInstance from "../api/axiosConfig"; // <- use the same instance

const AnnonceDetails = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const res = await axiosInstance.get(`/annonces/${id}`);
        setAnnonce(res.data);
      } catch (err) {
        console.error("Error fetching annonce details:", err);
        setError(err.response?.status === 403
          ? "Access denied. You don't have permission to view this annonce."
          : "Annonce not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonce();
  }, [id]);

  if (loading) return (
    <>
      <Header />
      <div className="container py-5 text-center">
        <h3>Loading...</h3>
      </div>
      <Footer />
    </>
  );

  if (error || !annonce) return (
    <>
      <Header />
      <div className="container py-5 text-center">
        <h3>{error || "Annonce not found"}</h3>
        <Link to="/home" className="btn btn-primary mt-3">Back to Home</Link>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              {annonce.coverImage && (
                <img
                  src={`http://localhost:8080${annonce.coverImage}`}
                  className="card-img-top"
                  alt={annonce.titre}
                  style={{ objectFit: "cover", maxHeight: "400px" }}
                />
              )}
              <div className="card-body">
                <h2 className="card-title mb-3">{annonce.titre}</h2>
                <p className="card-text mb-2"><strong>Description:</strong> {annonce.description}</p>
                <p className="card-text mb-2"><strong>Type:</strong> {annonce.type}</p>
                <p className="card-text mb-2"><strong>Level:</strong> {annonce.level}</p>
                <p className="card-text mb-2"><strong>Specialty:</strong> {annonce.specialty}</p>

                {annonce.pdfFile && (
                  <div className="mt-3">
                    <h5>PDF Preview:</h5>
                    <iframe
                      src={`http://localhost:8080${annonce.pdfFile}`}
                      width="100%"
                      height="500px"
                      title="PDF Preview"
                    ></iframe>
                  </div>
                )}

                <Link to="/home" className="btn btn-primary mt-4">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AnnonceDetails;
