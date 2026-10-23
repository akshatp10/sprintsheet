import Button from '@/components/button/Button';
import Chip from '@/components/chips/Chip';
import Select from '@/components/select/Select';
import { cn } from '@/lib/cn';
import type { Stage } from '@/lib/services/stages/type';
import { stageConfig, StageName } from '@/lib/stageConfig';

interface StageSelectProps {
  stages: Stage[];
  value: string;
  onChange: (stageId: string) => void;
  isDone?: boolean;
  className?: string;
}

const StageSelect = ({ stages, value, onChange, isDone = false, className }: StageSelectProps) => {
  const options = stages.map((stage) => ({
    label: stage.name,
    value: stage.id,
  }));

  const selectedStage = stages.find((stage) => stage.id === value);
  const selectedChip = selectedStage
    ? stageConfig[selectedStage.name as StageName]?.chip
    : undefined;

  return (
    <Select
      options={options}
      value={value}
      onChange={(nextValue) => {
        if (nextValue && nextValue !== value) {
          onChange(nextValue);
        }
      }}
      searchable={false}
      className={className}
      triggerClassName="w-full"
      listClassName="w-24"
      renderTrigger={({ toggleOpen, open }) => (
        <Button
          variant="tertiary"
          onClick={toggleOpen}
          className={cn(
            'w-fit cursor-pointer border-none bg-transparent p-0 text-left',
            isDone && 'opacity-50',
          )}
          aria-expanded={open}
          aria-label="Change stage"
        >
          <Chip
            variant="secondary"
            text={selectedStage?.name ?? 'Select stage'}
            textType="text-type-caption"
            className={cn(
              'w-full px-1 py-0',
              selectedChip,
              //   !!!selectedStage?.name && 'text-type-h2',
            )}
          />
        </Button>
      )}
      renderOption={(option) => {
        const chip = stageConfig[option.label as StageName]?.chip;

        return (
          <Chip
            variant="secondary"
            text={option.label}
            textType="text-type-caption"
            className={cn('w-full px-1 py-0', chip)}
          />
        );
      }}
    />
  );
};

export default StageSelect;
