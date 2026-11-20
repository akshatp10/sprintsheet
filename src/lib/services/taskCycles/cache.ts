import {
  findInCached,
  patchCacheByPrefix,
  snapshotCached,
  updateCached,
  type CacheSnapshot,
} from '@/lib/db/queryCache';

import { stageQueryKeys } from '../stages/hooks';
import type { Stage } from '../stages/type';
import { taskQueryKeys } from '../tasks/hooks';
import type { CycleTaskItem } from '../tasks/types';
import type { MoveTaskRequest, UpdateTaskCycleStageRequest } from './types';

// Returned when the optimistic step is skipped, so there is nothing to roll back.
const NO_CHANGES: CacheSnapshot = [];

// Shows the new stage on the task card immediately.
export const applyStageChange = async ({
  taskCycleId,
  stageId,
}: UpdateTaskCycleStageRequest): Promise<CacheSnapshot> => {
  const stage = await findInCached<Stage>(stageQueryKeys.all, (s) => s.id === stageId);

  if (!stage) return NO_CHANGES;

  return patchCacheByPrefix<CycleTaskItem[]>(taskQueryKeys.all, (tasks) =>
    tasks.map((task) => (task.taskCycleId === taskCycleId ? { ...task, stage } : task)),
  );
};

// Removes the task from the list it was moved out of. It appears in the destination when the refetch finishes.
export const applyTaskMove = async ({
  projectId,
  taskId,
  fromCycleId,
  to,
}: MoveTaskRequest): Promise<CacheSnapshot> => {
  const isSameCycle = to.type === 'cycle' && to.cycleId === fromCycleId;
  if (isSameCycle) return NO_CHANGES;

  const sourceKey = fromCycleId
    ? taskQueryKeys.cycle(fromCycleId)
    : taskQueryKeys.backlog(projectId);

  const snapshot = await snapshotCached([sourceKey]);

  if (!snapshot.length) return NO_CHANGES;

  await updateCached<CycleTaskItem[]>(sourceKey, (tasks) =>
    (tasks ?? []).filter((task) => task.id !== taskId),
  );

  return snapshot;
};
