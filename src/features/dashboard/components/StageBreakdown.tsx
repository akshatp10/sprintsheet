import Text from '@/components/common/Text';
import StageProgressItem from './StageProgressItem';
import UserTaskData from './UserTaskData';

import type { User } from '@/lib/services/users/types';
import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';

interface StageBreakdownProps {
  stages: {
    id?: string;
    name: string;
  }[];
  tasksByStage: Record<string, unknown[]>;
  totalTasks: number;
  tasksByUsers: {
    user: User;
    tasks: CycleTaskWithUsers[];
  }[];
  unassignedTasks: CycleTaskWithUsers[];
}

const StageBreakdown = ({
  stages,
  tasksByStage,
  totalTasks,
  unassignedTasks,
  tasksByUsers,
}: StageBreakdownProps) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 bg-surface border border-lines-hairline rounded-md p-4 overflow-y-auto">
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

        <div className="flex flex-col gap-1 py-2">
          {tasksByUsers.map(({ user, tasks }) => (
            <UserTaskData key={user.id} label={user.name} userName={user.name} totalTasks={tasks} />
          ))}

          <UserTaskData label="Unassigned" totalTasks={unassignedTasks} />
        </div>
      </div>
    </div>
  );
};

export default StageBreakdown;
