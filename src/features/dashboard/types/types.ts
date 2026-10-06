import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';

export type TaskAttentionReason =
  | {
      type: 'blocked';
      label: 'Blocked';
    }
  | {
      type: 'unassigned';
      label: 'Unassigned';
    }
  | {
      type: 'overdue';
      label: string;
    };

export interface TaskNeedingAttention {
  task: CycleTaskWithUsers;
  reason: TaskAttentionReason;
}
