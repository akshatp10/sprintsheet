import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const isAuthRequest = (url?: string) => !!url && url.includes('/auth/');

type RetryableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as RetryableRequest | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRequest(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post('/auth/refresh', {});

        const { accessToken } = response.data.data;

        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');

        if (window.location.pathname !== '/auth/login') {
          window.location.replace('/auth/login');
        }

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      console.error('Access forbidden');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    }

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      error.message = error.response.data.message;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
