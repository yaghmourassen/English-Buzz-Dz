import axios from "axios";

const API_URL = "http://localhost:8080/api";

const fetchUserById = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("Aucun ID utilisateur trouvé.");

  const response = await axios.get(`${API_URL}/users/${userId}`, {
    withCredentials: true,
  });

  return response.data;
};

export default fetchUserById;
