import Text from '@/components/common/Text';
import type { Stage } from '@/lib/services/stages/type';

interface StageSummaryProps {
  stages: Stage[];
  tasksByStage: Record<string, unknown[]>;
}

const StageSummary = ({ stages, tasksByStage }: StageSummaryProps) => {
  return (
    <div className="flex w-full justify-between gap-3">
      {stages.map((stage) => (
        <div key={stage.id} className="flex-1 bg-surface rounded-md p-4 border border-lines">
          <Text className="text-ink-3">{stage.name}</Text>

          <Text variant="display" className="font-bold">
            {tasksByStage[stage.id ?? '']?.length ?? 0}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default StageSummary;
