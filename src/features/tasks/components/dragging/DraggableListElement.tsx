import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';
import { useDraggable } from '@dnd-kit/react';
import { GripVertical } from 'lucide-react';
import TaskListElement from '../listView/TaskListElement';
import TaskListPlaceholder from '../listView/TaskListPlaceholder';
import type { Stage } from '@/lib/services/stages/type';

interface DraggableTaskListElementProps {
  task: CycleTaskWithUsers;
  taskNumber: number;
  isDone: boolean;
  isOverlay?: boolean;
  gridTemplateColumns: string;
  visibleStages: Stage[];
}

const DraggableTaskListElement = ({
  task,
  taskNumber,
  isDone,
  isOverlay = false,
  gridTemplateColumns,
  visibleStages,
}: DraggableTaskListElementProps) => {
  const { ref, isDragging } = useDraggable({
    id: task.id,
  });

  if (isDragging) return <TaskListPlaceholder gridTemplateColumns={gridTemplateColumns} />;

  return (
    <div
      className={`
				relative
				group
			`}
    >
      <div
        ref={ref}
        className="absolute left-0 top-0 z-10 flex h-full w-10 items-center justify-center cursor-grab opacity-0 group-hover:opacity-100"
      >
        <GripVertical strokeWidth={1.5} size={15} className="text-ink-3" />
      </div>

      <TaskListElement
        task={task}
        taskNumber={taskNumber}
        isDone={isDone}
        isOverlay={isOverlay}
        gridTemplateColumns={gridTemplateColumns}
        stages={visibleStages}
      />
    </div>
  );
};

export default DraggableTaskListElement;
