import Chip from '@/components/chips/Chip';
import Text from '@/components/common/Text';

import type { Stage } from '@/lib/services/stages/type';
import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';

import { useTypeById } from '@/lib/services/types/hooks';
import useTaskDetailStore from '@/store/taskDetailStore';
import { GripVertical } from 'lucide-react';
import EditableStageCell from '../forms/EditableStageCell';
import { useTaskStageEditor } from '../../hooks/useTaskStageEditor';
import { useSearchParams } from 'react-router-dom';
import { useTaskEditor } from '../../hooks/useTaskEditor';
import EditableAssigneeCell from '../forms/EditableAssigneeCell';
import EditableDueDateCell from '../forms/EditableDueDateCell';

interface TaskListElementProps {
  gridTemplateColumns: string;
  task: CycleTaskWithUsers;
  taskNumber: number;
  isDone: boolean;
  isOverlay?: boolean;
  stages: Stage[];
}

const TaskListElement = ({
  gridTemplateColumns,
  task,
  taskNumber,
  isDone,
  stages,
  isOverlay = false,
}: TaskListElementProps) => {
  const { data: curType } = useTypeById(task.typeId);

  const [searchParams] = useSearchParams();
  const cycleId = searchParams.get('cycle') ?? '';

  const openTask = useTaskDetailStore((state) => state.openTask);

  const { updateField } = useTaskEditor(task);

  const handleAssigneeChange = (assigneeIds: string[]) => {
    updateField('assigneeIds', assigneeIds);
  };

  const handleDueDateChange = (dueDate: string | null) => {
    updateField('dueDate', dueDate);
  };

  const { updateStage } = useTaskStageEditor({
    taskCycleId: task.taskCycleId,
    cycleId,
    currentStageId: task.stage.id,
  });

  const handleStageChange = (nextStageId: string) => {
    updateStage(nextStageId);
  };

  return (
    <div
      className={`
				grid
				min-h-10
				border-b
				border-lines-hairline
				text-sm
				bg-surface-page
				${isDone ? 'opacity-50' : ''}
				${isOverlay ? 'opacity-75' : ''}
			`}
      style={{ gridTemplateColumns }}

      onClick={() => {
        openTask(task);
      }}
    >
      {/* Number */}
      <div className="flex items-center border-r border-lines-hairline px-3 bg-surface-desk">
        {isOverlay ? (
          <GripVertical strokeWidth={1.5} size={15} className="text-ink-3" />
        ) : (
          <Text variant="mono" className="text-ink-3 group-hover:opacity-0 mx-auto">
            {taskNumber}
          </Text>
        )}
      </div>

      {/* Type */}
      <div className="flex items-center border-r border-lines-hairline px-3">
        <Chip
          variant="secondary"
          text={curType?.name ?? ''}
          textType="text-type-caption"
          className="px-1 py-0"
        />
      </div>
      {/* Title */}
      <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">
        <Text variant="body" maxLines={1} className={`${isDone ? 'line-through' : ''}`}>
          {task.name}
        </Text>
      </div>

      {/* Assignee */}
      <div
        className="flex min-w-0 items-center border-r border-lines-hairline px-3"
        onClick={(e) => e.stopPropagation()}
      >
        <EditableAssigneeCell
          task={task}
          onChange={handleAssigneeChange}
          projectId={task?.projectId}
        />
      </div>

      {/* Status */}
      <div
        className="flex items-center border-r border-lines-hairline px-3"
        onClick={(e) => e.stopPropagation()}
      >
        <EditableStageCell stage={task.stage} stages={stages} onChange={handleStageChange} />
      </div>

      {/* Due */}
      <div
        className="flex items-center border-r border-lines-hairline px-3"
        onClick={(e) => e.stopPropagation()}
      >
        <EditableDueDateCell dueDate={task.dueDate} onChange={handleDueDateChange} />
      </div>

      {/* Tags */}
      <div className="flex min-w-0 items-center gap-1 px-3">
        {!!task.tags?.length ? (
          task.tags.map((tag) => (
            <Chip
              key={tag}
              variant="secondary"
              text={tag}
              textType="text-type-caption"
              className="px-1 py-0"
            />
          ))
        ) : (
          <Text variant="caption" className="text-ink-3">
            —
          </Text>
        )}
      </div>
    </div>
  );
};

export default TaskListElement;
