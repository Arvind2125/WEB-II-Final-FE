import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Update this with your actual backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Snare API calls
export const snareApi = {
  getAll: () => api.get('/snare'),
  getById: (id: number) => api.get(`/snare/${id}`),
  create: (data: any) => api.post('/snare', data),
  update: (id: number, data: any) => api.put(`/snare/${id}`, data),
  delete: (id: number) => api.delete(`/snare/${id}`),
};

// Tom API calls
export const tomApi = {
  getAll: () => api.get('/tom'),
  getById: (id: number) => api.get(`/tom/${id}`),
  create: (data: any) => api.post('/tom', data),
  update: (id: number, data: any) => api.put(`/tom/${id}`, data),
  delete: (id: number) => api.delete(`/tom/${id}`),
};

// Cymbal API calls
export const cymbalApi = {
  getAll: () => api.get('/cymbal'),
  getById: (id: number) => api.get(`/cymbal/${id}`),
  create: (data: any) => api.post('/cymbal', data),
  update: (id: number, data: any) => api.put(`/cymbal/${id}`, data),
  delete: (id: number) => api.delete(`/cymbal/${id}`),
};

// Auth API calls
export const authApi = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { username: string; email: string; password: string }) => api.post('/auth/register', data),
};

export default api; 