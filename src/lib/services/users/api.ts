import {
  getProjectMemberRows,
  getUserById,
  getUsersByIds,
} from '@/lib/db/dbFunctions/userFunctions';

import { errorMessage, type ApiResponse } from '../types';

import type { User } from './types';

export const getUser = async (id: string): Promise<ApiResponse<User>> => {
  try {
    const user = await getUserById(id);

    if (!user) {
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
      data: user,
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

export const getUsers = async (ids: string[]): Promise<ApiResponse<User[]>> => {
  try {
    const users = await getUsersByIds(ids);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched users',
      data: users,
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

export const getProjectUsers = async (projectId: string): Promise<ApiResponse<User[]>> => {
  try {
    const members = await getProjectMemberRows(projectId);

    const userIds = members.map((member) => member.userId);

    if (userIds.length === 0) {
      return {
        status: 200,
        success: true,
        message: 'Successfully fetched project users',
        data: [],
      };
    }

    const users = await getUsersByIds(userIds);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched project users',
      data: users,
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
