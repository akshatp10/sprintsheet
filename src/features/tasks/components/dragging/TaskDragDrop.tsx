import type { ReactNode } from "react";
import { useState } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";

import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";

interface TaskDragDropProps {
    children: ReactNode | ((state: { dragging: boolean; draggedTask: CycleTaskWithUsers | null; }) => ReactNode);
    tasksByStage: Record<string, CycleTaskWithUsers[]>;
    onDraggingChange: (isDragging: boolean) => void;
    onUpdateTaskStage: (taskId: string, stageId: string) => void;
    renderOverlay: (task: CycleTaskWithUsers) => ReactNode;
}

const TaskDragDrop = ({
    children,
    tasksByStage,
    onDraggingChange,
    onUpdateTaskStage,
    renderOverlay,
}: TaskDragDropProps) => {
    const [dragging, setDragging] = useState(false);

    const [draggedTask, setDraggedTask] =
        useState<CycleTaskWithUsers | null>(null);

    const getTaskById = (taskId: string) => {
        return Object.values(tasksByStage)
            .flat()
            .find((task) => task.id === taskId);
    };

    const content =
        typeof children === "function"
            ? children({
                dragging,
                draggedTask,
            })
            : children;

    return (
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

                onUpdateTaskStage(
                    String(taskId),
                    String(destinationStageId),
                );
            }}
        >
            {content}

            <DragOverlay
                dropAnimation={null}
                className={dragging ? "" : "hidden"}
            >
                {(source) => {
                    const task = getTaskById(String(source.id));

                    if (!task) return null;

                    return renderOverlay(task);
                }}
            </DragOverlay>
        </DragDropProvider>
    );
};

export default TaskDragDrop;