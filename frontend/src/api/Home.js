import axiosInstance from "./axiosConfig"; // استبدل المسار بمسارك الصحيح

const API_URL = "/annonces";

// جلب جميع الإعلانات (هنا يمكنك تركها بدون توكن إذا الـ endpoint عام)
export const fetchAnnonces = async () => {
  const res = await axiosInstance.get(API_URL);
  return res.data;
};

// جلب إعلان حسب الـ ID
export const fetchAnnonceById = async (id) => {
  const res = await axiosInstance.get(`${API_URL}/${id}`);
  return res.data;
};

// إضافة إعلان (يتطلب توكن)
export const addAnnonce = async (formData) => {
  const res = await axiosInstance.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
