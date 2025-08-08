// src/pages/ManageAnnonces.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAllAnnonces, deleteAnnonceById } from '../api/ManageAnnonce';
import '../styles/ManageAnnonce.css';

const ManageAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [search, setSearch] = useState('');

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
    if (window.confirm("Are you sure you want to delete this annonce?")) {
      try {
        await deleteAnnonceById(id);
        fetchAnnonces();
      } catch (error) {
        console.error("Error deleting annonce:", error);
      }
    }
  };

const filteredAnnonces = annonces.filter((annonce) => {
  const title = annonce?.title?.toLowerCase() || "";
  const type = annonce?.type?.toLowerCase() || "";
  const level = annonce?.level?.toLowerCase() || "";
  const query = search.toLowerCase();

  return title.includes(query) || type.includes(query) || level.includes(query);
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
                    <th>Title</th>
                    <th>Type</th>
                    <th>Level</th>
                    <th>Specialty</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAnnonces.map((annonce, index) => (
                    <tr key={annonce._id}>
                      <td>{index + 1}</td>
                      <td>{annonce.title}</td>
                      <td>{annonce.type}</td>
                      <td>{annonce.level}</td>
                      <td>{annonce.specialty}</td>
                      <td>{annonce.price} DA</td>
                      <td>{new Date(annonce.createdAt).toLocaleDateString()}</td>
                      <td>
                        {/* Future: Add edit logic */}
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(annonce._id)}>
                          Delete
                        </button>
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