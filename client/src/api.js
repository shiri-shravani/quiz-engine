import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quiz-engine-backend-62zv.onrender.com',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('quiz-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
