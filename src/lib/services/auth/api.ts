import axiosInstance from '@/lib/axiosInstance';
import type { AuthLoginRequest, AuthRegisterRequest, AuthResponse } from './types';

export const loginUser = async (requestPayload: AuthLoginRequest): Promise<AuthResponse> => {
  const data = {
    email: requestPayload.email,
    password: requestPayload.password,
  };

  const response = await axiosInstance.post('/auth/login', data, {});

  return response.data;
};

export const registerUser = async (requestPayload: AuthRegisterRequest): Promise<AuthResponse> => {
  const data = {
    name: requestPayload.name,
    email: requestPayload.email,
    password: requestPayload.password,
  };

  const response = await axiosInstance.post('/auth/register', data, {});

  return response.data;
};

export const googleOAuthLogin = async (idToken: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/google', { idToken }, {});

  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post('/auth/logout', {});

  return response.data;
};
