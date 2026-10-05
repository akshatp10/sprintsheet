export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T | null;
}

export const errorMessage = (error: unknown, fallback = 'Internal Server Error') =>
  error instanceof Error ? error.message : fallback;
