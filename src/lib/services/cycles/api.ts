import {
	createCycle,
	deleteCycle,
	getCycleById,
	getCyclesByProject,
	updateCycle,
} from "@/lib/db/dbFunctions/cycleFunctions";

import type { ApiResponse } from "../types";

import type { Cycle, CreateCycleInput, UpdateCycleInput } from "./types";

export const createNewCycle = async (
	input: CreateCycleInput,
): Promise<ApiResponse<Cycle>> => {
	try {
		const cycle = await createCycle(input);

		return {
			status: 201,
			success: true,
			message: "Successfully created cycle",
			data: cycle,
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

export const getCycle = async (id: string): Promise<ApiResponse<Cycle>> => {
	try {
		const cycle = await getCycleById(id);

		if (!cycle) {
			return {
				status: 404,
				success: false,
				message: "Cycle not found",
				data: null,
			};
		}

		return {
			status: 200,
			success: true,
			message: "Successfully fetched cycle",
			data: cycle,
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

export const getProjectCycles = async (
	projectId: string,
): Promise<ApiResponse<Cycle[]>> => {
	try {
		const cycles = await getCyclesByProject(projectId);

		return {
			status: 200,
			success: true,
			message: "Successfully fetched cycles",
			data: cycles,
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

export const updateExistingCycle = async (
	id: string,
	input: UpdateCycleInput,
): Promise<ApiResponse<Cycle>> => {
	try {
		const cycle = await updateCycle(id, input);

		if (!cycle) {
			return {
				status: 404,
				success: false,
				message: "Cycle not found",
				data: null,
			};
		}

		return {
			status: 200,
			success: true,
			message: "Successfully updated cycle",
			data: cycle,
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

export const deleteExistingCycle = async (
	id: string,
): Promise<ApiResponse<null>> => {
	try {
		const cycle = await getCycleById(id);

		if (!cycle) {
			return {
				status: 404,
				success: false,
				message: "Cycle not found",
				data: null,
			};
		}

		await deleteCycle(id);

		return {
			status: 200,
			success: true,
			message: "Successfully deleted cycle",
			data: null,
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
