import React, { useState } from 'react';
import { addAnnonce } from '../api/AddAnnonce';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddAnnonce = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("book"); // default type
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [creator, setCreator] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [level, setLevel] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titre", title);  // match Java field
    formData.append("prix", price);   // match Java field

    formData.append("description", description);

    formData.append("type", type);
    formData.append("coverImage", coverImage);
    formData.append("pdfFile", pdfFile);

    if (creator) formData.append("creator", creator);
    if (creationDate) formData.append("creationDate", creationDate);
    if (level) formData.append("level", level);
    if (specialty) formData.append("specialty", specialty);

    try {
      await addAnnonce(formData);
      alert("✅ Annonce added successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setType("book");
      setCoverImage(null);
      setPdfFile(null);
      setCreator("");
      setCreationDate("");
      setLevel("");
      setSpecialty("");
    } catch (error) {
      alert("❌ Failed to add annonce");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="card shadow-lg p-4">
          <h2 className="mb-4 text-center text-primary">Add New Annonce</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows="4"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Price (DA) *</label>
              <input
                type="number"
                className="form-control"
                placeholder="0 for free"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Type *</label>
              <div className="btn-group d-flex" role="group">
                {["book", "course", "resource", "exam"].map(option => (
                  <button
                    key={option}
                    type="button"
                    className={`btn btn-outline-primary ${type === option ? 'active' : ''}`}
                    onClick={() => setType(option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Cover Image *</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={e => setCoverImage(e.target.files[0])}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">PDF File *</label>
              <input
                type="file"
                className="form-control"
                accept="application/pdf"
                onChange={e => setPdfFile(e.target.files[0])}
                required
              />
            </div>

            {/* Optional fields */}
            <div className="mb-3">
              <label className="form-label">Creator (optional)</label>
              <input
                type="text"
                className="form-control"
                value={creator}
                onChange={e => setCreator(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Creation Date (optional)</label>
              <input
                type="date"
                className="form-control"
                value={creationDate}
                onChange={e => setCreationDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Level (optional)</label>
              <input
                type="text"
                className="form-control"
                value={level}
                onChange={e => setLevel(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Specialty (optional)</label>
              <input
                type="text"
                className="form-control"
                value={specialty}
                onChange={e => setSpecialty(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Add Annonce
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddAnnonce;
