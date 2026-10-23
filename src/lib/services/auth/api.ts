import axiosInstance from '@/lib/axiosInstance';
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from './types';

export const loginUser = async (requestPayload: AuthLoginRequest): Promise<AuthLoginResponse> => {
  const data = {
    email: requestPayload.email,
    password: requestPayload.password,
  };

  const response = await axiosInstance.post('/auth/login', data, {});

  return response.data;
};

export const registerUser = async (
  requestPayload: AuthRegisterRequest,
): Promise<AuthRegisterResponse> => {
  const data = {
    name: requestPayload.name,
    email: requestPayload.email,
    password: requestPayload.password,
  };

  const response = await axiosInstance.post('/auth/register', data, {});

  return response.data;
};
