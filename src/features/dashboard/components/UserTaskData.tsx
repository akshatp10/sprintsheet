import Text from '@/components/common/Text';
import Avatar from '@/components/avatar/Avatar';
import ProgressBar from '@/components/progressBar/ProgressBar';
import { getPercentage } from '@/lib/utils';
import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';

interface UserTaskDataProps {
  label: string;
  totalTasks: CycleTaskWithUsers[];
  userName?: string;
}

const UserTaskData = ({ label, totalTasks, userName }: UserTaskDataProps) => {
  const completedTasks = totalTasks.filter((task) => task.stage.isTerminal).length;

  const completionPercentage = getPercentage(completedTasks, totalTasks.length);

  return (
    <div className="flex justify-between text-ink-3">
      <div className="flex-1 flex items-center gap-2">
        <Avatar userName={userName} />
        <Text>{label}</Text>
      </div>

      <div className="flex-1 flex items-center gap-2">
        <ProgressBar progress={completionPercentage} />
        <Text>{completedTasks}</Text>
      </div>
    </div>
  );
};

export default UserTaskData;
