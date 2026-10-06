import Avatar from '@/components/avatar/Avatar';
import AvatarGroup from '@/components/avatar/AvatarGroups';
import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';
import { useEffect, useRef, useState } from 'react';
import { AssigneeSelect } from '../inputs/AssigneeSelect';

interface EditableAssigneeCellProps {
  task: CycleTaskWithUsers;
  onChange: (assigneeIds: string[]) => void;
  projectId: string;
  isDone?: boolean;
}

const EditableAssigneeCell = ({ task, onChange, projectId, isDone }: EditableAssigneeCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const visibleUsers = task.assignees.slice(0, 3);
  const extraUsers = task.assignees.length - 3;

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

  if (isEditing) {
    return (
      <AssigneeSelect
        projectId={projectId}
        value={task.assigneeIds}
        onChange={handleChange}
        onClose={() => {
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <Button
      variant="tertiary"
      className={`w-full justify-start border-none p-0 ${isDone ? 'opacity-50' : ''}`}
      onClick={() => {
        setIsEditing(true);
      }}
    >
      {task.assignees.length ? (
        <AvatarGroup>
          {visibleUsers.map((assignee) => (
            <Avatar key={assignee.id} userName={assignee.name} />
          ))}

          {extraUsers > 0 && <Avatar extraUsers={extraUsers} />}
        </AvatarGroup>
      ) : (
        <div className="flex items-center gap-1">
          <Avatar />

          <Text variant="caption" className="text-ink-2">
            Unassigned
          </Text>
        </div>
      )}
    </Button>
  );
};

export default EditableAssigneeCell;
