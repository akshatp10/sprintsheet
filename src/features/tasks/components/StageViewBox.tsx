import type { Stage } from "@/lib/services/stages/type";
import type { TaskWithUsers } from "@/lib/services/tasks/types";
import { useDroppable } from "@dnd-kit/react";
import { cn } from "@/lib/cn";
import StageHeader from "./StageHeader";
import StageTaskList from "./StageTaskList";
import { stageConfig } from "../stageConfig";

interface StageViewBoxProps {
    stage: Stage;
    tasks: TaskWithUsers[];
    isLoading: boolean;
    onCreateTask: (stageId: string) => void;
}

const StageViewBox = ({
    stage,
    tasks,
    isLoading,
    onCreateTask,
}: StageViewBoxProps) => {
    const { ref, isDropTarget } = useDroppable({
        id: stage.stageId,
    });

    const { container } = stageConfig[stage?.name];

    return (
        <div
            className={cn(
                "flex h-full min-h-0 flex-col rounded-md border",
                container,
            )}
        >
            <div className="sticky top-0 z-10">
                <StageHeader
                    stage={stage}
                    taskCount={tasks?.length}
                    onCreateTask={onCreateTask}
                />
            </div>

            <StageTaskList
                tasks={tasks}
                isLoading={isLoading}
                isDropTarget={isDropTarget}
                stageName={stage?.name}
                isTerminal={stage?.isTerminal}
                containerRef={ref}
            />
        </div>
    );
};

export default StageViewBox;