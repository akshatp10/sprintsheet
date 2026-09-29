import { TASK_LIST_GRID } from "./TaskListElement";

const TaskListPlaceholder = () => {
    return (
        <div
            className="grid min-h-10 border-b border-lines-hairline bg-surface-desk/50"
            style={{
                gridTemplateColumns: TASK_LIST_GRID,
            }}
        >
        </div>
    );
};

export default TaskListPlaceholder;