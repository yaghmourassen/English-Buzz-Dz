// src/api/Header.js
import axiosInstance from "./axiosConfig";

const fetchUserById = async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser) return null;

  const response = await axiosInstance.get(`/users/${storedUser.id}`);
  return response.data;
};

export default fetchUserById;
