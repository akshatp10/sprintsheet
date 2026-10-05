import TableWrapper from '@/components/table/TableWrapper';
import StageListBox from '@/features/stages/components/StageListBox';
import TaskDragDrop from '@/features/tasks/components/dragging/TaskDragDrop';
import TaskCreateForm from '@/features/tasks/components/forms/TaskCreateForm';
import TaskListElement from '@/features/tasks/components/listView/TaskListElement';
import type { Stage } from '@/lib/services/stages/type';
import type { CycleTaskWithUsers } from '@/lib/services/tasks/types';
import { useState } from 'react';

interface TableTaskPageProps {
  stages: Stage[];
  tasksByStage: Record<string, CycleTaskWithUsers[]>;
  isLoading: boolean;
  projectId: string;
  cycleId: string;
  onDraggingChange: (isDragging: boolean) => void;
  onUpdateTaskStage: (taskId: string, stageId: string) => void;
}

const columns = [
  {
    key: 'serialNo',
    label: '',
    width: '40px',
  },
  {
    key: 'type',
    label: 'TYPE',
    width: '100px',
  },
  // {
  //     key: "platform",
  //     label: "PLATFORM",
  //     width: "100px",
  // },
  {
    key: 'title',
    label: 'TITLE',
    width: 'minmax(200px, 1fr)',
  },
  {
    key: 'assignee',
    label: 'ASSIGNEE',
    width: '120px',
  },
  {
    key: 'status',
    label: 'STATUS',
    width: '120px',
  },
  {
    key: 'due',
    label: 'DUE',
    width: '100px',
  },
  {
    key: 'tags',
    label: 'TAGS',
    width: '140px',
  },
];

const gridTemplateColumns = [...columns.map((column) => column.width)].join(' ');

const TableTaskPage = ({
  stages,
  tasksByStage,
  isLoading,
  projectId,
  cycleId,
  onUpdateTaskStage,
  onDraggingChange,
}: TableTaskPageProps) => {
  const [newTask, setNewTask] = useState(false);
  const [clickedStageId, setClickedStageId] = useState('');

  const visibleStages = stages.filter((stage) => stage.name !== 'Backlog');

  const handleCreateTask = (stageId: string) => {
    setClickedStageId(stageId);
    setNewTask(true);
  };

  const handleCloseTaskForm = () => {
    setNewTask(false);
    setClickedStageId('');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TableWrapper columns={columns}>
        <TaskDragDrop
          tasksByStage={tasksByStage}
          onDraggingChange={onDraggingChange}
          onUpdateTaskStage={onUpdateTaskStage}
          renderOverlay={(task) => (
            <TaskListElement
              task={task}
              isDone={false}
              isOverlay
              taskNumber={0}
              gridTemplateColumns={gridTemplateColumns}
            />
          )}
        >
          {({ draggedTask }) =>
            visibleStages.map((stage) => {
              const tasks = tasksByStage[stage.id] ?? [];

              return (
                <StageListBox
                  key={stage.id}
                  stage={stage}
                  tasks={tasks}
                  isLoading={isLoading}
                  onCreateTask={handleCreateTask}
                  isCurrentStage={draggedTask?.stage.stageId === stage.stageId}
                  gridTemplateColumns={gridTemplateColumns}
                />
              );
            })
          }
        </TaskDragDrop>
      </TableWrapper>

      {newTask && (
        <TaskCreateForm
          projectId={projectId}
          defaultStageId={clickedStageId}
          onClose={handleCloseTaskForm}
          cycleId={cycleId}
        />
      )}
    </>
  );
};

export default TableTaskPage;
