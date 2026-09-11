import { useParams, useSearchParams } from "react-router-dom";
import TableTaskPage from "./tasks/TableTaskPage";
import CardTaskPage from "./tasks/CardTaskPage";
import { useTasks } from "@/lib/services/tasks/hooks";
import { useProjectStages } from "@/lib/services/stages/hooks";
import TaskViewFooter from "@/features/tasks/components/TaskViewFooter";
import { useMemo, useState } from "react";
import type { Task } from "@/lib/services/tasks/types";
import BacklogDrawer from "@/features/tasks/components/BacklogDrawer";

const TaskViewPage = () => {
    const [searchParams] = useSearchParams();
    const [openBacklog, setOpenBacklog] = useState(false)

    const view = searchParams.get("view") === "table" ? "table" : "cards";
    const { projectid } = useParams<{ projectid: string }>();

    const { data: tasks, isLoading, isError, error } = useTasks(projectid ?? "");
    const { data: stages = [] } = useProjectStages(projectid ?? "");

    const taskList = tasks ?? [];

    const sortedStages = [...stages].sort((a, b) => a.order - b.order);

    const tasksByStage = useMemo(() =>
        taskList.reduce<Record<string, Task[]>>((acc, task) => {
            if (!acc[task.stageId])
                acc[task.stageId] = [];

            acc[task.stageId].push(task);
            return acc;
        }, {})
        , [taskList]);

    const backlogStage = sortedStages.find(
        (stage) => stage.name === "Backlog"
    );

    const backlogTasks = tasksByStage[backlogStage?.stageId ?? ""] ?? [];

    if (isError) return (<div>Error : {error.message}</div>)

    return (
        <>
            <div className="grid h-full min-h-0 min-w-fit grid-rows-[1fr_5dvh]">
                {view === "table" && (<TableTaskPage />)}

                {view === "cards" && (<CardTaskPage stages={sortedStages} tasksByStage={tasksByStage} isLoading={isLoading} projectId={projectid ?? ""} />)}

                <TaskViewFooter taskLength={backlogTasks.length} onClick={() => { setOpenBacklog(prev => !prev) }} />
            </div>

            {openBacklog && <BacklogDrawer handleClose={() => { setOpenBacklog(false) }} />}
        </>
    );
};

export default TaskViewPage;