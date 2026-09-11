const TaskCardSkeleton = () => {
    return (
        <div className="rounded-md border-2 border-lines-hairline w-full min-h-fit bg-surface px-4 py-2 flex flex-col gap-2 justify-center animate-pulse">
            {/* Task ID + Tags */}
            <div className="w-full flex justify-between items-center">
                <div className="h-3 w-16 rounded bg-lines-hairline" />

                <div className="flex gap-2">
                    <div className="h-3 w-6 rounded bg-lines-hairline" />
                    <div className="h-3 w-6 rounded bg-lines-hairline" />
                </div>
            </div>

            {/* Task name */}
            <div className="h-6 w-3/4 rounded bg-lines-hairline" />

            {/* Task type */}
            <div className="h-4 w-10 rounded bg-lines-hairline" />

            {/* Assignees + Due date */}
            <div className="flex items-center justify-start gap-4">
                <div className="h-8 w-8 rounded-full bg-lines-hairline" />

                <div className="h-4 w-20 rounded bg-lines-hairline" />
            </div>
        </div>
    );
};

export default TaskCardSkeleton;