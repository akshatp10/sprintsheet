import Text from '@/components/common/Text';
import ProgressBar from '@/components/progressBar/ProgressBar';
import { getPercentage } from '@/lib/utils';

interface StageProgressItemProps {
  stageName: string;
  taskCount: number;
  totalTasks: number;
}

const StageProgressItem = ({ stageName, taskCount, totalTasks }: StageProgressItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-ink-3">
        <Text>{stageName}</Text>
        <Text>{taskCount}</Text>
      </div>

      <ProgressBar progress={getPercentage(taskCount, totalTasks)} />
    </div>
  );
};

export default StageProgressItem;
