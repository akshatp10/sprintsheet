import TaskCreateForm from "@/features/tasks/components/forms/TaskCreateForm";
import StageViewBox from "@/features/tasks/components/StageViewBox";
import TaskCard from "@/features/tasks/components/TaskCard";
import type { Stage } from "@/lib/services/stages/type";
import { useUpdateTaskCycle } from "@/lib/services/taskCycles/hooks";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useState } from "react";

interface CardTaskPageProps {
    stages: Stage[];
    tasksByStage: Record<string, CycleTaskWithUsers[]>;
    isLoading: boolean;
    projectId: string;
    cycleId: string;
    onDraggingChange: (isDragging: boolean) => void;
}

const CardTaskPage = ({
    stages,
    isLoading,
    projectId,
    tasksByStage,
    onDraggingChange,
    cycleId
}: CardTaskPageProps) => {
    const [newTask, setNewTask] = useState(false);
    const [clickedStageId, setClickedStageId] = useState("");
    const [dragging, setDragging] = useState(false)
    const [draggedTask, setDraggedTask] = useState<CycleTaskWithUsers | null>()

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

    const { mutate: updateTaskCycleData } = useUpdateTaskCycle();

    const handleUpdateTaskStage = (taskId: string, stageId: string) => {
        const task = Object.values(tasksByStage).flat().find((task) => task.id === taskId);

        if (!task || task.stage.stageId === stageId) return;

        updateTaskCycleData({
            id: task.taskCycleId,
            cycleId: cycleId,
            stageId: stageId,
            taskId: taskId
        });
    };

    return (
        <>
            <div
                className="grid h-full min-h-0 gap-4 overflow-x-auto p-4"
                style={{
                    gridTemplateColumns: `repeat(${visibleStages.length}, minmax(15rem, 1fr))`,
                }}
            >
                <DragDropProvider
                    onDragStart={(event) => {
                        onDraggingChange(true);
                        setDragging(true)

                        const taskId = event.operation.source?.id;

                        if (!taskId) return;

                        const task = Object.values(tasksByStage)
                            .flat()
                            .find((task) => task.id === taskId);

                        setDraggedTask(task ?? null);
                    }}
                    onDragEnd={(event) => {
                        onDraggingChange(false);
                        setDragging(false)

                        if (event.canceled) return;

                        const taskId = event.operation.source?.id;
                        const destinationStageId = event.operation.target?.id;

                        if (!taskId || !destinationStageId) return;

                        handleUpdateTaskStage(
                            String(taskId),
                            String(destinationStageId),
                        );
                    }}
                >
                    {visibleStages.map((stage) => (
                        <StageViewBox
                            key={stage.id}
                            stage={stage}
                            tasks={tasksByStage[stage.id] ?? []}
                            isLoading={isLoading}
                            onCreateTask={handleCreateTask}
                            isCurrentStage={draggedTask?.stage.stageId === stage.stageId}
                        />
                    ))}

                    <DragOverlay dropAnimation={null} className={dragging ? "" : "hidden"}>
                        {(source) => {
                            const task = Object.values(tasksByStage)
                                .flat()
                                .find((task) => task.id === source.id);

                            if (!task) return null;

                            return (
                                <TaskCard
                                    task={task}
                                    isDone={false}
                                    isOverlay
                                />
                            );
                        }}
                    </DragOverlay>
                </DragDropProvider>
            </div >

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