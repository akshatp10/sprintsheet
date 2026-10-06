import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Trash } from 'lucide-react';

import Drawer from '@/components/drawer/Drawer';
import Avatar from '@/components/avatar/Avatar';
import Text from '@/components/common/Text';
import Button from '@/components/button/Button';
import Input from '@/components/inputs/Input';
import TextArea from '@/components/inputs/TextArea';
import { AssigneeSelect } from '@/features/tasks/components/inputs/AssigneeSelect';
import { useProjectTypes } from '@/lib/services/types/hooks';
import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/cn';
import { useTaskEditor } from '../../hooks/useTaskEditor';
import { useGetBacklogStagePerProject, useGetStagesPerProject } from '@/lib/services/stages/hooks';
import { useParams } from 'react-router-dom';
import { useDeleteTaskCycle, useGetTaskCyclesById } from '@/lib/services/taskCycles/hooks';
import { useTaskStageEditor } from '@/features/tasks/hooks/useTaskStageEditor';
import Chip from '@/components/chips/Chip';
import { stageConfig, StageName } from '@/lib/stageConfig';
import ExitAlert from '@/components/popupModals/ExitAlert';

interface TaskDetailFormProps {
  className?: string;
  task: CycleTaskWithUsers;
  onClose: () => void;
}

interface TaskFormValues {
  name: string;
  description: string;
  dueDate: string;
  assigneeIds: string[];
  typeId: string;
  stageId: string;
}

const getTaskFormValues = (task: CycleTaskWithUsers): TaskFormValues => ({
  name: task.name,
  description: task.description,
  dueDate: task.dueDate?.slice(0, 10) ?? '',
  assigneeIds: task.assigneeIds,
  typeId: task.typeId,
  stageId: task.stage.id,
});

const TaskDetailForm = ({ task, className, onClose }: TaskDetailFormProps) => {
  const { projectid } = useParams<{ projectid: string }>();
  const { data: stages = [] } = useGetStagesPerProject(projectid ?? '');
  const { data: taskCycleData } = useGetTaskCyclesById(task?.taskCycleId ?? '');
  const { data: backlogStageId } = useGetBacklogStagePerProject(projectid ?? '');

  const visibleStages = stages.filter((stage) => stage.id !== backlogStageId);

  const { register, setValue, watch } = useForm<TaskFormValues>({
    defaultValues: getTaskFormValues(task),
  });

  const stageId = watch('stageId');

  const { updateStage } = useTaskStageEditor({
    taskCycleId: task.taskCycleId,
    cycleId: taskCycleData?.cycleId,
    currentStageId: stageId,
    onStageChange: (nextStageId) => {
      setValue('stageId', nextStageId);
    },
  });

  const { updateField, updateFieldDebounced } = useTaskEditor(task, {
    debounceMs: 1000,
  });

  const { data: projectTypes = [] } = useProjectTypes(task.projectId);

  const dueDate = watch('dueDate');
  const assigneeIds = watch('assigneeIds');

  const stageName = task.stage?.name as StageName;
  const stageDot = stageConfig[stageName]?.dot ?? '';

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTaskCycle();

  const handleDelete = () => {
    deleteTask(
      {
        taskId: task.id,
        taskCycleId: task.taskCycleId ?? null,
      },
      {
        onSuccess: () => {
          setShowDeleteAlert(false);
          onClose();
        },
      },
    );
  };

  return (
    <>
      <Drawer
        onClose={onClose}
        label={
          <div className="flex items-center gap-2">
            <Text variant="mono" as="span" className="text-ink-3">
              {task.key}
            </Text>

            <Text
              variant="caption"
              as="span"
              className="rounded-md bg-white px-2 py-0.5 text-ink-3"
            >
              {dueDate ? formatDate(dueDate) : 'No due date'}
            </Text>
          </div>
        }
        width="40dvw"
        className={cn('z-50 h-full bg-surface-sunken', className)}
      >
        <div className="flex h-full min-h-0 flex-col">
          {/* Header */}
          <div className="shrink-0 border-b border-lines-hairline px-4 pb-4">
            <div className="flex items-start justify-between gap-2 pt-4">
              {/* Task name */}
              <Input
                type="text"
                placeholder="Task title"
                className="min-w-0 flex-1 border-none bg-transparent text-type-h1 text-ink outline-none placeholder:text-ink-3"
                register={register('name', {
                  onChange: (e) => {
                    const value = e.target.value;

                    if (!value.trim()) {
                      return;
                    }

                    updateFieldDebounced('name', value.trim());
                  },
                })}
              />

              <div className="flex items-center gap-1">
                <Button
                  variant="tertiary"
                  className="rounded-md border-none p-1.5 text-ink-3 transition-colors hover:bg-surface-raised hover:text-ink"
                  onClick={() => setShowDeleteAlert(true)}
                  disabled={isDeleting}
                >
                  <Trash size={14} />
                </Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {/* Stage - only change state if not backlog */}
              {stageId === backlogStageId ? (
                <Chip
                  text={
                    <>
                      <span className={cn('h-2 w-2 shrink-0 rounded-full', stageDot)} />
                      {'Backlog'}
                    </>
                  }
                  variant="secondary"
                  className="flex items-center gap-2 rounded-md border-lines-hairline bg-surface"
                />
              ) : (
                <select
                  value={stageId}
                  onChange={(e) => updateStage(e.target.value)}
                  className="h-8 rounded-md border border-lines-hairline bg-surface px-2.5 text-type-caption text-ink-2 outline-none transition-colors hover:border-lines focus:border-lines-strong"
                >
                  {visibleStages.map((stage) => (
                    <option key={stage.stageId} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              )}

              {/* Assignees */}
              <AssigneeSelect
                projectId={task.projectId}
                value={assigneeIds}
                onChange={(ids) => {
                  setValue('assigneeIds', ids);

                  updateField('assigneeIds', ids);
                }}
              />

              {/* Due date */}
              <Input
                type="date"
                aria-label="Due date"
                className="h-8 rounded-md border border-lines-hairline bg-surface px-2.5 text-type-caption text-ink-2 outline-none focus:border-accent border-none"
                register={register('dueDate', {
                  onChange: (e) => {
                    updateField('dueDate', e.target.value || null);
                  },
                })}
              />

              {/* Type */}
              <select
                aria-label="Task type"
                className="h-8 rounded-md border border-lines-hairline bg-surface px-2.5 text-type-caption text-ink-2 outline-none transition-colors hover:border-lines focus:border-lines-strong"
                {...register('typeId', {
                  onChange: (e) => {
                    updateField('typeId', e.target.value);
                  },
                })}
              >
                {projectTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="flex min-h-0 flex-1 flex-col">
            {/* Description */}
            <div className="shrink-0 px-4 py-4">
              <TextArea
                rows={5}
                placeholder="Add a description…"
                className="w-full resize-none border-none bg-transparent text-type-body-sm leading-relaxed text-ink-2 outline-none placeholder:text-ink-3"
                register={register('description', {
                  onChange: (e) => {
                    updateFieldDebounced('description', e.target.value);
                  },
                })}
              />
            </div>

            {/* Activity placeholder */}
            <div className="flex flex-1" />

            {/* Comment footer */}
            <div className="shrink-0 cursor-not-allowed border-t border-lines-hairline bg-surface-page p-3 opacity-40">
              <div className="flex cursor-not-allowed items-center gap-2">
                <Avatar userName="User" />

                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-lines-control bg-surface px-2">
                  <Input
                    type="text"
                    placeholder="Comment, or @mention someone..."
                    className="min-w-0 flex-1 cursor-not-allowed border-none bg-transparent py-2 text-xs text-ink outline-none placeholder:text-ink-3"
                    value=""
                    onChange={() => {}}
                    disabled
                  />

                  <Button
                    variant="tertiary"
                    className="shrink-0 cursor-not-allowed rounded-md border-none p-1 text-ink-3 hover:text-ink"
                    disabled
                  >
                    <Send size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      {showDeleteAlert && (
        <ExitAlert
          onClose={() => setShowDeleteAlert(false)}
          exitPopup={handleDelete}
          alertLabel="Delete task"
          alertContent={
            task.taskCycleId
              ? 'Are you sure you want to remove this task from the cycle?'
              : 'Are you sure you want to permanently delete this task?'
          }
          acceptText={isDeleting ? 'Deleting...' : 'Delete'}
          rejectText="Cancel"
        />
      )}
    </>
  );
};

export default TaskDetailForm;
