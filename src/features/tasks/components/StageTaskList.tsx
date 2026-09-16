import TaskCardSkeleton from "@/features/tasks/components/skeletons/TaskCardSkeleton";
import type { TaskWithUsers } from "@/lib/services/tasks/types";
import DraggableTaskCard from "./DraggableTaskCard";

interface StageTaskListProps {
    tasks: TaskWithUsers[];
    isLoading: boolean;
    isDropTarget: boolean;
    isTerminal: boolean;
    containerRef: (element: HTMLElement | null) => void;
}

const StageTaskList = ({
    tasks,
    isLoading,
    isDropTarget,
    isTerminal,
    containerRef,
}: StageTaskListProps) => {
    return (
        <div
            ref={containerRef}
            className="flex-1 space-y-3 overflow-y-auto p-2 sticky"
        >
            {isLoading ? (
                Array.from({ length: 2 }, (_, index) => (
                    <TaskCardSkeleton key={index} />
                ))
            ) : (
                <>
                    {tasks.map((task) => (
                        <DraggableTaskCard
                            key={task.id}
                            task={task}
                            isDone={isTerminal}
                        />
                    ))}

                    {!tasks.length && !isDropTarget && (
                        <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-lines-control text-sm text-ink-2">
                            No tasks
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StageTaskList;