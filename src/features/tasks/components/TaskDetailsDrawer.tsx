import useTaskDetailStore from '@/store/taskDetailStore';
import TaskDetailForm from './forms/TaskDetailForm';

interface TaskDetailsDrawerProps {
  className?: string;
}

const TaskDetailsDrawer = ({ className }: TaskDetailsDrawerProps) => {
  const currentTask = useTaskDetailStore((state) => state.currentTask);
  const closeTask = useTaskDetailStore((state) => state.closeTask);

  if (!currentTask) return null;

  return (
    <TaskDetailForm
      key={currentTask.id}
      task={currentTask}
      className={className}
      onClose={closeTask}
    />
  );
};

export default TaskDetailsDrawer;
