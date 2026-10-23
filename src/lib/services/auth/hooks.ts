import { useMutation } from '@tanstack/react-query';
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from './types';
import { loginUser, registerUser } from './api';

// Post login
export const usePostLogin = () => {
  return useMutation({
    mutationFn: async (input: AuthLoginRequest) => {
      const response: AuthLoginResponse = await loginUser(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      localStorage.setItem('accessToken', response.data?.token ?? '');
      return response.data;
    },
  });
};

export const usePostRegister = () => {
  return useMutation({
    mutationFn: async (input: AuthRegisterRequest) => {
      const response: AuthRegisterResponse = await registerUser(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      localStorage.setItem('accessToken', response.data?.token ?? '');
      return response.data;
    },
  });
};
