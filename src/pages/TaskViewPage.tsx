import { useSearchParams } from "react-router-dom";
import TableTaskPage from "./tasks/TableTaskPage";
import CardTaskPage from "./tasks/CardTaskPage";

const TaskViewPage = () => {
    const [searchParams] = useSearchParams();

    const view =
        searchParams.get("view") === "table" ? "table" : "cards";

    return (
        <div>
            {view === "table" && (<TableTaskPage />)}

            {view === "cards" && (<CardTaskPage />)}
        </div>
    );
};

export default TaskViewPage;