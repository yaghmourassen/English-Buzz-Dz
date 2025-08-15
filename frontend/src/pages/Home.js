import React, { useEffect, useState } from "react";
import { fetchAnnonces } from "../api/Home";
import fetchUserById from "../api/Header";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

function Home() {
  const [annonces, setAnnonces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  const [yearFilter, setYearFilter] = useState(null);
  const [streamFilter, setStreamFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    fetchAnnonces()
      .then((data) => setAnnonces(data))
      .catch(console.error);

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      fetchUserById(storedUserId)
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, []);

const filtered = annonces.filter((a) => {
  const matchesSearch = a.titre?.toLowerCase().includes(searchTerm.toLowerCase());

  // Ensure exact match with backend
  const matchesYear = !yearFilter || a.level === yearFilter;
  const matchesStream = !streamFilter || a.specialty === streamFilter;
  const matchesType = typeFilter === "All" || a.type === typeFilter;

  return matchesSearch && matchesYear && matchesStream && matchesType;
});




  const yearOptions = [
    { value: "1", label: "🎓 First Year" },
    { value: "2", label: "📚 Second Year" },
    { value: "3", label: "🎯 Third Year" },
  ];

const streamOptions = {
  "1": [
    { value: "Scientific", label: "🔬 Scientific" },
    { value: "Literary", label: "📖 Literary" },
  ],
  "2": [
    { value: "Literary/Philosophy", label: "📚 Literary/Philosophy" },
    { value: "Foreign Languages", label: "🌐 Foreign Languages" },
    { value: "Common Streams", label: "🧩 Common Streams" },
  ],
  "3": [
    { value: "Literary/Philosophy", label: "📚 Literary/Philosophy" },
    { value: "Foreign Languages", label: "🌐 Foreign Languages" },
    { value: "Common Streams", label: "🧩 Common Streams" },
  ],
};


  const typeOptions = ["Course", "Book", "Exam", "Resource"];

  const handleYearClick = (y) => {
    if (yearFilter === y.value) {
      setYearFilter(null);
      setStreamFilter(null);
      setTypeFilter("All");
    } else {
      setYearFilter(y.value);
      setStreamFilter(null);
      setTypeFilter("All");
    }
  };

  const handleStreamClick = (s) => {
    if (streamFilter === s.value) {
      setStreamFilter(null);
      setTypeFilter("All");
    } else {
      setStreamFilter(s.value);
      setTypeFilter("All");
    }
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">EngyStudy 📚</h1>
          <p className="lead">Explore resources to boost your academic journey.</p>
          {user?.role === "ADMIN" && (
            <Link to="/add-annonce" className="btn btn-primary mt-3">➕ Add File</Link>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-4">
        <div className="container">
          <div className="row text-center">
            {/* Year Selection */}
            {!yearFilter && yearOptions.map((y) => (
              <div
                key={y.value}
                className={`col-md-4 mb-4 category-box clickable ${yearFilter === y.value ? 'active' : ''}`}
                onClick={() => handleYearClick(y)}
              >
                {y.label}
              </div>
            ))}

            {/* Stream Selection */}
            {yearFilter && !streamFilter && streamOptions[yearFilter].map((s, idx) => (
              <div
                key={s.value}
                className={`category-box clickable ${
                  yearFilter === "1" ? "col-6 col-md-6 first-year-stream" : "col-md-4"
                } ${streamFilter === s.value ? 'active' : ''}`}
                onClick={() => handleStreamClick(s)}
              >
                {s.label}
              </div>
            ))}

            {/* Type Selection */}
            {yearFilter && streamFilter && typeOptions.map((t) => (
              <div
                key={t}
                className={`col-md-3 mb-4 category-box clickable ${typeFilter === t ? 'active' : ''}`}
                onClick={() => setTypeFilter(t)}
              >
                {t}
              </div>
            ))}

            {/* Back & Clear Buttons */}
            {(streamFilter || yearFilter || typeFilter !== "All" || searchTerm) && (
              <div className="col-12 mb-4 text-center d-flex justify-content-center gap-3">
                <div
                  onClick={() => {
                    if (typeFilter !== "All") setTypeFilter("All");
                    else if (streamFilter) setStreamFilter(null);
                    else setYearFilter(null);
                  }}
                  style={{ cursor: "pointer", color: "#0d6efd" }}
                >
                  🔙 Back
                </div>

                <div
                  onClick={() => {
                    setYearFilter(null);
                    setStreamFilter(null);
                    setTypeFilter("All");
                    setSearchTerm("");
                  }}
                  style={{ cursor: "pointer", color: "#dc3545" }}
                >
                  🧹 Clear
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-bar py-4">
        <div className="container d-flex flex-column flex-md-row gap-3">
          <input
            className="form-control"
            placeholder="🔍 Search for resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Annonces List */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center">
            {yearFilter ? `${streamFilter || "Select Stream"}` : "All Resources"}
          </h2>
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
