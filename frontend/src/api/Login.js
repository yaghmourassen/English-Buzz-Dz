import axios from "axios";

// استبدل localhost برابط Render المباشر
const API_URL = "https://english-buzz-dz-2.onrender.com/api";

const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  // نرجع كائن يحتوي user و token
  return response.data; // { user: {...}, token: "xxxx" }
};

export { loginUser };
