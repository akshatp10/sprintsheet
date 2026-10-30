import {
  getCurrentUser,
  getUserById,
  getUsersByIds,
  getUsersByProject,
} from '@/lib/db/dbFunctions/userFunctions';

import { errorMessage, type ApiResponse } from '../types';

import type {
  GetCurrentUserResponse,
  GetProjectUsersResponse,
  GetUserResponse,
  GetUsersResponse,
} from './types';
import axiosInstance from '@/lib/axiosInstance';

export const getUser = async (id: string): Promise<ApiResponse<GetUserResponse>> => {
  try {
    // const user = await getUserById(id);
    const response = await axiosInstance.get('/users/byId', { params: { userId: id } });

    if (!response.data.user) {
      return {
        status: 404,
        success: false,
        message: 'User not found',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched user',
      data: response.data.user,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch user'),
      data: null,
    };
  }
};

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

export const getUsers = async (ids: string[]): Promise<ApiResponse<GetUsersResponse>> => {
  try {
    const users = await getUsersByIds(ids);
    const response = await axiosInstance.post('/users/byIds', { userIds: ids });

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched users',
      data: response.data.users,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch users'),
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
