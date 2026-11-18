import { getProjectStages } from '@/lib/db/dbFunctions/stageFunctions';

import { errorMessage, type ApiResponse } from '../types';
import type { GetStagesResponse } from './type';
import axiosInstance from '@/lib/axiosInstance';

export const getStagesForProject = async (
  projectId: string,
): Promise<ApiResponse<GetStagesResponse>> => {
  try {
    // const stages = await getProjectStages(projectId);
    const response = await axiosInstance.post('/stages/getAllProjectStages', { projectId });

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched stages',
      data: response.data.projectStages,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch stages for project'),
      data: null,
    };
  }
};
