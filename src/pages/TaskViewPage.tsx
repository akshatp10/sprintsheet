import { useParams, useSearchParams } from "react-router-dom";
import TableTaskPage from "./tasks/TableTaskPage";
import CardTaskPage from "./tasks/CardTaskPage";
import { useTasks } from "@/lib/services/tasks/hooks";
import { useProjectStages } from "@/lib/services/stages/hooks";

const TaskViewPage = () => {
    const [searchParams] = useSearchParams();

    const view = searchParams.get("view") === "table" ? "table" : "cards";
    const { projectid } = useParams<{ projectid: string }>();

    const { data: tasks, isLoading, isError, error } = useTasks(projectid ?? "");
    const { data: stages = [] } = useProjectStages(projectid ?? "");

    if (isError) return (<div>Error : {error.message}</div>)

    return (
        <>
            {view === "table" && (<TableTaskPage />)}

            {view === "cards" && (<CardTaskPage tasks={tasks} stages={stages} isLoading={isLoading} />)}
        </>
    );
};

export default TaskViewPage;