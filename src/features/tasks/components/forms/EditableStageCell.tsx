import Button from '@/components/button/Button';
import Chip from '@/components/chips/Chip';
import { cn } from '@/lib/cn';
import type { Stage } from '@/lib/services/stages/type';
import { stageConfig, StageName } from '@/lib/stageConfig';
import { useState } from 'react';

interface EditableStageCellProps {
  stage: Stage;
  stages: Stage[];
  onChange: (stageId: string) => void;
}

const EditableStageCell = ({ stage, stages, onChange }: EditableStageCellProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { chip } = stageConfig[stage.name as StageName];

  const handleChange = (nextStageId: string) => {
    if (nextStageId !== stage.id) {
      onChange(nextStageId);
    }

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <select
        autoFocus
        value={stage.id}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        className="w-full bg-transparent text-xs outline-none"
      >
        {stages.map((stageOption) => (
          <option key={stageOption.id} value={stageOption.id}>
            {stageOption.name}
          </option>
        ))}
      </select>
    );
  }

  return (
    <Button
      variant="tertiary"
      className="p-0 border-none"
      onClick={() => {
        setIsEditing(true);
      }}
    >
      <Chip
        variant="secondary"
        text={stage.name}
        textType="text-type-caption"
        className={cn('px-1 py-0', chip)}
      />
    </Button>
  );
};

export default EditableStageCell;
