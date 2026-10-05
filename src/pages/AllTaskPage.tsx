import Checkbox from '@/components/inputs/Checkbox';
import TableWrapper from '@/components/table/TableWrapper';
import CycleAllTaskSelectionFooter from '@/features/cycles/components/CycleAllTaskSelectionFooter';
import CycleHeaderElement from '@/features/cycles/components/CycleHeaderElement';
import CycleTaskSection from '@/features/tasks/components/CycleTaskSection';
import AllTaskListItem from '@/features/tasks/components/listView/AllTaskListItem';
import TaskDetailsDrawer from '@/features/tasks/components/TaskDetailsDrawer';
import { useCycleStatus } from '@/hooks/useCycleStatus';
import { useGetAllCyclesByProject } from '@/lib/services/cycles/hooks';
import { useGetStagesPerProject } from '@/lib/services/stages/hooks';
import { useMoveTasksAcrossCycle } from '@/lib/services/taskCycles/hooks';
import {
  useBacklogTasks,
  useGetAllTasksByProject,
  useGetTasksByCycle,
} from '@/lib/services/tasks/hooks';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const AllTaskPage = () => {
  const columns = [
    {
      key: 'selection',
      label: '',
      width: '40px',
      renderHeader: () => (
        <Checkbox
          checked={allTasksSelected}
          onChange={handleSelectAll}
          className="bg-transparent border-2"
        />
      ),
    },
    { key: 'key', label: 'KEY', width: '100px' },
    { key: 'title', label: 'TITLE', width: 'minmax(200px, 1fr)' },
    { key: 'stage', label: 'STAGE', width: '120px' },
    { key: 'status', label: 'STATUS', width: '120px' },
    { key: 'assignee', label: 'ASSIGNEE', width: '120px' },
    { key: 'due', label: 'DUE', width: '100px' },
  ];

  const gridTemplateColumns = columns.map((column) => column.width).join(' ');
  const { projectid } = useParams<{ projectid: string }>();

  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  const { data: allCycles = [] } = useGetAllCyclesByProject(projectid ?? '');
  const { data: tasksByCycle = {} } = useGetTasksByCycle(projectid ?? '');
  const { data: allBacklogTasks } = useBacklogTasks(projectid ?? '');
  const { data: allTasks } = useGetAllTasksByProject(projectid ?? '');
  const { data: stages = [] } = useGetStagesPerProject(projectid ?? '');
  const { mutate: handleMoveTaskAcrossCycle } = useMoveTasksAcrossCycle();

  const {
    active: activeCycles,
    closed: closedCycles,
    planned: plannedCycles,
  } = useCycleStatus(allCycles);

  const cyclesWithStatus = [
    ...plannedCycles.map((cycle) => ({ cycle, status: 'planned' as const })),
    ...activeCycles.map((cycle) => ({ cycle, status: 'active' as const })),
    ...closedCycles.map((cycle) => ({ cycle, status: 'closed' as const })),
  ];

  const defaultStageId = [...stages]
    .sort((a, b) => a.order - b.order)
    .find((s) => s.name !== 'Backlog')?.id;

  const sourceCycleByTask = useMemo(() => {
    const map = new Map<string, string | null>();

    allBacklogTasks?.forEach((t) => map.set(t.id, null));
    Object.entries(tasksByCycle).forEach(([cycleId, tasks]) =>
      tasks.forEach((t) => map.set(t.id, cycleId)),
    );

    return map;
  }, [allBacklogTasks, tasksByCycle]);

  const allTaskIds = allTasks?.map((task) => task.id) ?? [];

  const allTasksSelected =
    allTaskIds.length > 0 && allTaskIds.every((id) => selectedTaskIds.includes(id));

  const handleSelectAll = (selected: boolean) => {
    setSelectedTaskIds(selected ? allTaskIds : []);
  };

  const handleTaskSelection = (taskId: string, selected: boolean) => {
    setSelectedTaskIds((prev) => {
      if (selected) {
        return [...prev, taskId];
      }

      return prev.filter((id) => id !== taskId);
    });
  };

  const handleMoveSelectedToBacklog = () => {
    const tasks = selectedTaskIds
      .map((taskId) => ({
        taskId,
        fromCycleId: sourceCycleByTask.get(taskId) ?? null,
      }))
      // Already in the backlog, so nothing to do
      .filter((t) => t.fromCycleId !== null);

    if (!tasks.length) return;

    handleMoveTaskAcrossCycle(
      { projectId: projectid ?? '', tasks, to: { type: 'backlog' } },
      { onSuccess: () => setSelectedTaskIds([]) },
    );
  };

  const handleMoveSelectedToCycle = (cycleId: string) => {
    if (!defaultStageId) return;

    const tasks = selectedTaskIds
      .map((taskId) => ({
        taskId,
        fromCycleId: sourceCycleByTask.get(taskId) ?? null,
      }))
      // Skip tasks already in the target cycle, otherwise their stage gets reset
      .filter((t) => t.fromCycleId !== cycleId);

    if (!tasks.length) return;

    handleMoveTaskAcrossCycle(
      {
        projectId: projectid ?? '',
        tasks,
        to: { type: 'cycle', cycleId, stageId: defaultStageId },
      },
      { onSuccess: () => setSelectedTaskIds([]) },
    );
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <TableWrapper columns={columns}>
        <CycleHeaderElement
          variant="backlog"
          doneTasks={0}
          taskCount={allBacklogTasks?.length ?? 0}
        />
        {!!allBacklogTasks?.length &&
          allBacklogTasks.map((task) => (
            <AllTaskListItem
              key={task.id}
              task={task}
              gridTemplateColumns={gridTemplateColumns}
              isDone={false}
              onSelectionChange={handleTaskSelection}
              selectedTaskIds={selectedTaskIds}
            />
          ))}

        {cyclesWithStatus.map(({ cycle, status }) => (
          <CycleTaskSection
            key={cycle.id}
            cycle={cycle}
            status={status}
            tasks={tasksByCycle[cycle.id] ?? []}
            gridTemplateColumns={gridTemplateColumns}
            onSelectionChange={handleTaskSelection}
            selectedTaskIds={selectedTaskIds}
          />
        ))}
      </TableWrapper>
      {!!selectedTaskIds.length && (
        <CycleAllTaskSelectionFooter
          activeCycle={activeCycles[0]}
          selectedTaskLength={selectedTaskIds.length}
          onMoveToCycle={handleMoveSelectedToCycle}
          onMoveToBacklog={handleMoveSelectedToBacklog}
        />
      )}

      <TaskDetailsDrawer />
    </div>
  );
};

export default AllTaskPage;
