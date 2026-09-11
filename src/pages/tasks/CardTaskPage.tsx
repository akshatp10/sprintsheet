import TaskCreateForm from "@/features/tasks/components/forms/TaskCreateForm";
import StageViewBox from "@/features/tasks/components/StageViewBox";
import type { Stage } from "@/lib/services/stages/type";
import type { Task } from "@/lib/services/tasks/types";
import { useState } from "react";

interface CardTaskPageProps {
    stages: Stage[];
    tasksByStage: Record<string, Task[]>;
    isLoading: boolean;
    projectId: string;
}

const CardTaskPage = ({
    stages,
    isLoading,
    projectId,
    tasksByStage,
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
                className="grid h-full gap-4 overflow-x-auto p-4"
                style={{
                    gridTemplateColumns: `repeat(${visibleStages.length}, minmax(15rem, 1fr))`,
                }}
            >
                {visibleStages.map((stage) => (
                    <StageViewBox
                        key={stage.id}
                        stage={stage}
                        tasks={tasksByStage[stage.stageId] ?? []}
                        isLoading={isLoading}
                        onCreateTask={handleCreateTask}
                    />
                ))}
            </div>

            {newTask && (
                <TaskCreateForm
                    projectId={projectId}
                    defaultStageId={clickedStageId}
                    onClose={handleCloseTaskForm}
                />
            )}
        </>
    );
};

export default CardTaskPage;