import {
  createTask,
  getAllTasksByProject,
  getBacklogTasksByProject,
  getCycleTasksByProject,
  getTasksByCycle,
  updateTask,
} from '@/lib/db/dbFunctions/taskFunctions';

import { errorMessage, type ApiResponse } from '../types';

import type {
  CreateTaskRequest,
  CreateTaskResponse,
  GetBacklogTasksResponse,
  GetCycleTasksResponse,
  GetProjectCycleTasksResponse,
  GetProjectTasksResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from './types';

export const createNewTask = async (
  input: CreateTaskRequest,
): Promise<ApiResponse<CreateTaskResponse>> => {
  try {
    const task = await createTask(input);

    return {
      status: 201,
      success: true,
      message: 'Successfully created task',
      data: task,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to create task'),
      data: null,
    };
  }
};

export const getAllProjectTasks = async (
  projectId: string,
): Promise<ApiResponse<GetProjectTasksResponse>> => {
  try {
    const tasks = await getAllTasksByProject(projectId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched tasks',
      data: tasks,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch tasks for project'),
      data: null,
    };
  }
};

export const getAllProjectBacklogTasks = async (
  projectId: string,
): Promise<ApiResponse<GetBacklogTasksResponse>> => {
  try {
    const tasks = await getBacklogTasksByProject(projectId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched backlog tasks',
      data: tasks,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch backlog tasks for project'),
      data: null,
    };
  }
};

export const getAllCycleTasks = async (
  cycleId: string,
): Promise<ApiResponse<GetCycleTasksResponse>> => {
  try {
    const tasks = await getTasksByCycle(cycleId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched cycle tasks',
      data: tasks,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch tasks for cycle'),
      data: null,
    };
  }
};

export const getAllProjectCycleTasks = async (
  projectId: string,
): Promise<ApiResponse<GetProjectCycleTasksResponse>> => {
  try {
    const tasks = await getCycleTasksByProject(projectId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched cycle tasks',
      data: tasks,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch cycle tasks for project'),
      data: null,
    };
  }
};

export const updateExistingTask = async ({
  id,
  updates,
}: UpdateTaskRequest): Promise<ApiResponse<UpdateTaskResponse>> => {
  try {
    const task = await updateTask(id, updates);

    if (!task) {
      return {
        status: 404,
        success: false,
        message: 'Task not found',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully updated task',
      data: task,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to update task'),
      data: null,
    };
  }
};
