import Text from "@/components/common/Text";
import StageListBox from "@/features/stages/components/StageListBox";
import TaskCreateForm from "@/features/tasks/components/forms/TaskCreateForm";
import TaskListElement from "@/features/tasks/components/TaskListElement";
import type { Stage } from "@/lib/services/stages/type";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useState } from "react";

interface TableTaskPageProps {
    stages: Stage[];
    tasksByStage: Record<string, CycleTaskWithUsers[]>;
    isLoading: boolean;
    projectId: string;
    cycleId: string;
    onDraggingChange: (isDragging: boolean) => void;
    onUpdateTaskStage: (taskId: string, stageId: string) => void;
}

const columns = [
    {
        key: "type",
        label: "TYPE",
        width: "100px",
    },
    // {
    //     key: "platform",
    //     label: "PLATFORM",
    //     width: "100px",
    // },
    {
        key: "title",
        label: "TITLE",
        width: "1fr",
    },
    {
        key: "assignee",
        label: "ASSIGNEE",
        width: "160px",
    },
    {
        key: "status",
        label: "STATUS",
        width: "120px",
    },
    {
        key: "due",
        label: "DUE",
        width: "100px",
    },
    {
        key: "tags",
        label: "TAGS",
        width: "140px",
    },
];

const gridTemplateColumns = [
    "40px",
    ...columns.map((column) => column.width),
].join(" ");

const TableTaskPage = ({
    stages,
    tasksByStage,
    isLoading,
    projectId,
    cycleId,
    onUpdateTaskStage,
    onDraggingChange,
}: TableTaskPageProps) => {

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="w-full overflow-hidden rounded-md">
                {/* Table Header */}
                <div
                    className="grid h-10 border-b border-lines-control bg-surface-desk text-xs font-medium"
                    style={{ gridTemplateColumns }}
                >
                    <div className="flex items-center border-r border-lines-control px-3" />

                    {columns.map((column) => (
                        <Text
                            key={column.key}
                            className="flex items-center border-r border-lines-control px-3 last:border-r-0 text-ink-3"
                        >
                            {column.label}
                        </Text>
                    ))}
                </div>

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
                    {/* Stages */}
                    {visibleStages.map((stage) => {
                        const tasks = tasksByStage[stage.id] ?? [];

                        return (
                            <StageListBox
                                key={stage.id}
                                stage={stage}
                                tasks={tasks}
                                isLoading={isLoading}
                                onCreateTask={handleCreateTask}
                                isCurrentStage={draggedTask?.stage.stageId === stage.stageId}
                            />
                        );
                    })}

                    <DragOverlay dropAnimation={null} className={dragging ? "" : "hidden"}>
                        {(source) => {
                            const task = Object.values(tasksByStage)
                                .flat()
                                .find((task) => task.id === source.id);

                            if (!task) return null;

                            return (
                                <TaskListElement
                                    task={task}
                                    isDone={false}
                                    isOverlay
                                    taskNumber={0}
                                />
                            );
                        }}
                    </DragOverlay>
                </DragDropProvider >
            </div>

            {
                newTask && (
                    <TaskCreateForm
                        projectId={projectId}
                        defaultStageId={clickedStageId}
                        onClose={handleCloseTaskForm}
                        cycleId={cycleId}
                    />
                )
            }
        </>
    );
};

export default TableTaskPage;