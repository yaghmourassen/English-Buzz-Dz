import axios from 'axios';

// استبدل localhost برابط Render المباشر
const API_URL = "http://localhost:8080/api"; // local Spring Boot backend

export const addAnnonce = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // الحصول على التوكن
    const response = await axios.post(
      `${API_URL}/annonces`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'annonce:", error);
    throw error;
  }
};
