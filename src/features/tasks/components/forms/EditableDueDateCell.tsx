import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

interface EditableDueDateCellProps {
  dueDate: string | null;
  onChange: (dueDate: string | null) => void;
  isDone?: boolean;
}

const EditableDueDateCell = ({ dueDate, onChange, isDone }: EditableDueDateCellProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (nextDueDate: string) => {
    onChange(nextDueDate || null);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        autoFocus
        type="date"
        value={dueDate ?? ''}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        className="w-full bg-transparent text-xs outline-none"
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
      {dueDate ? (
        <Text variant="mono">{formatDate(dueDate)}</Text>
      ) : (
        <Text variant="mono" className="text-ink-3">
          —
        </Text>
      )}
    </Button>
  );
};

export default EditableDueDateCell;
