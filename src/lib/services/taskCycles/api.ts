import {
	createTaskCycle,
	getTaskCyclesByCycle,
	getTaskCyclesByTask,
	updateTaskCycle,
} from "@/lib/db/dbFunctions/taskCycleFunctions";

import type { ApiResponse } from "../types";

import type { CreateTaskCycleInput, TaskCycle } from "./types";

export const createNewTaskCycle = async (
	input: CreateTaskCycleInput,
): Promise<ApiResponse<TaskCycle>> => {
	try {
		const taskCycle = await createTaskCycle(input);

		return {
			status: 201,
			success: true,
			message: "Successfully created task cycle",
			data: taskCycle,
		};
	} catch {
		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};

export const updateExistingTaskCycle = async (
	id: string,
	stageId: string,
): Promise<ApiResponse<TaskCycle>> => {
	try {
		const taskCycle = await updateTaskCycle(id, stageId);

		if (!taskCycle) {
			return {
				status: 404,
				success: false,
				message: "Task cycle not found",
				data: null,
			};
		}

		return {
			status: 200,
			success: true,
			message: "Successfully updated task cycle",
			data: taskCycle,
		};
	} catch {
		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};

export const getCycleTaskCycles = async (
	cycleId: string,
): Promise<ApiResponse<TaskCycle[]>> => {
	try {
		const taskCycles = await getTaskCyclesByCycle(cycleId);

		return {
			status: 200,
			success: true,
			message: "Successfully fetched cycle task relationships",
			data: taskCycles,
		};
	} catch {
		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};

export const getTaskTaskCycles = async (
	taskId: string,
): Promise<ApiResponse<TaskCycle[]>> => {
	try {
		const taskCycles = await getTaskCyclesByTask(taskId);

		return {
			status: 200,
			success: true,
			message: "Successfully fetched task cycle relationships",
			data: taskCycles,
		};
	} catch {
		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};
