import axios from "axios";
import env from "@/utils/env";

const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
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
