import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function AnnonceDetails() {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/annonces/${id}`)
      .then(res => setAnnonce(res.data))
      .catch(err => console.error("Error fetching annonce details:", err));
  }, [id]);

  if (!annonce) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            {annonce.coverImage && (
              <img
                src={`http://localhost:8080${annonce.coverImage}`}
                alt="Cover"
                className="img-fluid rounded shadow-sm"
              />
            )}
          </div>

          <div className="col-md-6">
            <h2>{annonce.titre}</h2>
            <p className="text-muted">{annonce.type}</p>
            <p><strong>Description:</strong> {annonce.description}</p>
            <p><strong>Price:</strong> {annonce.prix === 0 ? "Free" : `${annonce.prix} DA`}</p>
            <p><strong>Level:</strong> {annonce.level || "Not specified"}</p>
            <p><strong>Specialty:</strong> {annonce.specialty || "Not specified"}</p>
            <p><strong>Release Date:</strong> {annonce.creationDate || "Unknown"}</p>
            <p><strong>Author:</strong> {annonce.creator || "Unknown"}</p>

            {annonce.pdfFile && (
              <a
                href={`http://localhost:8080${annonce.pdfFile}`}
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
