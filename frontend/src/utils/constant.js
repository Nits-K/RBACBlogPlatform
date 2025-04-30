import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/v1";


// export const USER_API_END_POINT = `${BASE_URL}/users`;
// export const BLOG_API_END_POINT = `${BASE_URL}/blog`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
