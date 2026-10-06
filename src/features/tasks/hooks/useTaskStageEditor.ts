import { useCallback } from 'react';
import { useUpdateTaskCycleStage } from '@/lib/services/taskCycles/hooks';

interface UseTaskStageEditorOptions {
  taskCycleId?: string;
  cycleId?: string;
  currentStageId: string;
  onStageChange?: (stageId: string) => void;
}

export const useTaskStageEditor = ({
  taskCycleId,
  cycleId,
  currentStageId,
  onStageChange,
}: UseTaskStageEditorOptions) => {
  const { mutate: updateTaskStage } = useUpdateTaskCycleStage();

  const updateStage = useCallback(
    (nextStageId: string) => {
      if (!taskCycleId || !cycleId) {
        return;
      }

      if (currentStageId === nextStageId) {
        return;
      }

      onStageChange?.(nextStageId);

      updateTaskStage({
        taskCycleId,
        cycleId,
        stageId: nextStageId,
      });
    },
    [taskCycleId, cycleId, currentStageId, onStageChange, updateTaskStage],
  );

  return {
    updateStage,
  };
};
