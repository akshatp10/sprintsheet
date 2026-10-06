import Text from '@/components/common/Text';
import { cn } from '@/lib/cn';
import type { Stage } from '@/lib/services/stages/type';
import { stageConfig, StageName } from '@/lib/stageConfig';

interface StageSummaryProps {
  stages: Stage[];
  tasksByStage: Record<string, unknown[]>;
}

const StageSummary = ({ stages, tasksByStage }: StageSummaryProps) => {
  return (
    <div className="flex w-full justify-between gap-3">
      {stages.map((stage) => {
        const { chip } = stageConfig[stage?.name as StageName];

        return (
          <div key={stage.id} className="flex-1 bg-surface rounded-md p-4 border border-lines">
            <Text className="text-ink-3">{stage.name}</Text>

            <Text variant="display" className={cn(chip, 'font-bold bg-transparent')}>
              {tasksByStage[stage.id ?? '']?.length ?? 0}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default StageSummary;
