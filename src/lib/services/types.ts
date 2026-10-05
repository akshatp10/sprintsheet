export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T | null;
}

export const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Internal Server Error';
