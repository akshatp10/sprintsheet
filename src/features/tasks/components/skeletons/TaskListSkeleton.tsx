const TaskListSkeleton = ({ gridTemplateColumns }: { gridTemplateColumns: string }) => {
  return (
    <div
      className="grid min-h-10 border-b border-lines-hairline bg-surface-page animate-pulse"
      style={{ gridTemplateColumns }}
    >
      {/* Number */}
      <div className="flex items-center border-r border-lines-hairline px-3 bg-surface-desk">
        <div className="mx-auto h-3 w-5 rounded bg-lines-hairline" />
      </div>

      {/* Type */}
      <div className="flex items-center border-r border-lines-hairline px-3">
        <div className="h-4 w-10 rounded bg-lines-hairline" />
      </div>

      {/* Title */}
      <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">
        <div className="h-4 w-2/3 rounded bg-lines-hairline" />
      </div>

      {/* Assignee */}
      <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">
        <div className="h-6 w-6 rounded-full bg-lines-hairline" />
      </div>

      {/* Status */}
      <div className="flex items-center border-r border-lines-hairline px-3">
        <div className="h-4 w-14 rounded bg-lines-hairline" />
      </div>

      {/* Due */}
      <div className="flex items-center border-r border-lines-hairline px-3">
        <div className="h-3 w-20 rounded bg-lines-hairline" />
      </div>

      {/* Tags */}
      <div className="flex min-w-0 items-center gap-1 px-3">
        <div className="h-4 w-12 rounded bg-lines-hairline" />
        <div className="h-4 w-8 rounded bg-lines-hairline" />
      </div>
    </div>
  );
};

export default TaskListSkeleton;
