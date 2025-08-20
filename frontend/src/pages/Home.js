import React, { useEffect, useState } from "react";
import { fetchAnnonces } from "../api/Home";
import fetchUserById from "../api/Header";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet-async";
import '../styles/Home.css';

// ضع هنا رابط الـ backend على Render
const API_BASE_URL = "https://english-buzz-dz-2.onrender.com";

function Home() {
  const [annonces, setAnnonces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [yearFilter, setYearFilter] = useState(null);
  const [streamFilter, setStreamFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAnnonces()
      .then(setAnnonces)
      .catch(console.error);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const filtered = annonces.filter(a => {
    const matchesSearch = a.titre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !yearFilter || a.level === yearFilter;
    const matchesStream = !streamFilter || a.specialty === streamFilter;
    const matchesType = typeFilter === "All" || a.type === typeFilter;
    return matchesSearch && matchesYear && matchesStream && matchesType;
  });

  const yearOptions = [
    { value: "1", label: "First Year", icon: "🎓" },
    { value: "2", label: "Second Year", icon: "📚" },
    { value: "3", label: "Third Year", icon: "🎯" },
  ];

  const streamOptions = {
    "1": [
      { value: "Scientific", label: "Scientific", icon: "🔬" },
      { value: "Literary", label: "Literary", icon: "📖" },
    ],
    "2": [
      { value: "Literary/Philosophy", label: "Literary/Philosophy", icon: "📚" },
      { value: "Foreign Languages", label: "Foreign Languages", icon: "🌐" },
      { value: "Common Streams", label: "Common Streams", icon: "🧩" },
    ],
    "3": [
      { value: "Literary/Philosophy", label: "Literary/Philosophy", icon: "📚" },
      { value: "Foreign Languages", label: "Foreign Languages", icon: "🌐" },
      { value: "Common Streams", label: "Common Streams", icon: "🧩" },
    ],
  };

  const typeOptions = [
    { value: "Course", label: "Course", icon: "🎓" },
    { value: "Book", label: "Book", icon: "📚" },
    { value: "Exam", label: "Exam", icon: "📝" },
    { value: "Resource", label: "Files", icon: "📂" },
  ];

  const handleYearClick = y => {
    if (yearFilter === y.value) {
      setYearFilter(null); setStreamFilter(null); setTypeFilter("All");
    } else {
      setYearFilter(y.value); setStreamFilter(null); setTypeFilter("All");
    }
  };

  const handleStreamClick = s => {
    if (streamFilter === s.value) {
      setStreamFilter(null); setTypeFilter("All");
    } else {
      setStreamFilter(s.value); setTypeFilter("All");
    }
  };

  const loadMore = () => { setVisibleCount(filtered.length); setExpanded(true); };
  const viewLess = () => { setVisibleCount(6); setExpanded(false); };

  const handleHomeClick = () => {
    setYearFilter(null);
    setStreamFilter(null);
    setTypeFilter("All");
    setSearchTerm("");
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>English Buzz DZ - Massi</title>
        <meta name="description" content="English Buzz DZ: Buzzing With English Ideas! Explore courses, books, exams, and files for your academic journey." />
        <meta name="keywords" content="English Buzz, English resources, courses, books, exams, learning, DZ, Massi" />
      </Helmet>

      <Header />

      <section className="hero text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold clickable">English Buzz DZ 📚</h1>
          <p className="lead">Buzzing With English Ideas! 💡</p>
          {user && user.role === "ADMIN" && (
            <Link to="/add-annonce" className="btn btn-primary mt-3">➕ Add File</Link>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-4">
        <div className="container">
          <div className="row text-center">
            {!yearFilter && yearOptions.map(y => (
              <div key={y.value} className="col-6 col-md-4 mb-4">
                <div className="category-box clickable" onClick={() => handleYearClick(y)}>
                  <div style={{ fontSize: "2.5rem" }}>{y.icon}</div>
                  <span>{y.label}</span>
                </div>
              </div>
            ))}

            {yearFilter && !streamFilter && streamOptions[yearFilter].map((s, idx) => (
              <div key={s.value} className={`${yearFilter==="1"?"col-6 col-md-6":"col-md-4"} mb-4`}>
                <div className="category-box clickable" onClick={() => handleStreamClick(s)}>
                  <div style={{ fontSize: "2.5rem" }}>{s.icon}</div>
                  <span>{s.label}</span>
                </div>
              </div>
            ))}

            {yearFilter && streamFilter && typeOptions.map(t => (
              <div key={t.value} className="col-md-3 mb-4">
                <div className="category-box clickable" onClick={() => setTypeFilter(t.value)}>
                  <div style={{ fontSize: "2.5rem" }}>{t.icon}</div>
                  <span>{t.label}</span>
                </div>
              </div>
            ))}

            {(streamFilter || yearFilter || typeFilter!=="All" || searchTerm) && (
              <div className="col-12 mb-4 text-center d-flex justify-content-center gap-3">
                <div onClick={()=>{ if(typeFilter!=="All") setTypeFilter("All"); else if(streamFilter) setStreamFilter(null); else setYearFilter(null); }} style={{cursor:"pointer",color:"#0d6efd"}}>🔙 Back</div>
                <div onClick={()=>{ setYearFilter(null); setStreamFilter(null); setTypeFilter("All"); setSearchTerm(""); }} style={{cursor:"pointer",color:"#dc3545"}}>🧹 Clear</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-bar py-4">
        <div className="container d-flex flex-column flex-md-row gap-3">
          <input className="form-control" placeholder="🔍 Search for files..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
        </div>
      </section>

      {/* Files / Annonces Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center">{yearFilter ? streamFilter || "Select Stream" : "All Files"}</h2>
          <div className="row">
            {filtered.length===0 ? <p className="text-center text-muted">No matching results found.</p> :
              filtered.slice(0, visibleCount).map(a=>(
                <div className="col-md-4 mb-4" key={a.id}>
                  <div className="card h-100 shadow-sm rounded-3 overflow-hidden">
                    {a.coverImage && <img src={`${API_BASE_URL}${a.coverImage}`} className="card-img-top" alt={a.titre} style={{height:"200px",objectFit:"cover"}} />}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{a.titre}</h5>
                      <p className="card-text">{a.description?.slice(0,100)}...</p>
                      <div className="mt-auto d-flex gap-2 flex-wrap">
                        {a.pdfFile && <a href={`${API_BASE_URL}${a.pdfFile}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">View PDF</a>}
                        <Link to={`/annonce/${a.id}`} className="btn btn-sm btn-primary">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="text-center mt-3">
            {!expanded && visibleCount<filtered.length && <button className="btn btn-outline-primary" onClick={loadMore}>⬇️ Load More</button>}
            {expanded && <button className="btn btn-outline-secondary" onClick={viewLess}>🔼 View Less</button>}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
