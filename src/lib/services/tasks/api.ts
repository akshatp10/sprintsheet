import {
	createTask,
	getAllTasksByProject,
	updateTask,
} from "@/lib/db/dbFunctions/taskFunctions";

import type { ApiResponse } from "../types";
import type { CreateTaskInput, Task, UpdateTaskInput } from "./types";

export const createNewTask = async (
	input: CreateTaskInput,
): Promise<ApiResponse<Task>> => {
	try {
		const task = await createTask(input);

		return {
			status: 201,
			success: true,
			message: "Successfully created task",
			data: task,
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

export const getAllProjectTasks = async (
	projectId: string,
): Promise<ApiResponse<Task[]>> => {
	try {
		const tasks = await getAllTasksByProject(projectId);

		return {
			status: 200,
			success: true,
			message: "Successfully fetched tasks",
			data: tasks,
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

export const updateExistingTask = async (
	id: string,
	input: UpdateTaskInput,
): Promise<ApiResponse<Task>> => {
	try {
		const task = await updateTask(id, input);

		if (!task) {
			return {
				status: 404,
				success: false,
				message: "Task not found",
				data: null,
			};
		}

		return {
			status: 200,
			success: true,
			message: "Successfully updated task",
			data: task,
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
