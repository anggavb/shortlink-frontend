import axios from "axios";
import env from "@/utils/env";

const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

function getPersistedAuthToken() {
  const persistedAuth = localStorage.getItem("persist:auth");

  if (!persistedAuth) {
    return null;
  }

  try {
    const auth = JSON.parse(persistedAuth);
    const token = auth.token ? JSON.parse(auth.token) : null;
    const expiresAt = auth.expiresAt ? JSON.parse(auth.expiresAt) : null;

    if (!token || !expiresAt || new Date(expiresAt).getTime() <= Date.now()) {
      return null;
    }

    return token;
  } catch {
    return null;
  }
}

api.interceptors.request.use(
  (config) => {
    const token = getPersistedAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      message: error.message || "Unable to connect to server.",
      error: "Network Error",
    });
  },
);

export default api;
