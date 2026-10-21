import {
  createCycle,
  deleteCycle,
  getCycleById,
  getCyclesByProject,
  updateCycle,
} from '@/lib/db/dbFunctions/cycleFunctions';

import { errorMessage, type ApiResponse } from '../types';

import type {
  CreateCycleInput,
  CreateCycleResponse,
  DeleteCycleRequest,
  GetCycleResponse,
  GetCyclesResponse,
  UpdateCycleRequest,
  UpdateCycleResponse,
} from './types';

export const createNewCycle = async (
  input: CreateCycleInput,
): Promise<ApiResponse<CreateCycleResponse>> => {
  try {
    const cycle = await createCycle(input);

    return {
      status: 201,
      success: true,
      message: 'Successfully created cycle',
      data: cycle,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to create cycle'),
      data: null,
    };
  }
};

export const getCycle = async (id: string): Promise<ApiResponse<GetCycleResponse>> => {
  try {
    const cycle = await getCycleById(id);

    if (!cycle) {
      return {
        status: 404,
        success: false,
        message: 'Cycle not found',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched cycle',
      data: cycle,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch cycle'),
      data: null,
    };
  }
};

export const getProjectCycles = async (
  projectId: string,
): Promise<ApiResponse<GetCyclesResponse>> => {
  try {
    const cycles = await getCyclesByProject(projectId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched cycles',
      data: cycles,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch cycles'),
      data: null,
    };
  }
};

export const updateExistingCycle = async ({
  id,
  updates,
}: UpdateCycleRequest): Promise<ApiResponse<UpdateCycleResponse>> => {
  try {
    const cycle = await updateCycle(id, updates);

    if (!cycle) {
      return {
        status: 404,
        success: false,
        message: 'Cycle not found',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully updated cycle',
      data: cycle,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to update cycle'),
      data: null,
    };
  }
};

export const deleteExistingCycle = async ({
  id,
}: DeleteCycleRequest): Promise<ApiResponse<null>> => {
  try {
    const deleted = await deleteCycle(id);

    if (!deleted) {
      return {
        status: 404,
        success: false,
        message: 'Cycle not found',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully deleted cycle',
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to delete cycle'),
      data: null,
    };
  }
};
