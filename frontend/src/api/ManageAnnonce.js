// src/api/ManageAnnonces.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/annonces';

// Fetch all annonces
export const fetchAllAnnonces = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Delete a specific annonce by ID
export const deleteAnnonceById = async (id) => {
  if (!id) throw new Error("Annonce ID is missing");
  await axios.delete(`${BASE_URL}/${id}`);
};

// Fetch a single annonce by ID
export const fetchAnnonceById = async (id) => {
  if (!id) throw new Error("Annonce ID is missing");
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Update an annonce
export const updateAnnonceById = async (id, formData) => {
  if (!id) throw new Error("Annonce ID is missing");
  const response = await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// Create a new annonce
export const createAnnonce = async (formData) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
