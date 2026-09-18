import { useParams, useSearchParams } from "react-router-dom";
import TableTaskPage from "./tasks/TableTaskPage";
import CardTaskPage from "./tasks/CardTaskPage";
// import { useTasksByStage } from "@/lib/services/tasks/hooks";
import { useProjectStages } from "@/lib/services/stages/hooks";
import TaskViewFooter from "@/features/tasks/components/TaskViewFooter";
import { useEffect, useState } from "react";
import BacklogDrawer from "@/features/tasks/components/BacklogDrawer";
import { isFeatureEnabled } from "@/config/features";
import { useBacklogTasks, useTasksByStage } from "@/lib/services/tasks/hooks";
import { useCycles } from "@/lib/services/cycles/hooks";

const TaskViewPage = () => {
    const [isDragging, setIsDragging] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();
    const [openBacklog, setOpenBacklog] = useState(false);

    const currentCycleId = searchParams.get("cycle") ?? "";

    const view = searchParams.get("view") === "table" ? "table" : "cards";
    const { projectid } = useParams<{ projectid: string }>();

    const { data: tasksByStage = {}, isLoading, isError, error } = useTasksByStage(currentCycleId ?? "");
    const { data: stages = [] } = useProjectStages(projectid ?? "");
    const { data: cycles = [] } = useCycles(projectid ?? "");
    const { data: backlogTasks = [] } = useBacklogTasks(projectid ?? "");

    const sortedStages = [...stages].sort((a, b) => a.order - b.order);

    useEffect(() => {
        if (currentCycleId) return;

        if (cycles.length === 0) return;

        const now = new Date();

        // Get active cycle on the basis of current date
        const currentCycle = cycles.find((cycle) => {
            const startDate = new Date(cycle.startDate);
            const endDate = new Date(cycle.endDate);

            return now >= startDate && now <= endDate;
        });

        if (!currentCycle) return;

        setSearchParams(
            (prev) => {
                prev.set("cycle", currentCycle.id);
                return prev;
            },
            { replace: true }
        );
    }, [currentCycleId, cycles, setSearchParams]);

    const handleCycleChange = (cycleId: string) => {
        setSearchParams((prev) => {
            prev.set("cycle", cycleId);
            return prev;
        });
    };

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
                <TaskViewFooter
                    projectId={projectid ?? ""} taskLength={backlogTasks.length}
                    isCardHeld={isDragging}
                    onClick={() => {
                        if (isFeatureEnabled("SHOW_BACKLOG")) {
                            setOpenBacklog((prev) => !prev);
                        }
                    }}
                    cycles={cycles} currentCycleId={currentCycleId} setCurrentCycleId={handleCycleChange} />
            </div>

            {openBacklog && <BacklogDrawer handleClose={() => setOpenBacklog(false)} />}
        </>
    );
};

export default TaskViewPage;