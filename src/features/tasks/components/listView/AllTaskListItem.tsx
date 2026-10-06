import Chip from '@/components/chips/Chip';
import Text from '@/components/common/Text';
import Checkbox from '@/components/inputs/Checkbox';
import { cn } from '@/lib/cn';
import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';
import { stageConfig, StageName } from '@/lib/stageConfig';
import useTaskDetailStore from '@/store/taskDetailStore';
import EditableStageCell from '../forms/EditableStageCell';
import { useTaskStageEditor } from '../../hooks/useTaskStageEditor';
import type { Stage } from '@/lib/services/stages/type';
import { useTaskEditor } from '../../hooks/useTaskEditor';
import EditableDueDateCell from '../forms/EditableDueDateCell';
import EditableAssigneeCell from '../forms/EditableAssigneeCell';

interface AllTaskListItemProps {
  gridTemplateColumns: string;
  isDone: boolean;
  task: CycleTaskWithUsers;
  onSelectionChange: (taskId: string, selected: boolean) => void;
  selectedTaskIds: string[];
  fromBacklog?: boolean;
  cycleId?: string;
  visibleStages?: Stage[];
}
const AllTaskListItem = ({
  gridTemplateColumns,
  isDone,
  task,
  onSelectionChange,
  selectedTaskIds,
  cycleId = '',
  fromBacklog = false,
  visibleStages = [],
}: AllTaskListItemProps) => {
  const openTask = useTaskDetailStore((state) => state.openTask);

  const checked = selectedTaskIds.includes(task.id);

  const { chip, dot } = stageConfig[task.stage.name as StageName];

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
      className={cn(
        'grid min-h-10 border-b border-lines-hairline bg-surface-page text-sm',
        isDone && 'opacity-50',
        checked && 'bg-accent-wash-selected',
      )}
      style={{ gridTemplateColumns }}
      onClick={() => {
        openTask(task);
      }}
    >
      {/* Checkbox */}
      <div
        className="flex items-center border-r border-lines-hairline px-3"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={checked}
          onChange={(value) => {
            onSelectionChange(task.id, value);
          }}
          className="bg-surface-page"
        />
      </div>
      {/* Key */}
      <div className="flex items-center border-r border-lines-hairline px-3">
        <Text variant="mono" className="text-ink-3">
          {task?.key}
        </Text>
      </div>
      {/* Title */}
      <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">
        <Text variant="body" maxLines={1} className={cn(isDone && 'line-through')}>
          {task?.name}
        </Text>
      </div>
      {/* Stage */}
      <div className="flex items-center border-r border-lines-hairline px-3 gap-2">
        {/* Stage dot */}
        <span className={cn('h-2 w-2 shrink-0 rounded-full', dot)} />

        {/* Stage name */}
        <Text variant="caption" className="font-medium uppercase">
          {task?.stage?.name}
        </Text>
      </div>
      {/* Status */}
      <div
        className="flex items-center border-r border-lines-hairline px-3 gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {fromBacklog ? (
          <Chip
            variant="secondary"
            text={task?.stage?.name}
            textType="text-type-caption"
            className={cn('px-1 py-0', chip)}
          />
        ) : (
          <EditableStageCell
            stage={task.stage}
            stages={visibleStages}
            onChange={handleStageChange}
          />
        )}
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
      {/* Due */}
      <div
        className="flex items-center border-r border-lines-hairline px-3"
        onClick={(e) => e.stopPropagation()}
      >
        <EditableDueDateCell dueDate={task.dueDate} onChange={handleDueDateChange} />
      </div>
    </div>
  );
};
export default AllTaskListItem;
