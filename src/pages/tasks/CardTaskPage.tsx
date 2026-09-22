import TaskDragDrop from "@/features/tasks/components/dragging/TaskDragDrop";
import TaskCreateForm from "@/features/tasks/components/forms/TaskCreateForm";
import StageViewBox from "@/features/tasks/components/StageViewBox";
import TaskCard from "@/features/tasks/components/TaskCard";
import type { Stage } from "@/lib/services/stages/type";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";
import { useState } from "react";

interface CardTaskPageProps {
    stages: Stage[];
    tasksByStage: Record<string, CycleTaskWithUsers[]>;
    isLoading: boolean;
    projectId: string;
    cycleId: string;
    onDraggingChange: (isDragging: boolean) => void;
    onUpdateTaskStage: (taskId: string, stageId: string) => void;
}

const CardTaskPage = ({
    stages,
    isLoading,
    projectId,
    tasksByStage,
    onDraggingChange,
    cycleId,
    onUpdateTaskStage
}: CardTaskPageProps) => {
    const [newTask, setNewTask] = useState(false);
    const [clickedStageId, setClickedStageId] = useState("");

    const visibleStages = stages.filter(
        (stage) => stage.name !== "Backlog",
    );

    const handleCreateTask = (stageId: string) => {
        setClickedStageId(stageId);
        setNewTask(true);
    };

    const handleCloseTaskForm = () => {
        setNewTask(false);
        setClickedStageId("");
    };

    return (
        <>
            <div
                className="grid h-full min-h-0 gap-4 overflow-x-auto p-4"
                style={{
                    gridTemplateColumns: `repeat(${visibleStages.length}, minmax(15rem, 1fr))`,
                }}
            >
                <TaskDragDrop
                    tasksByStage={tasksByStage}
                    onDraggingChange={onDraggingChange}
                    onUpdateTaskStage={onUpdateTaskStage}
                    renderOverlay={(task) => (
                        <TaskCard
                            task={task}
                            isDone={false}
                            isOverlay
                        />
                    )}
                >
                    {({ draggedTask }) =>
                        visibleStages.map((stage) => (
                            <StageViewBox
                                key={stage.id}
                                stage={stage}
                                tasks={tasksByStage[stage.id] ?? []}
                                isLoading={isLoading}
                                onCreateTask={handleCreateTask}
                                isCurrentStage={draggedTask?.stage.stageId === stage.stageId}
                            />
                        ))
                    }
                </TaskDragDrop>
            </div>

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

export default CardTaskPage;