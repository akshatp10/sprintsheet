import {
  getBacklogStageId,
  getProjectStages,
  getTerminalStageId,
} from '@/lib/db/dbFunctions/stageFunctions';

import { errorMessage, type ApiResponse } from '../types';
import type { Stage } from './type';

export const getStagesForProject = async (projectId: string): Promise<ApiResponse<Stage[]>> => {
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

export const getProjectBacklogStageId = async (projectId: string): Promise<ApiResponse<string>> => {
  try {
    const stageId = await getBacklogStageId(projectId);

    if (!stageId) {
      return {
        status: 404,
        success: false,
        message: 'Backlog stage not found for this project',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched backlog stage',
      data: stageId,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch backlog stage'),
      data: null,
    };
  }
};

export const getProjectTerminalStageId = async (
  projectId: string,
): Promise<ApiResponse<string>> => {
  try {
    const stageId = await getTerminalStageId(projectId);

    if (!stageId) {
      return {
        status: 404,
        success: false,
        message: 'Terminal stage not found for this project',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched terminal stage',
      data: stageId,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch terminal stage'),
      data: null,
    };
  }
};
