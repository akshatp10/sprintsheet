import Text from '@/components/common/Text';
import StageProgressItem from './StageProgressItem';

interface StageBreakdownProps {
  stages: {
    id?: string;
    name: string;
  }[];
  tasksByStage: Record<string, unknown[]>;
  totalTasks: number;
}

const StageBreakdown = ({ stages, tasksByStage, totalTasks }: StageBreakdownProps) => {
  return (
    <div className="flex-1 flex flex-col gap-2 bg-surface border border-lines-hairline rounded-md p-4">
      <Text className="text-ink-2 font-bold" variant="h2">
        By Stage
      </Text>

      <div className="flex flex-col gap-2 border-b border-b-lines-hairline pb-3">
        {stages.map((stage) => (
          <StageProgressItem
            key={stage.id}
            stageName={stage.name}
            taskCount={tasksByStage[stage.id ?? '']?.length ?? 0}
            totalTasks={totalTasks}
          />
        ))}
      </div>

      <div>
        <Text className="text-ink-2 font-bold" variant="h2">
          Load by person
        </Text>
      </div>
    </div>
  );
};

export default StageBreakdown;
