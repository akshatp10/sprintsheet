import { useParams, useSearchParams } from 'react-router-dom';

import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import StageSummary from '@/features/dashboard/components/StageSummary';
import BurndownCard from '@/features/dashboard/components/BurndownCard';
import StageBreakdown from '@/features/dashboard/components/StageBreakdown';
import NeedsAttention from '@/features/dashboard/components/NeedsAttention';

import { getToday } from '@/hooks/useCycleStatus';
import { useGetCycle } from '@/lib/services/cycles/hooks';
import { useGetStagesPerProject } from '@/lib/services/stages/hooks';
import { useGetAllTasksByProject, useTasksByStage } from '@/lib/services/tasks/hooks';

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const { projectid } = useParams<{ projectid: string }>();

  const currentCycleId = searchParams.get('cycle') ?? '';

  const { data: currentCycle } = useGetCycle(currentCycleId);
  const { data: tasksByStage = {} } = useTasksByStage(currentCycleId);
  const { data: stages = [] } = useGetStagesPerProject(projectid ?? '');
  const { data: allTasks } = useGetAllTasksByProject(projectid ?? '');

  const visibleStages = stages.filter((stage) => stage.name !== 'Backlog');

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

  return (
    <div className="w-full flex flex-col px-8 py-6 gap-8">
      <DashboardHeader
        cycleName={currentCycle?.name}
        cycleLength={cycleLength}
        currentDay={currentDay}
      />

      <StageSummary stages={visibleStages} tasksByStage={tasksByStage} />

      <div className="flex gap-3 min-h-30">
        <BurndownCard />

        <StageBreakdown
          stages={visibleStages}
          tasksByStage={tasksByStage}
          totalTasks={allTasks?.length ?? 0}
        />
      </div>

      <NeedsAttention />
    </div>
  );
};

export default DashboardPage;
