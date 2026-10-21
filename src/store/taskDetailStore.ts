import { create } from 'zustand';

import type { CycleTaskItem } from '@/lib/services/tasks/types';

interface TaskDetailStates {
  currentTask: CycleTaskItem | null;
}

interface TaskDetailActions {
  openTask: (task: CycleTaskItem) => void;
  closeTask: () => void;
}

type TaskDetailStore = TaskDetailStates & TaskDetailActions;

const initialState: TaskDetailStates = {
  currentTask: null,
};

const useTaskDetailStore = create<TaskDetailStore>()((set) => ({
  ...initialState,

  openTask: (task) =>
    set(() => ({
      currentTask: task,
    })),

  closeTask: () =>
    set(() => ({
      currentTask: null,
    })),
}));

export default useTaskDetailStore;
