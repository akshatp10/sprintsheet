import { getProjectStages } from '@/lib/db/dbFunctions/stageFunctions';

import { errorMessage, type ApiResponse } from '../types';
import type { GetStagesResponse } from './type';

export const getStagesForProject = async (
  projectId: string,
): Promise<ApiResponse<GetStagesResponse>> => {
  try {
    const stages = await getProjectStages(projectId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched stages',
      data: stages,
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
