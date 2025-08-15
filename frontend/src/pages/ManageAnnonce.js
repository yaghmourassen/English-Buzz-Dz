// src/pages/ManageAnnonces.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAllAnnonces, deleteAnnonceById, updateAnnonceById } from '../api/ManageAnnonce';
import '../styles/ManageAnnonce.css';

const ManageAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [search, setSearch] = useState('');

  // For editing
  const [editingId, setEditingId] = useState(null);
  const [editTitre, setEditTitre] = useState('');
  const [editType, setEditType] = useState('');
  const [editLevel, setEditLevel] = useState('');
  const [editSpecialty, setEditSpecialty] = useState('');
  const [editCoverImage, setEditCoverImage] = useState(null);
  const [editPdfFile, setEditPdfFile] = useState(null);
  const [existingPdfFile, setExistingPdfFile] = useState(null);

  const typeOptions = ["Course", "Book", "Resource", "Exam"];
  const streamOptions = {
    "1": ["Scientific", "Literary"],
    "2": ["Literary/Philosophy", "Foreign Languages", "Common Streams"],
    "3": ["Literary/Philosophy", "Foreign Languages", "Common Streams"]
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      const data = await fetchAllAnnonces();
      setAnnonces(data);
    } catch (error) {
      console.error('Error fetching annonces:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this annonce?")) {
      try {
        await deleteAnnonceById(id);
        fetchAnnonces();
      } catch (error) {
        console.error("Error deleting annonce:", error);
      }
    }
  };

  const startEdit = (annonce) => {
    setEditingId(annonce.id);
    setEditTitre(annonce.titre || '');
    setEditType(annonce.type || '');
    setEditLevel(annonce.level || '');
    setEditSpecialty(annonce.specialty || '');
    setEditCoverImage(null);
    setEditPdfFile(null);
    setExistingPdfFile(annonce.pdfFile || null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    const formData = new FormData();
    formData.append("titre", editTitre);
    formData.append("type", editType);
    formData.append("level", editLevel);
    formData.append("specialty", editSpecialty);

    if (editCoverImage) formData.append("coverImage", editCoverImage);
    if (editPdfFile) {
      formData.append("pdfFile", editPdfFile);
    } else if (existingPdfFile) {
      formData.append("existingPdfFile", existingPdfFile);
    }

    try {
      await updateAnnonceById(editingId, formData);
      setEditingId(null);
      fetchAnnonces();
    } catch (error) {
      console.error("Error updating annonce:", error);
    }
  };

  const filteredAnnonces = annonces.filter((annonce) => {
    const titre = annonce?.titre?.toLowerCase() || "";
    const type = annonce?.type?.toLowerCase() || "";
    const level = annonce?.level?.toLowerCase() || "";
    const query = search.toLowerCase();
    return titre.includes(query) || type.includes(query) || level.includes(query);
  });

  return (
    <>
      <Header />
      <section className="manage-users-section">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">📢 Manage Annonces</h2>

          <div className="mb-4 d-flex justify-content-end">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search by title, type, or level..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredAnnonces.length === 0 ? (
            <p className="text-center text-muted">No annonces found.</p>
          ) : (
            <div className="table-responsive shadow rounded">
              <table className="table table-striped align-middle mb-0 bg-white dark-table">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>#</th>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Level</th>
                    <th>Specialty</th>
                    <th>PDF</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAnnonces.map((annonce, index) => (
                    <tr key={annonce.id}>
                      <td>{index + 1}</td>
                      <td>
                        {annonce.coverImage && (
                          <img
                            src={`http://localhost:8080${annonce.coverImage}`}
                            alt={annonce.titre}
                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                          />
                        )}
                      </td>
                      <td>{annonce.titre}</td>
                      <td>{annonce.type}</td>
                      <td>{annonce.level}</td>
                      <td>{annonce.specialty}</td>
                      <td>
                        {annonce.pdfFile && (
                          <a href={`http://localhost:8080${annonce.pdfFile}`} target="_blank" rel="noopener noreferrer">
                            📄 PDF
                          </a>
                        )}
                      </td>
                      <td>
                        {editingId === annonce.id ? (
                          <form onSubmit={handleUpdate} className="d-flex flex-column gap-2">
                            <input className="form-control form-control-sm" value={editTitre} onChange={e => setEditTitre(e.target.value)} required />

                            <select className="form-select form-select-sm" value={editType} onChange={e => setEditType(e.target.value)} required>
                              <option value="">Select Type</option>
                              {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>

                            <select className="form-select form-select-sm" value={editLevel} onChange={e => {setEditLevel(e.target.value); setEditSpecialty("");}} required>
                              <option value="">Select Level</option>
                              <option value="1">🎓 First Year</option>
                              <option value="2">📚 Second Year</option>
                              <option value="3">🎯 Third Year</option>
                            </select>

                            {editLevel && (
                              <select className="form-select form-select-sm" value={editSpecialty} onChange={e => setEditSpecialty(e.target.value)} required>
                                <option value="">Select Specialty</option>
                                {streamOptions[editLevel].map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            )}

                            <input type="file" className="form-control form-control-sm" accept="image/*" onChange={e => setEditCoverImage(e.target.files[0])} />
                            <input type="file" className="form-control form-control-sm" accept="application/pdf" onChange={e => setEditPdfFile(e.target.files[0])} />

                            <button type="submit" className="btn btn-sm btn-success mt-1">Save</button>
                            <button type="button" className="btn btn-sm btn-secondary mt-1" onClick={() => setEditingId(null)}>Cancel</button>
                          </form>
                        ) : (
                          <>
                            <button className="btn btn-sm btn-primary me-2" onClick={() => startEdit(annonce)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(annonce.id)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ManageAnnonces;
