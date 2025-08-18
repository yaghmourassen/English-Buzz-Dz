import axiosInstance from "./axiosConfig";

const BASE_URL = "/annonces";

// جلب كل الإعلانات
export const fetchAllAnnonces = async () => {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
};

// حذف إعلان حسب الـ ID
export const deleteAnnonceById = async (id) => {
  if (!id) throw new Error("Annonce ID is missing");
  const res = await axiosInstance.delete(`${BASE_URL}/${id}`);
  return res.data;
};

// جلب إعلان واحد حسب الـ ID
export const fetchAnnonceById = async (id) => {
  if (!id) throw new Error("Annonce ID is missing");
  const res = await axiosInstance.get(`${BASE_URL}/${id}`);
  return res.data;
};

// تحديث إعلان
export const updateAnnonceById = async (id, formData) => {
  if (!id) throw new Error("Annonce ID is missing");
  const res = await axiosInstance.put(`${BASE_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// إنشاء إعلان جديد
export const createAnnonce = async (formData) => {
  const res = await axiosInstance.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
