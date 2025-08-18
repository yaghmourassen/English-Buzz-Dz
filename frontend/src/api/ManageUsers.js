import axiosInstance from "./axiosConfig";

const API_URL = "/users";

// جلب كل المستخدمين
export const fetchAllUsers = async () => {
  const res = await axiosInstance.get(API_URL);
  return res.data;
};

// جلب مستخدم حسب الـ ID
export const fetchUserById = async (id) => {
  const res = await axiosInstance.get(`${API_URL}/${id}`);
  return res.data;
};

// حذف مستخدم
export const deleteUserById = async (id) => {
  const res = await axiosInstance.delete(`${API_URL}/${id}`);
  return res.data;
};

// تحديث مستخدم (مع MultipartFormData)
export const updateUserById = async (id, formData) => {
  const res = await axiosInstance.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// تسجيل مستخدم جديد (مع صورة)
export const registerUser = async (formData) => {
  const res = await axiosInstance.post(`${API_URL}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
