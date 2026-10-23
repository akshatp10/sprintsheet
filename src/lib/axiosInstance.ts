import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle API errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // Prevent repeated redirects
        if (window.location.pathname !== '/auth/login') {
          localStorage.removeItem('accessToken');

          window.location.replace('/auth/login');
        }
      }
    } else if (error.response?.status === 403) {
      console.error('Access forbidden');
    } else if (error.response?.status >= 500) {
      console.error('Server error:', error.response?.data?.message || 'Internal server error');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
