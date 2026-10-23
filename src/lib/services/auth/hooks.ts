import { useMutation } from '@tanstack/react-query';
import type { AuthLoginRequest, AuthRegisterRequest, AuthResponse } from './types';
import { googleOAuthLogin, loginUser, registerUser } from './api';
import useUserStore from '@/store/userStore';

// Post login
export const usePostLogin = () => {
  return useMutation({
    mutationFn: async (input: AuthLoginRequest) => {
      const response: AuthResponse = await loginUser(input);

      if (!response.success || !response.data) {
        throw new Error(response.message);
      }

      localStorage.setItem('accessToken', response.data.token);

      return response.data;
    },

    onSuccess: (data) => {
      useUserStore.getState().setUser({
        userId: data.user.id,
        userName: data.user.name,
        userEmail: data.user.email,
        profilePicURL: null,
      });

      window.location.assign('/');
    },
  });
};

// Post register
export const usePostRegister = () => {
  return useMutation({
    mutationFn: async (input: AuthRegisterRequest) => {
      const response: AuthResponse = await registerUser(input);

      if (!response.success || !response.data) {
        throw new Error(response.message);
      }

      localStorage.setItem('accessToken', response.data.token);

      return response.data;
    },

    onSuccess: (data) => {
      useUserStore.getState().setUser({
        userId: data.user.id,
        userName: data.user.name,
        userEmail: data.user.email,
        profilePicURL: null,
      });

      window.location.assign('/');
    },
  });
};

// Google OAuth login
export const useGoogleOAuthSignIn = () => {
  return useMutation({
    mutationFn: async (idToken: string) => {
      const response: AuthResponse = await googleOAuthLogin(idToken);

      if (!response.success || !response.data) {
        throw new Error(response.message);
      }

      localStorage.setItem('accessToken', response.data.token);

      return response.data;
    },

    onSuccess: (data) => {
      useUserStore.getState().setUser({
        userId: data.user.id,
        userName: data.user.name,
        userEmail: data.user.email,
        profilePicURL: null,
      });

      window.location.assign('/');
    },
  });
};
