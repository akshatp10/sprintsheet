import { useMutation } from '@tanstack/react-query';
import type { AuthLoginRequest, AuthRegisterRequest, AuthResponse } from './types';
import { googleOAuthLogin, loginUser, logoutUser, registerUser } from './api';
import useUserStore from '@/store/userStore';

const setTokens = ({ accessToken }: { accessToken: string }) => {
  localStorage.setItem('accessToken', accessToken);
};

// Post login
export const usePostLogin = () => {
  return useMutation({
    mutationFn: async (input: AuthLoginRequest) => {
      const response: AuthResponse = await loginUser(input);

      if (!response.success || !response.data) {
        throw new Error(response.message);
      }

      setTokens({
        accessToken: response?.data?.token?.accessToken,
      });

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

      setTokens({
        accessToken: response?.data?.token?.accessToken,
      });

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

      setTokens({
        accessToken: response?.data?.token?.accessToken,
      });

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

//Logout User
export const useLogOutUser = () => {
  return useMutation({
    mutationFn: async () => {
      const response: AuthResponse = await logoutUser();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
    onSuccess: () => {
      useUserStore.getState().removeUser();
      localStorage.removeItem('accessToken');
      window.location.replace('/auth/login');
    },
  });
};
