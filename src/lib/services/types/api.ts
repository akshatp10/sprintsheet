import { getAllTypesByProject, getType } from '@/lib/db/dbFunctions/typeFunctions';

import { errorMessage, type ApiResponse } from '../types';

import type { Type } from './types';

export const getProjectTypesById = async (projectId: string): Promise<ApiResponse<Type[]>> => {
  try {
    const types = await getAllTypesByProject(projectId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched project types',
      data: types,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch types for project'),
      data: null,
    };
  }
};

export const getTypeById = async (typeId: string): Promise<ApiResponse<Type>> => {
  try {
    const type = await getType(typeId);

    if (!type) {
      return {
        status: 404,
        success: false,
        message: 'Type not found',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched type',
      data: type,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch type'),
      data: null,
    };
  }
};
