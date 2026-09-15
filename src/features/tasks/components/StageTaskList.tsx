import TaskCardSkeleton from "@/features/tasks/components/skeletons/TaskCardSkeleton";
import type { TaskWithUsers } from "@/lib/services/tasks/types";
import { cn } from "@/lib/cn";
import DraggableTaskCard from "./DraggableTaskCard";
import { stageConfig } from "../stageConfig";

interface StageTaskListProps {
    tasks: TaskWithUsers[];
    isLoading: boolean;
    isDropTarget: boolean;
    stageName: keyof typeof stageConfig;
    isTerminal: boolean;
    containerRef: (element: HTMLElement | null) => void;
}

const StageTaskList = ({
    tasks,
    isLoading,
    isDropTarget,
    stageName,
    isTerminal,
    containerRef,
}: StageTaskListProps) => {
    const { chip } = stageConfig[stageName];

    return (
        <div
            ref={containerRef}
            className="flex-1 space-y-3 overflow-y-auto p-2"
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

                    {isDropTarget && (
                        <div
                            className={cn(
                                "flex h-20 items-center justify-center rounded-md border-2",
                                chip,
                            )}
                        >
                            Drop task here
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StageTaskList;