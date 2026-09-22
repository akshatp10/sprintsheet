import { useParams, useSearchParams } from "react-router-dom";
import TableTaskPage from "./tasks/TableTaskPage";
import CardTaskPage from "./tasks/CardTaskPage";
import { useTasksByStage } from "@/lib/services/tasks/hooks";
import { useProjectStages } from "@/lib/services/stages/hooks";
import TaskViewFooter from "@/features/tasks/components/TaskViewFooter";
import { useState } from "react";
import BacklogDrawer from "@/features/tasks/components/BacklogDrawer";
import { isFeatureEnabled } from "@/config/features";

const TaskViewPage = () => {
    const [isDragging, setIsDragging] = useState(false)

    const [searchParams] = useSearchParams();
    const [openBacklog, setOpenBacklog] = useState(false);

    const view = searchParams.get("view") === "table" ? "table" : "cards";
    const { projectid } = useParams<{ projectid: string }>();

    const { data: tasksByStage = {}, isLoading, isError, error } = useTasksByStage(projectid ?? "");
    const { data: stages = [] } = useProjectStages(projectid ?? "");

    const sortedStages = [...stages].sort((a, b) => a.order - b.order);

    const backlogStage = sortedStages.find((stage) => stage.name === "Backlog");
    const backlogTasks = tasksByStage[backlogStage?.stageId ?? ""] ?? [];

    if (isError) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className="grid h-full min-h-0 min-w-fit grid-rows-[1fr_5dvh]">
                {view === "table" && <TableTaskPage />}
                {view === "cards" && (
                    <CardTaskPage
                        stages={sortedStages}
                        tasksByStage={tasksByStage}
                        isLoading={isLoading}
                        projectId={projectid ?? ""}
                        onDraggingChange={setIsDragging}
                    />
                )}
                <TaskViewFooter
                    taskLength={backlogTasks.length}
                    isCardHeld={isDragging}
                    onClick={() => {
                        if (isFeatureEnabled("SHOW_BACKLOG")) {
                            setOpenBacklog((prev) => !prev);
                        }
                    }}
                />
            </div>

            {openBacklog && <BacklogDrawer handleClose={() => setOpenBacklog(false)} />}
        </>
    );
};

export default TaskViewPage;