
import axios from "axios";

const API_URL = "http://localhost:8080/api/annonces";

// جلب جميع الإعلانات (لا يحتاج توكن)
export const fetchAnnonces = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// جلب إعلان حسب الـ ID
export const fetchAnnonceById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// إضافة إعلان (يحتاج تعديل إذا تستخدم MultipartFile)
export const addAnnonce = async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
