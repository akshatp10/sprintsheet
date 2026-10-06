import { useUpdateTask } from '@/lib/services/tasks/hooks';
import type { CycleTaskWithUsers, UpdateTaskInput } from '@/lib/services/tasks/types';
import { useCallback, useEffect, useRef } from 'react';

type EditableTask = Pick<
  CycleTaskWithUsers,
  'name' | 'description' | 'dueDate' | 'assigneeIds' | 'typeId'
>;

type EditableTaskField = keyof EditableTask;

interface UseTaskEditorOptions {
  debounceMs?: number;
}

export const useTaskEditor = (
  task: CycleTaskWithUsers,
  { debounceMs = 1000 }: UseTaskEditorOptions = {},
) => {
  const { mutate: updateTask } = useUpdateTask();

  const savedValues = useRef<EditableTask>({
    name: task.name,
    description: task.description,
    dueDate: task.dueDate,
    assigneeIds: task.assigneeIds,
    typeId: task.typeId,
  });

  const timers = useRef<Partial<Record<EditableTaskField, ReturnType<typeof setTimeout>>>>({});

  useEffect(() => {
    savedValues.current = {
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      assigneeIds: task.assigneeIds,
      typeId: task.typeId,
    };
  }, [task]);

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  const persist = useCallback(
    <K extends EditableTaskField>(field: K, value: EditableTask[K]) => {
      const previousValue = savedValues.current[field];

      if (Object.is(previousValue, value)) {
        return;
      }

      savedValues.current[field] = value;

      updateTask(
        {
          id: task.id,
          projectId: task.projectId,
          updates: {
            [field]: value,
          } as UpdateTaskInput,
        },
        {
          onError: () => {
            /**
             * Roll back only if this value is still
             * the value we attempted to persist.
             *
             * Otherwise a newer edit has already happened.
             */
            if (Object.is(savedValues.current[field], value)) {
              savedValues.current[field] = previousValue;
            }
          },
        },
      );
    },
    [task.id, task.projectId, updateTask],
  );

  const updateField = useCallback(
    <K extends EditableTaskField>(field: K, value: EditableTask[K]) => {
      const timer = timers.current[field];

      if (timer) {
        clearTimeout(timer);
        delete timers.current[field];
      }

      persist(field, value);
    },
    [persist],
  );

  const updateFieldDebounced = useCallback(
    <K extends EditableTaskField>(field: K, value: EditableTask[K]) => {
      const timer = timers.current[field];

      if (timer) {
        clearTimeout(timer);
      }

      timers.current[field] = setTimeout(() => {
        delete timers.current[field];
        persist(field, value);
      }, debounceMs);
    },
    [debounceMs, persist],
  );

  return {
    updateField,
    updateFieldDebounced,
  };
};
