// src/services/auth.jsx

import axios from "axios";

export async function loginUser({ user, password }) {
  const response = await axios.post("http://localhost:3001/auth/login", {
    user,
    password,
  });
  return response.data;
}
