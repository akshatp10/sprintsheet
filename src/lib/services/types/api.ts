import { getAllTypesByProject, getType } from '@/lib/db/dbFunctions/typeFunctions';

import { errorMessage, type ApiResponse } from '../types';

import type { GetProjectTypesResponse, GetTypeResponse } from './types';
import axiosInstance from '@/lib/axiosInstance';

export const getProjectTypesById = async (
  projectId: string,
): Promise<ApiResponse<GetProjectTypesResponse>> => {
  try {
    // const types = await getAllTypesByProject(projectId);
    const response = await axiosInstance.post('/types/getAllProjectSTypes', { projectId }, {});

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched project types',
      data: response.data.projectTypes,
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

export const getTypeById = async (typeId: string): Promise<ApiResponse<GetTypeResponse>> => {
  try {
    // const type = await getType(typeId);
    const response = await axiosInstance.post('/types/getTypeById', { typeId });

    if (!response) {
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
      data: response.data.type,
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
