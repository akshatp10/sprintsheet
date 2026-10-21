import { useMutation } from '@tanstack/react-query';
import type { AuthLoginRequest, AuthLoginResponse } from './types';
import { loginUser } from './api';

// Post login
export const usePostLogin = () => {
  return useMutation({
    mutationFn: async (input: AuthLoginRequest) => {
      const response: AuthLoginResponse = await loginUser(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};
