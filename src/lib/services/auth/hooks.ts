import { useMutation } from '@tanstack/react-query';
import type { AuthLoginRequest, AuthRegisterRequest, AuthResponse } from './types';
import { googleOAuthLogin, loginUser, registerUser } from './api';

// Post login
export const usePostLogin = () => {
  return useMutation({
    mutationFn: async (input: AuthLoginRequest) => {
      const response: AuthResponse = await loginUser(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      localStorage.setItem('accessToken', response.data?.token ?? '');
      return response.data;
    },
    onSuccess: () => {
      window.location.assign('/');
    },
  });
};

export const usePostRegister = () => {
  return useMutation({
    mutationFn: async (input: AuthRegisterRequest) => {
      const response: AuthResponse = await registerUser(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      localStorage.setItem('accessToken', response.data?.token ?? '');
      return response.data;
    },
    onSuccess: () => {
      window.location.assign('/');
    },
  });
};

export const useGoogleOAuthSignIn = () => {
  return useMutation({
    mutationFn: async (idToken: string) => {
      const response: AuthResponse = await googleOAuthLogin(idToken);

      if (!response.success) {
        throw new Error(response.message);
      }

      localStorage.setItem('accessToken', response.data?.token ?? '');
      return response.data;
    },

    onSuccess: () => {
      window.location.assign('/');
    },
  });
};
