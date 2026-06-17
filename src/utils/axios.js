import axios from 'axios';
import env from '@/utils/env';

const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (response) => response.data,
  (error) => {
    if (error.response?.data) {
      error.data = error.response.data;
    }

    return Promise.reject(error);
  },
);

export default api;