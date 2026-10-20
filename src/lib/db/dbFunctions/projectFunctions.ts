import db from '../db';
import type { ProjectRow, UserRow } from '../db';
import type {
  CreateProjectRequest,
  ProjectDetails,
  ProjectMember,
  ProjectMemberWithEmail,
  ProjectWithMembers,
} from '@/lib/services/projects/types';

import { createProjectStage, findOrCreateStage, getProjectStages } from './stageFunctions';
import {
  createProjectType,
  DEFAULT_TYPES,
  findOrCreateType,
  getAllTypesByProject,
} from './typeFunctions';
import { findOrCreateUser } from './userFunctions';
import { BACKLOG_STAGE_NAME } from '@/lib/services/stages/type';
import { currentUserEmail } from '@/config/features';

const validateStages = (stages: CreateProjectRequest['stages']) => {
  const names = stages.map((stage) => stage.name);

  if (!names.includes(BACKLOG_STAGE_NAME)) {
    throw new Error(`A project needs a "${BACKLOG_STAGE_NAME}" stage`);
  }

  if (new Set(names).size !== names.length) {
    throw new Error('Stage names must be unique within a project');
  }

  // The last stage becomes the terminal ("done") stage, so it can't be Backlog.
  if (names[names.length - 1] === BACKLOG_STAGE_NAME) {
    throw new Error(`"${BACKLOG_STAGE_NAME}" cannot be the last stage`);
  }
};

export const createProject = async (input: CreateProjectRequest): Promise<ProjectRow> => {
  validateStages(input.stages);
  const now = Date.now();

  const project: ProjectRow = {
    id: crypto.randomUUID(),
    key: input.key,
    nextTaskNumber: 1,
    name: input.name,
    description: input.description ?? '',
    cycleLength: input.cycleLength,
    startingDay: input.startingDay ?? '',
    autoCycle: input.autoCycle,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  };

  await db.transaction(
    'rw',
    [
      db.projects,
      db.users,
      db.projectMembers,
      db.stages,
      db.projectStages,
      db.types,
      db.projectTypes,
    ],
    async () => {
      // Create project
      await db.projects.add(project);

      // Create/find owner
      const owner = await findOrCreateUser(currentUserEmail);

      await db.projectMembers.add({
        id: crypto.randomUUID(),
        projectId: project.id,
        userId: owner.id,
        role: 'admin',
        createdAt: now,
        updatedAt: now,
      });

      // Add invited members
      for (const person of input.invitedPeople ?? []) {
        const user = await findOrCreateUser(person.email);

        await db.projectMembers.add({
          id: crypto.randomUUID(),
          projectId: project.id,
          userId: user.id,
          role: person.role,
          createdAt: now,
          updatedAt: now,
        });
      }

      // Create/reuse global stages
      for (const [index, stageInput] of input.stages.entries()) {
        const stage = await findOrCreateStage(stageInput.name);
        await createProjectStage(project.id, stage, index, index === input.stages.length - 1);
      }

      for (const typeName of DEFAULT_TYPES) {
        const type = await findOrCreateType(typeName);

        await createProjectType(project.id, type.id);
      }
    },
  );

  return project;
};

export const getAllProjects = async (includeArchived = false): Promise<ProjectWithMembers[]> => {
  const all = await db.projects.orderBy('createdAt').reverse().toArray();

  const projects = includeArchived ? all : all.filter((project) => !project.isArchived);

  return Promise.all(
    projects.map(async (project) => {
      const members = await getProjectMembersByProject(project.id);

      return {
        ...project,
        members: members.map(toMember),
      };
    }),
  );
};

export const getProjectMembersByProject = (projectId: string): Promise<ProjectMemberWithEmail[]> =>
  db.transaction('r', [db.projectMembers, db.users], async () => {
    const rows = await db.projectMembers.where('projectId').equals(projectId).toArray();
    const users = await db.users.bulkGet(rows.map((row) => row.userId));

    const usersById = new Map(
      users.filter((user): user is UserRow => user !== undefined).map((user) => [user.id, user]),
    );

    return rows.flatMap((row) => {
      const user = usersById.get(row.userId);

      return user
        ? [
            {
              id: row.id,
              projectId: row.projectId,
              userId: row.userId,
              role: row.role,
              name: user.name,
              email: user.email,
            },
          ]
        : [];
    });
  });

const toMember = ({
  id,
  projectId,
  userId,
  role,
  name,
}: ProjectMemberWithEmail): ProjectMember => ({
  id,
  projectId,
  userId,
  role,
  name,
});

export const getProjectDetailsById = (id: string): Promise<ProjectDetails | undefined> =>
  db.transaction(
    'r',
    [db.projects, db.projectMembers, db.users, db.projectStages, db.projectTypes, db.types],
    async () => {
      const project = await db.projects.get(id);

      if (!project) {
        return undefined;
      }

      const [members, stages, types] = await Promise.all([
        getProjectMembersByProject(id),
        getProjectStages(id),
        getAllTypesByProject(id),
      ]);

      return { ...project, members: members.map(toMember), stages, types };
    },
  );
