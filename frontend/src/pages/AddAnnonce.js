import React, { useState } from 'react';
import { addAnnonce } from '../api/AddAnnonce';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddAnnonce = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Course");
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [creator, setCreator] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [level, setLevel] = useState("");
  const [specialty, setSpecialty] = useState("");

  const streamOptions = {
    "1": ["Scientific", "Literary"],
    "2": ["Literary/Philosophy", "Foreign Languages", "Common Streams"],
    "3": ["Literary/Philosophy", "Foreign Languages", "Common Streams"],
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!title || !description || !type || !level || !specialty || !coverImage || !pdfFile) {
     alert("⚠️ Please fill all required fields!");
     return;
   }

   const formData = new FormData();
   formData.append("titre", title);
   formData.append("description", description);
   formData.append("prix", 0);
   formData.append("type", type);
   formData.append("level", level);       // corrected
   formData.append("specialty", specialty); // corrected
   formData.append("coverImage", coverImage);
   formData.append("pdfFile", pdfFile);

   if (creator) formData.append("creator", creator);
   if (creationDate) formData.append("creationDate", creationDate);

   try {
     await addAnnonce(formData);
     alert("✅ Annonce added successfully!");
     setTitle(""); setDescription(""); setType("Course");
     setCoverImage(null); setPdfFile(null); setLevel(""); setSpecialty("");
     setCreator(""); setCreationDate("");
   } catch (error) {
     alert("❌ Failed to add annonce");
     console.error(error.response?.data || error);
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
              <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea className="form-control" rows="4" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Type *</label>
              <div className="btn-group d-flex" role="group">
                {["Course", "Book", "Resource", "Exam"].map(option => (
                  <button key={option} type="button" className={`btn btn-outline-primary ${type === option ? 'active' : ''}`} onClick={() => setType(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Level *</label>
              <select className="form-select" value={level} onChange={e => {setLevel(e.target.value); setSpecialty("");}} required>
                <option value="">Select Level</option>
                <option value="1">🎓 First Year</option>
                <option value="2">📚 Second Year</option>
                <option value="3">🎯 Third Year</option>
              </select>
            </div>

            {level && (
              <div className="mb-3">
                <label className="form-label">Specialty *</label>
                <select className="form-select" value={specialty} onChange={e => setSpecialty(e.target.value)} required>
                  <option value="">Select Specialty</option>
                  {streamOptions[level].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Cover Image *</label>
              <input type="file" className="form-control" accept="image/*" onChange={e => setCoverImage(e.target.files[0])} required />
            </div>

            <div className="mb-3">
              <label className="form-label">PDF File *</label>
              <input type="file" className="form-control" accept="application/pdf" onChange={e => setPdfFile(e.target.files[0])} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Creator (optional)</label>
              <input type="text" className="form-control" value={creator} onChange={e => setCreator(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Creation Date (optional)</label>
              <input type="date" className="form-control" value={creationDate} onChange={e => setCreationDate(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary w-100">Add Annonce</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddAnnonce;
