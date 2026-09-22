import { useParams, useSearchParams } from "react-router-dom";
import TableTaskPage from "./tasks/TableTaskPage";
import CardTaskPage from "./tasks/CardTaskPage";
// import { useTasksByStage } from "@/lib/services/tasks/hooks";
import { useProjectStages } from "@/lib/services/stages/hooks";
import TaskViewFooter from "@/features/tasks/components/TaskViewFooter";
import { useEffect, useState } from "react";
import BacklogDrawer from "@/features/tasks/components/BacklogDrawer";
import { useBacklogTasks, useTasksByStage } from "@/lib/services/tasks/hooks";
import { useCycles } from "@/lib/services/cycles/hooks";
import { useUpdateTaskCycle } from "@/lib/services/taskCycles/hooks";

const TaskViewPage = () => {
    const [isDragging, setIsDragging] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();
    const [openBacklog, setOpenBacklog] = useState(false);

    const currentCycleId = searchParams.get("cycle") ?? "";

    const view = searchParams.get("view") === "cards" ? "cards" : "table";
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

    const { mutate: updateTaskCycle } = useUpdateTaskCycle();

    const handleUpdateTaskStage = (taskId: string, stageId: string) => {
        const task = Object.values(tasksByStage)
            .flat()
            .find((task) => task.id === taskId);

        if (!task || task.stage.stageId === stageId) return;

        updateTaskCycle({
            id: task.taskCycleId,
            cycleId: currentCycleId,
            stageId,
            taskId,
        });
    };

    if (isError) return <div>Error: {error.message}</div>;
    return (
        <>
            <div className="grid h-full min-h-0 min-w-fit grid-rows-[1fr_5dvh]">
                {view === "table" && (
                    <TableTaskPage
                        stages={sortedStages}
                        tasksByStage={tasksByStage}
                        cycleId={currentCycleId}
                        isLoading={isLoading}
                        projectId={projectid ?? ""}
                        onDraggingChange={setIsDragging}
                        onUpdateTaskStage={handleUpdateTaskStage}
                    />
                )}
                {view === "cards" && (
                    <CardTaskPage
                        stages={sortedStages}
                        tasksByStage={tasksByStage}
                        cycleId={currentCycleId}
                        isLoading={isLoading}
                        projectId={projectid ?? ""}
                        onDraggingChange={setIsDragging}
                        onUpdateTaskStage={handleUpdateTaskStage}
                    />
                )}
                <TaskViewFooter projectId={projectid ?? ""} taskLength={backlogTasks.length} isCardHeld={isDragging} onClick={() => setOpenBacklog((prev) => !prev)} cycles={cycles} currentCycleId={currentCycleId} setCurrentCycleId={handleCycleChange} />
            </div>

            {openBacklog && <BacklogDrawer handleClose={() => setOpenBacklog(false)} />}
        </>
    );
};

export default TaskViewPage;