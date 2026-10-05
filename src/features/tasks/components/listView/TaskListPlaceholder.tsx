interface TaskListPlaceholderProps {
  gridTemplateColumns: string;
}

const TaskListPlaceholder = ({ gridTemplateColumns }: TaskListPlaceholderProps) => {
  return (
    <div
      className="grid min-h-10 border-b border-lines-hairline bg-surface-desk/50"
      style={{
        gridTemplateColumns,
      }}
    ></div>
  );
};

export default TaskListPlaceholder;
