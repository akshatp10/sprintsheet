import { errorMessage, type ApiResponse } from '../types';

import type { GetCurrentUserResponse, GetProjectUsersResponse } from './types';
import axiosInstance from '@/lib/axiosInstance';

export const getCurrent = async (): Promise<ApiResponse<GetCurrentUserResponse>> => {
  try {
    // const user = await getCurrentUser();
    const response = await axiosInstance.get('/users/');

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched current user',
      data: response.data.user,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch current user'),
      data: null,
    };
  }
};

export const getProjectUsers = async (
  projectId: string,
): Promise<ApiResponse<GetProjectUsersResponse>> => {
  try {
    // const users = await getUsersByProject(projectId);
    const response = await axiosInstance.get('/users/project', { params: { projectId } });

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched project users',
      data: response.data.users,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch project users'),
      data: null,
    };
  }
};
