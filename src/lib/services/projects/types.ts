import type { Stage } from '../stages/type';
import type { Type } from '../types/types';

export type CycleLength = 'default' | 'custom' | 'nocycle';
export type ProjectRole = 'member' | 'admin';

export interface Project {
  id: string;
  name: string;
  description: string;
  cycleLength: 'default' | 'custom' | 'nocycle';
  startingDay: string;
  autoCycle: boolean;
  isArchived: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  name: string;
}

export interface ProjectMemberWithEmail extends ProjectMember {
  email: string;
}

export interface ProjectWithMembers extends Project {
  members: ProjectMember[];
}

export interface ProjectDetails extends Project {
  members: ProjectMember[];
  stages: Stage[];
  types: Type[];
}

// Requests
export interface CreateProjectRequest {
  name: string;
  key: string;
  description?: string;
  cycleLength: CycleLength;
  startingDay?: string;
  autoCycle: boolean;
  invitedPeople?: {
    email: string;
    role: ProjectRole;
  }[];
  stages: {
    name: string;
  }[];
}

// Responses
export type CreateProjectResponse = Project;
export type GetProjectsResponse = ProjectWithMembers[];
export type GetProjectDetailsResponse = ProjectDetails;
export type GetProjectMembersResponse = ProjectMemberWithEmail[];
