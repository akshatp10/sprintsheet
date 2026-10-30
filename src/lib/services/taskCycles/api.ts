import {
  createTaskCycle,
  deleteTaskCycle,
  getTaskCycleById,
  getTaskCyclesByCycle,
  getTaskCyclesByProject,
  getTaskCyclesByTask,
  moveMultipleTasksAcrossCycle,
  moveTaskAcrossCycle,
  updateTaskCycleStage,
} from '@/lib/db/dbFunctions/taskCycleFunctions';

import { errorMessage, type ApiResponse } from '../types';

import type {
  CreateTaskCycleRequest,
  CreateTaskCycleResponse,
  DeleteTaskCycleRequest,
  DeleteTaskCycleResponse,
  GetTaskCycleResponse,
  GetTaskCyclesResponse,
  MoveTaskRequest,
  MoveTaskResponse,
  MoveTasksRequest,
  MoveTasksResponse,
  UpdateTaskCycleStageRequest,
  UpdateTaskCycleStageResponse,
} from './types';
import axiosInstance from '@/lib/axiosInstance';

export const createNewTaskCycle = async (
  input: CreateTaskCycleRequest,
): Promise<ApiResponse<CreateTaskCycleResponse>> => {
  try {
    // const taskCycle = await createTaskCycle(input);
    const response = await axiosInstance.post('/taskCycles/createTaskCycle', input, {});

    return {
      status: 201,
      success: true,
      message: 'Successfully created task cycle',
      data: response.data.taskCycle,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to create task cycle'),
      data: null,
    };
  }
};

export const updateExistingTaskCycleStage = async ({
  taskCycleId,
  stageId,
}: UpdateTaskCycleStageRequest): Promise<ApiResponse<UpdateTaskCycleStageResponse>> => {
  try {
    // const taskCycle = await updateTaskCycleStage(taskCycleId, stageId);
    const response = await axiosInstance.patch(
      '/taskCycles/updateTaskCycleStage',
      {
        taskCycleId,
        stageId,
      },
      {},
    );

    return {
      status: 200,
      success: true,
      message: 'Successfully updated task cycle stage',
      data: response.data.taskCycle,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to update task cycle stage'),
      data: null,
    };
  }
};

export const moveTaskToDestination = async ({
  taskId,
  fromCycleId,
  to,
}: MoveTaskRequest): Promise<ApiResponse<MoveTaskResponse>> => {
  try {
    // const task = await moveTaskAcrossCycle(taskId, fromCycleId, to);
    const response = await axiosInstance.patch('/taskCycles/moveTask', { taskId, fromCycleId, to });

    return {
      status: 200,
      success: true,
      message: 'Successfully moved task',
      data: response.data.task,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to move task'),
      data: null,
    };
  }
};

export const moveMultipleTasksToDestination = async ({
  tasks,
  to,
}: MoveTasksRequest): Promise<ApiResponse<MoveTasksResponse>> => {
  try {
    // const moved = await moveMultipleTasksAcrossCycle(tasks, to);
    const response = await axiosInstance.patch('/taskCycles/moveTasks', { tasks, to });

    return {
      status: 200,
      success: true,
      message: 'Successfully moved tasks',
      data: response.data.tasks,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to move tasks'),
      data: null,
    };
  }
};

export const getCycleTaskById = async (id: string): Promise<ApiResponse<GetTaskCycleResponse>> => {
  try {
    // const taskCycle = await getTaskCycleById(id);
    const response = await axiosInstance.get('/taskCycles/getTaskCycle', { params: { id } });

    if (!response) {
      return {
        status: 404,
        success: false,
        message: 'TaskCycle not found',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched task cycle',
      data: response.data.taskCycle,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch task cycle'),
      data: null,
    };
  }
};

export const getCycleTaskCycles = async (
  cycleId: string,
): Promise<ApiResponse<GetTaskCyclesResponse>> => {
  try {
    // const taskCycles = await getTaskCyclesByCycle(cycleId);
    const response = await axiosInstance.get('/taskCycles/getTaskCyclesByCycle', {
      params: { cycleId },
    });

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched task cycles',
      data: response.data.taskCycles,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch task cycles for cycle'),
      data: null,
    };
  }
};

export const getTaskTaskCycles = async (
  taskId: string,
): Promise<ApiResponse<GetTaskCyclesResponse>> => {
  try {
    // const taskCycles = await getTaskCyclesByTask(taskId);
    const response = await axiosInstance.get('/taskCycles/getTaskCyclesByTask', {
      params: { taskId },
    });

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched task cycles',
      data: response.data.taskCycles,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch task cycles for task'),
      data: null,
    };
  }
};

export const getAllTaskCyclesByProject = async (
  projectId: string,
): Promise<ApiResponse<GetTaskCyclesResponse>> => {
  try {
    // const taskCycles = await getTaskCyclesByProject(projectId);
    const response = await axiosInstance.get('/taskCycles/getTaskCyclesByProject', {
      params: { projectId },
    });

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched task cycles',
      data: response.data.taskCycles,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch task cycles for project'),
      data: null,
    };
  }
};

export const deleteTaskCycleById = async ({
  taskId,
  taskCycleId,
}: DeleteTaskCycleRequest): Promise<ApiResponse<DeleteTaskCycleResponse>> => {
  try {
    // const result = await deleteTaskCycle(taskId, taskCycleId);
    const response = await axiosInstance.delete('/taskCycles/deleteTaskCycle', {
      params: { taskId, taskCycleId },
    });

    return {
      status: 200,
      success: true,
      message: taskCycleId
        ? 'Successfully removed task from cycle'
        : 'Successfully deleted backlog task',
      data: response.data.deleted,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to delete task'),
      data: null,
    };
  }
};
