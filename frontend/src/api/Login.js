import axios from "axios";

const API_URL = "http://localhost:8080/api";

const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  // نرجع كائن يحتوي user و token
  return response.data; // { user: {...}, token: "xxxx" }
};

export { loginUser };
