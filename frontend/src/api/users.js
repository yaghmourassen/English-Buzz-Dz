import axios from 'axios';

const API_URL = "http://localhost:8080/api/users";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchUsers = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      ...getAuthHeader()
    }
  });
  return response.data;
};

export const addUser = async (user, file) => {
  const formData = new FormData();
  formData.append('user', JSON.stringify(user));
  formData.append('image', file);

  const response = await axios.post(`${API_URL}/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // لا نضيف توكن لأن التسجيل غالبًا مفتوح
    },
  });
  return response.data;
};
