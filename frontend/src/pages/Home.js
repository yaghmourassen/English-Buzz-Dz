import React, { useEffect, useState } from "react";
import { fetchAnnonces } from "../api/Home";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

function Home() {
  const [annonces, setAnnonces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    fetchAnnonces()
      .then((data) => {
        setAnnonces(data);
        console.log("Fetched annonces:", data);
      })
      .catch(console.error);
  }, []);

  const filtered = annonces.filter((a) => {
    const matchesSearch = a.titre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || a.type?.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getTitleByType = () => {
    switch (typeFilter) {
      case "Course": return "🎓 Courses";
      case "Book": return "📚 Books";
      case "Exam": return "📝 Exams";
      case "Resource": return "🎥 Resources";
      default: return "📦 Latest Resources";
    }
  };

  const handleCategoryClick = (typeLabel) => {
    const type = typeLabel.split(" ")[1]; // e.g. "Courses" -> "Course"
    setTypeFilter(type === "All" ? "All" : type.slice(0, -1)); // Remove plural 's'
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
<section className="hero text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">EngyStudy 📚</h1>
          <p className="lead">Explore courses, books, exams, and resources to boost your academic journey.</p>
          <Link to="/add-annonce" className="btn btn-primary mt-3">➕ Add File</Link>
        </div>
      </section>

      {/* Categories */}
<section className="categories-section py-4">
        <div className="container">
          <div className="row text-center">
            {["🎓 Courses", "📚 Books", "📝 Exams", "🎥 Resources"].map((cat, idx) => (
              <div
                className={`col-md-3 mb-4 category-box clickable ${typeFilter === cat.split(" ")[1].slice(0, -1) ? 'active' : ''}`}
                key={idx}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="search-bar py-4">
        <div className="container d-flex flex-column flex-md-row gap-3">
          <input
            className="form-control"
            placeholder="🔍 Search for resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Course">Courses</option>
            <option value="Book">Books</option>
            <option value="Exam">Exams</option>
            <option value="Resource">Resources</option>
          </select>
        </div>
      </section>

      {/* Annonces List */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center">{getTitleByType()}</h2>
          <div className="row">
            {filtered.length === 0 ? (
              <p className="text-center text-muted">No matching results found.</p>
            ) : (
              filtered.map((annonce) => (
                <div className="col-md-4 mb-4" key={annonce.id}>
                  <div className="card h-100 shadow-sm">
                    {annonce.coverImage && (
                      <img
                        src={`http://localhost:8080${annonce.coverImage}`}
                        className="card-img-top"
                        alt={annonce.titre}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{annonce.titre}</h5>
                      <p className="card-text">{annonce.description?.slice(0, 100)}...</p>

                      <p className="card-text fw-bold">
                        {annonce.prix === 0 ? "Free" : `${annonce.prix} DA`}
                      </p>

                      {annonce.auteur && (
                        <p className="card-text"><strong>Author:</strong> {annonce.auteur}</p>
                      )}
                      {annonce.dateCreation && (
                        <p className="card-text">
                          <strong>Created:</strong> {new Date(annonce.dateCreation).toLocaleDateString()}
                        </p>
                      )}
                      {annonce.specialite && (
                        <p className="card-text"><strong>Speciality:</strong> {annonce.specialite}</p>
                      )}
                      {annonce.niveau && (
                        <p className="card-text"><strong>Level:</strong> {annonce.niveau}</p>
                      )}

                      <div className="text-warning mb-2">
                        {"★".repeat(4)}<span className="text-muted">★</span>
                      </div>

                      <span className="badge bg-secondary mb-2">{annonce.type}</span>

                      <div className="mt-auto">
                        {annonce.pdfFile && (
                          <a
                            href={`http://localhost:8080${annonce.pdfFile}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            View PDF
                          </a>
                        )}
                        <Link to={`/annonce/${annonce.id}`} className="btn btn-sm btn-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
