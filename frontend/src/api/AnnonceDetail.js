// src/api/annonceDetails.js
import axiosInstance from "./axiosConfig";

const fetchAnnonceDetails = async (id) => {
  if (!id) throw new Error("Annonce ID is missing");
  const res = await axiosInstance.get(`/annonces/${id}`);
  return res.data;
};

export default fetchAnnonceDetails;
