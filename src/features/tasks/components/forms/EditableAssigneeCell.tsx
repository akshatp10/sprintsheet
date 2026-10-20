import type { CycleTaskItem } from '@/lib/services/tasks/types';
import { useEffect, useRef, useState } from 'react';
import { AssigneeSelect } from '../inputs/AssigneeSelect';

interface EditableAssigneeCellProps {
  task: CycleTaskItem;
  onChange: (assigneeIds: string[]) => void;
  projectId: string;
  isDone?: boolean;
}

const EditableAssigneeCell = ({ task, onChange, projectId, isDone }: EditableAssigneeCellProps) => {
  const [, setIsEditing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const handleChange = (assigneeIds: string[]) => {
    onChange(assigneeIds);

    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    closeTimer.current = setTimeout(() => {
      setIsEditing(false);
      closeTimer.current = null;
    }, 1000);
  };

  return (
    <AssigneeSelect
      projectId={projectId}
      value={task.assigneeIds}
      onChange={handleChange}
      onClose={() => {
        setIsEditing(false);
      }}
      isDone={isDone}
    />
  );
};

export default EditableAssigneeCell;
