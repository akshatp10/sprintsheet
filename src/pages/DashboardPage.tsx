import { useParams, useSearchParams } from 'react-router-dom';

import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import StageSummary from '@/features/dashboard/components/StageSummary';
// import BurndownCard from '@/features/dashboard/components/BurndownCard';
import StageBreakdown from '@/features/dashboard/components/StageBreakdown';
import NeedsAttention from '@/features/dashboard/components/NeedsAttention';

import { getToday } from '@/hooks/useCycleStatus';
import { useGetCycle } from '@/lib/services/cycles/hooks';
import { useGetStagesPerProject } from '@/lib/services/stages/hooks';
import { useTasksByStage } from '@/lib/services/tasks/hooks';
import NoCycleActive from '@/features/cycles/components/NoCycleActive';
import { useGetProjectUsers } from '@/lib/services/users/hooks';
import { useMemo } from 'react';
import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';
import type { TaskNeedingAttention } from '@/features/dashboard/types/types';

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const { projectid } = useParams<{ projectid: string }>();

  const currentCycleId = searchParams.get('cycle') ?? '';

  const { data: currentCycle } = useGetCycle(currentCycleId);
  const { data: tasksByStage = {} } = useTasksByStage(currentCycleId);
  const { data: stages = [] } = useGetStagesPerProject(projectid ?? '');
  const { data: users = [] } = useGetProjectUsers(projectid ?? '');

  const visibleStages = stages.filter((stage) => stage.name !== 'Backlog');

  const totalCycleTasks = Object.values(tasksByStage).reduce(
    (total, tasks) => total + tasks.length,
    0,
  );

  const cycleLength =
    (new Date(currentCycle?.endDate ?? '').getTime() -
      new Date(currentCycle?.startDate ?? '').getTime()) /
    (1000 * 60 * 60 * 24);

  const currentDay = Math.min(
    cycleLength,
    Math.max(
      1,
      Math.floor(
        (new Date(getToday()).getTime() - new Date(currentCycle?.startDate ?? '').getTime()) /
          (1000 * 60 * 60 * 24),
      ) + 1,
    ),
  );

  const { tasksByUsers, unassignedTasks, needsAttentionTasks } = useMemo(() => {
    const cycleTasks = Object.values(tasksByStage).flat();

    const userTasksMap = new Map<string, CycleTaskWithUsers[]>();

    users.forEach((user) => {
      userTasksMap.set(user.id, []);
    });

    const unassignedTasks: CycleTaskWithUsers[] = [];
    const needsAttentionTasks: TaskNeedingAttention[] = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    cycleTasks.forEach((task) => {
      task.assigneeIds.forEach((userId) => {
        const userTasks = userTasksMap.get(userId);

        if (userTasks) {
          userTasks.push(task);
        }
      });

      const isUnassigned = task.assigneeIds.length === 0;

      if (isUnassigned) {
        unassignedTasks.push(task);
      }

      if (task.stage.isTerminal) return;

      const isBlocked = task.stage.name === 'Blocked';

      let overdueDays = 0;

      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        const difference = today.getTime() - dueDate.getTime();

        overdueDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      }

      const isOverdue = overdueDays > 0;

      if (isBlocked) {
        needsAttentionTasks.push({
          task,
          reason: {
            type: 'blocked',
            label: 'Blocked',
          },
        });
      } else if (isOverdue) {
        needsAttentionTasks.push({
          task,
          reason: {
            type: 'overdue',
            label: `${overdueDays} day${overdueDays === 1 ? '' : 's'} over`,
          },
        });
      } else if (isUnassigned) {
        needsAttentionTasks.push({
          task,
          reason: {
            type: 'unassigned',
            label: 'Unassigned',
          },
        });
      }
    });

    const tasksByUsers = users.map((user) => ({
      user,
      tasks: userTasksMap.get(user.id) ?? [],
    }));

    return {
      tasksByUsers,
      unassignedTasks,
      needsAttentionTasks,
    };
  }, [users, tasksByStage]);

  if (currentCycleId === '') return <NoCycleActive />;

  return (
    <div className="w-full h-full flex flex-col px-8 py-6 gap-8 overflow-hidden">
      <DashboardHeader
        cycleName={currentCycle?.name}
        cycleLength={cycleLength}
        currentDay={currentDay}
      />

      <StageSummary stages={visibleStages} tasksByStage={tasksByStage} />

      <div className="flex-1 min-h-0 flex gap-3 overflow-hidden">
        <StageBreakdown
          stages={visibleStages}
          tasksByStage={tasksByStage}
          totalTasks={totalCycleTasks}
          tasksByUsers={tasksByUsers}
          unassignedTasks={unassignedTasks}
        />

        <NeedsAttention needsAttentionTasks={needsAttentionTasks} />
      </div>
    </div>
  );
};

export default DashboardPage;
