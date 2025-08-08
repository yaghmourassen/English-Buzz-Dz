import axios from "axios";

const API_URL = "http://localhost:8080/api";

const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  // ✅ الآن نرجع فقط كائن المستخدم كما هو
  return response.data; // مجرد user object
};

export { loginUser };
