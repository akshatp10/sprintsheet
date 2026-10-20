import {
  createProject,
  getAllProjects,
  getProjectDetailsById,
  getProjectMembersByProject,
} from '@/lib/db/dbFunctions/projectFunctions';

import { errorMessage, type ApiResponse } from '../types';

import type {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectDetailsResponse,
  GetProjectMembersResponse,
  GetProjectsResponse,
} from './types';

export const createNewProject = async (
  input: CreateProjectRequest,
): Promise<ApiResponse<CreateProjectResponse>> => {
  try {
    const project = await createProject(input);

    return {
      status: 201,
      success: true,
      message: 'Successfully created project',
      data: project,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to create project'),
      data: null,
    };
  }
};

export const getProjectDetails = async (
  id: string,
): Promise<ApiResponse<GetProjectDetailsResponse>> => {
  try {
    const project = await getProjectDetailsById(id);

    if (!project) {
      return {
        status: 404,
        success: false,
        message: 'Project not found',
        data: null,
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched project',
      data: project,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch project'),
      data: null,
    };
  }
};

export const getProjects = async (
  includeArchived = false,
): Promise<ApiResponse<GetProjectsResponse>> => {
  try {
    const projects = await getAllProjects(includeArchived);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched projects',
      data: projects,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch projects'),
      data: null,
    };
  }
};

export const getProjectMembers = async (
  projectId: string,
): Promise<ApiResponse<GetProjectMembersResponse>> => {
  try {
    const members = await getProjectMembersByProject(projectId);

    return {
      status: 200,
      success: true,
      message: 'Successfully fetched members',
      data: members,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: errorMessage(error, 'Failed to fetch members'),
      data: null,
    };
  }
};
