import axios from 'axios';

const api = axios.create();
api.defaults.baseURL = 'http://ragazzitech.caioragazzi.com';

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error)
});

export default api;
