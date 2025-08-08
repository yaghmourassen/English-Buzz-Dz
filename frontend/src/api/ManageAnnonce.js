// src/api/ManageAnnonces.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/annonces'; // Adjust if your backend URL is different

// Fetch all annonces
export const fetchAllAnnonces = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Delete a specific annonce by ID
export const deleteAnnonceById = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};

// Optionally: Fetch a single annonce
export const fetchAnnonceById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Optionally: Update an annonce
export const updateAnnonceById = async (id, updatedAnnonce) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedAnnonce);
  return response.data;
};

// Optionally: Add a new annonce
export const createAnnonce = async (formData) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
