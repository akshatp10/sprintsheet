import type { Stage } from "@/lib/services/stages/type";
import type { TaskWithUsers } from "@/lib/services/tasks/types";
import { useDroppable } from "@dnd-kit/react";
import { cn } from "@/lib/cn";
import StageHeader from "./StageHeader";
import StageTaskList from "./StageTaskList";
import { stageConfig, StageName } from "@/lib/stageConfig";
import Text from "@/components/common/Text";

interface StageViewBoxProps {
    stage: Stage;
    tasks: TaskWithUsers[];
    isLoading: boolean;
    onCreateTask: (stageId: string) => void;
    isCurrentStage: boolean

}

const StageViewBox = ({
    stage,
    tasks,
    isLoading,
    onCreateTask,
    isCurrentStage,

}: StageViewBoxProps) => {
    const { ref, isDropTarget } = useDroppable({
        id: stage.stageId,
    });

    const { container, chip } = stageConfig[stage?.name as StageName];

    return (
        <div
            className={cn(
                "relative flex h-full min-h-0 flex-col rounded-md border",
                container,
            )}
        >
            {isDropTarget && !isCurrentStage && (
                <div className={cn("absolute inset-0 z-40 flex items-center justify-center rounded-md", chip, "opacity-70")}>
                    <Text className="" variant="h2">
                        Drop task here
                    </Text>
                </div>
            )}
            <div className="sticky top-0">
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
                isTerminal={stage?.isTerminal}
                containerRef={ref}
            />
        </div>
    );
};

export default StageViewBox;