import db from '../db';
import type { ProjectTypeRow, TypeRow } from '../db';
import type { Type } from '@/lib/services/types/types';

export const DEFAULT_TYPES = [
  'task',
  'bug',
  'feature',
  'improvement',
  'refactor',
  'migration',
  'update',
];

export const findOrCreateType = async (name: string): Promise<TypeRow> => {
  const existing = await db.types.where('name').equals(name).first();

  if (existing) {
    return existing;
  }

  const now = Date.now();

  const type: TypeRow = {
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now,
  };

  await db.types.add(type);

  return type;
};

export const createProjectType = async (
  projectId: string,
  typeId: string,
): Promise<ProjectTypeRow> => {
  const now = Date.now();

  const projectType: ProjectTypeRow = {
    id: crypto.randomUUID(),
    projectId,
    typeId,
    createdAt: now,
    updatedAt: now,
  };

  await db.projectTypes.add(projectType);

  return projectType;
};

export const getAllTypesByProject = (projectId: string): Promise<Type[]> =>
  db.transaction('r', [db.projectTypes, db.types], async () => {
    const projectTypes = await db.projectTypes.where('projectId').equals(projectId).toArray();
    const rows = await db.types.bulkGet(projectTypes.map((projectType) => projectType.typeId));

    return rows.filter((row): row is TypeRow => row !== undefined);
  });

export const getType = (id: string): Promise<Type | undefined> => {
  return db.types.get(id);
};
