// src/api/AddAnnonce.js
import axios from 'axios';

export const addAnnonce = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/annonces",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'annonce:", error);
    throw error;
  }
};
