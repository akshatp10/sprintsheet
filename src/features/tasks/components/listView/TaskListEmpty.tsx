import { TASK_LIST_GRID } from "./TaskListElement";
import Text from "@/components/common/Text";

const TaskListEmpty = () => {
    return (
        <div
            className="grid min-h-12 border-b border-lines-hairline bg-surface-page"
            style={{
                gridTemplateColumns: TASK_LIST_GRID,
            }}
        >
            <div className="col-span-full flex items-center justify-center">
                <Text
                    variant="body-sm"
                    className="text-ink-fades-placeholders"
                >
                    No tasks
                </Text>
            </div>
        </div>
    );
};

export default TaskListEmpty;