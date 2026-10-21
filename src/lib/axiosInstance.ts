import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find((cookie) => cookie.startsWith('token='))
            ?.split('=')
            .slice(1)
            .join('=')
        : undefined;

    if (token) {
      config.headers.Authorization = `Bearer ${decodeURIComponent(token)}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   if (typeof document !== 'undefined') {
    //     document.cookie = 'token=; path=/; max-age=0';
    //   }

    //   if (typeof window !== 'undefined') {
    //     window.location.href = '/auth/login';
    //   }
    // } else if (error.response?.status === 403) {
    //   console.error('Access forbidden');
    // } else if (error.response?.status >= 500) {
    //   console.error('Server error:', error.response?.data?.message || 'Internal server error');
    // }

    return Promise.reject(error);
  },
);

export default axiosInstance;
