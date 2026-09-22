import { useParams, useSearchParams } from "react-router-dom";
import TableTaskPage from "./tasks/TableTaskPage";
import CardTaskPage from "./tasks/CardTaskPage";
// import { useTasksByStage } from "@/lib/services/tasks/hooks";
import { useProjectStages } from "@/lib/services/stages/hooks";
import TaskViewFooter from "@/features/tasks/components/TaskViewFooter";
import { useState } from "react";
import BacklogDrawer from "@/features/tasks/components/BacklogDrawer";
import { useBacklogTasks, useTasksByStage } from "@/lib/services/tasks/hooks";

const TaskViewPage = () => {
    const [isDragging, setIsDragging] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();
    const [openBacklog, setOpenBacklog] = useState(false);

    const currentCycleId = searchParams.get("cycle") ?? "";

    const view = searchParams.get("view") === "table" ? "table" : "cards";
    const { projectid } = useParams<{ projectid: string }>();

    const { data: tasksByStage = {}, isLoading, isError, error } = useTasksByStage(currentCycleId ?? "");
    const { data: stages = [] } = useProjectStages(projectid ?? "");

    const sortedStages = [...stages].sort((a, b) => a.order - b.order);

    const { data: backlogTasks = [] } = useBacklogTasks(projectid ?? "");

    const handleCycleChange = (cycleId: string) => {
        setSearchParams((prev) => {
            prev.set("cycle", cycleId);
            return prev;
        });
    };

    if (isError) return <div>Error: {error.message}</div>;
    return (
        <>
            <div className="grid h-full min-h-0 min-w-fit grid-rows-[1fr_5dvh]">
                {view === "table" && <TableTaskPage />}
                {view === "cards" && (
                    <CardTaskPage
                        stages={sortedStages}
                        tasksByStage={tasksByStage}
                        cycleId={currentCycleId}
                        isLoading={isLoading}
                        projectId={projectid ?? ""}
                        onDraggingChange={setIsDragging}
                    />
                )}
                <TaskViewFooter projectId={projectid ?? ""} taskLength={backlogTasks.length} isCardHeld={isDragging} onClick={() => setOpenBacklog((prev) => !prev)} currentCycleId={currentCycleId} setCurrentCycleId={handleCycleChange} />
            </div>

            {openBacklog && <BacklogDrawer handleClose={() => setOpenBacklog(false)} />}
        </>
    );
};

export default TaskViewPage;