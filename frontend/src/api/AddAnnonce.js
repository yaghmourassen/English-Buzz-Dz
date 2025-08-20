import axios from 'axios';

// استبدل localhost برابط Render المباشر
const API_URL = "https://english-buzz-dz-2.onrender.com/api";

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
