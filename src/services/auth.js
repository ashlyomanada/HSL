import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const register = async (form) => {
  try {
    const response = await axios.post(`${url}/users/register`, form);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (form) => {
  try {
    const response = await axios.post(`${url}/users/login`, form);
    const token = response.data.token;
    const role = response.data.user.role;

    if (token && role) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  const token = sessionStorage.getItem("token");

  await axios.post(
    `${url}/users/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
};
