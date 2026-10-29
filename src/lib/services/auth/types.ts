import { loginSchema, registerSchema } from '@/features/auth/types/authFormData';
import { z } from 'zod';
import type { ApiResponse } from '../types';

export type AuthRegisterRequest = Omit<z.infer<typeof registerSchema>, 'confirmPassword'>;
export type AuthLoginRequest = z.infer<typeof loginSchema>;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthData {
  user: AuthUser;
  token: { accessToken: string };
}

// Response types
export type AuthResponse = ApiResponse<AuthData>;
