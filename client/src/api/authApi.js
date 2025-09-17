import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(email, password) {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  } catch (error) {
    throw error;
  }
}

export async function register(name, email, password) {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/signup`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    throw error;
  }
}

export async function checkLoggedIn() {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/checkAuth`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return { loggedIn: false };
  }
}
