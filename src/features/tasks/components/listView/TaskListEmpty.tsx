import Text from "@/components/common/Text";

interface TaskListEmptyProps {
    gridTemplateColumns: string;
}


const TaskListEmpty = ({ gridTemplateColumns }: TaskListEmptyProps) => {
    return (
        <div
            className="grid min-h-10 border-b border-lines-hairline bg-surface-page"
            style={{
                gridTemplateColumns
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