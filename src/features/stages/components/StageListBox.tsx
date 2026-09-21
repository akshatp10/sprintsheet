import Text from "@/components/common/Text";
import { cn } from "@/lib/cn";
import { stageConfig, StageName } from "@/lib/stageConfig";
import type { Stage } from "@/lib/services/stages/type";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";
import { useDroppable } from "@dnd-kit/react";
import { useState } from "react";
import StageListHeader from "./StageListHeader";
import DraggableTaskListElement from "@/features/tasks/components/DraggableListElement";

interface StageListBoxProps {
    stage: Stage;
    tasks: CycleTaskWithUsers[];
    isLoading: boolean;
    isCurrentStage: boolean;
    onCreateTask: (stageId: string) => void;
}

const StageListBox = ({
    stage,
    tasks,
    isLoading,
    isCurrentStage,
    onCreateTask,
}: StageListBoxProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { ref, isDropTarget } = useDroppable({
        id: stage.id,
    });

    const { chip } =
        stageConfig[stage.name as StageName];

    const handleToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div className="relative w-full" ref={ref}>
            {/* Drop target */}
            {isDropTarget && !isCurrentStage && (
                <div
                    className={cn(
                        "absolute inset-0 z-40 flex items-center justify-center",
                        "rounded-md",
                        chip,
                        "opacity-70",
                    )}
                >
                    <Text variant="h2">
                        Drop task here
                    </Text>
                </div>
            )}

            {/* Stage Header */}
            <StageListHeader
                stage={stage}
                taskCount={tasks.length}
                isCollapsed={isCollapsed}
                onToggle={handleToggle}
                onCreateTask={onCreateTask}

            />

            {/* Tasks */}
            {!isCollapsed && (
                <div>
                    {isLoading ? (
                        <div className="h-12 border-b border-lines-hairline" />
                    ) : (
                        tasks.map((task, index) => (
                            <DraggableTaskListElement
                                key={task.id}
                                task={task}
                                taskNumber={
                                    1 + index
                                }
                                isDone={stage.isTerminal}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default StageListBox;