import {
  createTaskCycle,
  getTaskCyclesByCycle,
  getTaskCyclesByProject,
  getTaskCyclesByTask,
  moveMultipleTasksAcrossCycle,
  moveTaskAcrossCycle,
  updateTaskCycleStage,
} from '@/lib/db/dbFunctions/taskCycleFunctions';

import type { Task } from '../tasks/types';
import { errorMessage, type ApiResponse } from '../types';

import type { CreateTaskCycleInput, TaskCycle, TaskDestination } from './types';

export const createNewTaskCycle = async (
  input: CreateTaskCycleInput,
): Promise<ApiResponse<TaskCycle>> => {
  try {
    const taskCycle = await createTaskCycle(input);

    return {
      status: 201,
      success: true,
      message: 'Successfully created task cycle',
      data: taskCycle,
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

export const updateExistingTaskCycleStage = async (
  taskCycleId: string,
  stageId: string,
): Promise<ApiResponse<TaskCycle>> => {
  try {
    const taskCycle = await updateTaskCycleStage(taskCycleId, stageId);

    return {
      status: 200,
      success: true,
      message: 'Successfully updated task cycle stage',
      data: taskCycle,
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

export const moveTaskToDestination = async (
  taskId: string,
  destination: TaskDestination,
): Promise<ApiResponse<Task>> => {
  try {
    const task = await moveTaskAcrossCycle(taskId, destination);

    return {
      status: 200,
      success: true,
      message: 'Successfully moved task',
      data: task,
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

export const moveMultipleTasksToDestination = async (
  taskIds: string[],
  destination: TaskDestination,
): Promise<ApiResponse<Task[]>> => {
  try {
    const tasks = await moveMultipleTasksAcrossCycle(taskIds, destination);

    return {
      status: 200,
      success: true,
      message: 'Successfully moved tasks',
      data: tasks,
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

export const getCycleTaskCycles = async (cycleId: string): Promise<ApiResponse<TaskCycle[]>> => {
  try {
    const taskCycles = await getTaskCyclesByCycle(cycleId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched cycle task relationships',
      data: taskCycles,
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

export const getTaskTaskCycles = async (taskId: string): Promise<ApiResponse<TaskCycle[]>> => {
  try {
    const taskCycles = await getTaskCyclesByTask(taskId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched task cycle relationships',
      data: taskCycles,
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
): Promise<ApiResponse<TaskCycle[]>> => {
  try {
    const allTaskCycles = await getTaskCyclesByProject(projectId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched task cycle relationships',
      data: allTaskCycles,
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
