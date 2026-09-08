import {
	createProject,
	getAllProjectsByUser,
	getProjectById,
} from "@/lib/db/dbFunctions/projectFunctions";
import type { ApiResponse } from "../types";
import {
	getProjectMemberRows,
	getUsersByIds,
} from "@/lib/db/dbFunctions/userFunctions";
import type { CreateProjectInput, Project, ProjectMember } from "./types";

export const createNewProject = async (
	input: CreateProjectInput,
): Promise<ApiResponse<Project>> => {
	try {
		const project = await createProject(input);

		return {
			status: 201,
			success: true,
			message: "Successfully created project",
			data: project,
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

export const getProject = async (id: string): Promise<ApiResponse<Project>> => {
	try {
		const project = await getProjectById(id);

		if (!project) {
			return {
				status: 404,
				success: false,
				message: "Project not found",
				data: null,
			};
		}

		return {
			status: 200,
			success: true,
			message: "Successfully fetched project",
			data: project,
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

export const getAllUserProjects = async (
	includeArchived = false,
): Promise<ApiResponse<Project[]>> => {
	try {
		const projects = await getAllProjectsByUser(includeArchived);

		return {
			status: 200,
			success: true,
			message: "Successfully fetched projects",
			data: projects,
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

export const getProjectMembers = async (
	projectId: string,
): Promise<ApiResponse<ProjectMember[]>> => {
	try {
		const members = await getProjectMemberRows(projectId);
		const users = await getUsersByIds(members.map((m) => m.userId));

		const data: ProjectMember[] = members.map((m, i) => ({
			id: m.id,
			projectId: m.projectId,
			userId: m.userId,
			role: m.role,
			name: users[i]?.name ?? "",
			email: users[i]?.email ?? "",
		}));

		return {
			status: 200,
			success: true,
			message: "Successfully fetched members",
			data,
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
