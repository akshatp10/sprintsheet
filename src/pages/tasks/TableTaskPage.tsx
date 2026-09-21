import Text from "@/components/common/Text";
import StageListBox from "@/features/stages/components/StageListBox";
import type { Stage } from "@/lib/services/stages/type";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";

interface TableTaskPageProps {
    stages: Stage[];
    tasksByStage: Record<string, CycleTaskWithUsers[]>;
    isLoading: boolean;
    projectId: string;
    cycleId: string;
    onDraggingChange: (isDragging: boolean) => void;
}

const columns = [
    {
        key: "type",
        label: "TYPE",
        width: "100px",
    },
    // {
    //     key: "platform",
    //     label: "PLATFORM",
    //     width: "100px",
    // },
    {
        key: "title",
        label: "TITLE",
        width: "1fr",
    },
    {
        key: "assignee",
        label: "ASSIGNEE",
        width: "160px",
    },
    {
        key: "status",
        label: "STATUS",
        width: "120px",
    },
    {
        key: "due",
        label: "DUE",
        width: "100px",
    },
    {
        key: "tags",
        label: "TAGS",
        width: "140px",
    },
];

const gridTemplateColumns = [
    "40px",
    ...columns.map((column) => column.width),
].join(" ");

const TableTaskPage = ({
    stages,
    tasksByStage,
    isLoading,
}: TableTaskPageProps) => {

    const visibleStages = stages.filter(
        (stage) => stage.name !== "Backlog",
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full overflow-hidden rounded-md">
            {/* Table Header */}
            <div
                className="grid h-10 border-b border-lines-control bg-surface-desk text-xs font-medium"
                style={{ gridTemplateColumns }}
            >
                <div className="flex items-center border-r border-lines-control px-3" />

                {columns.map((column) => (
                    <Text
                        key={column.key}
                        className="flex items-center border-r border-lines-control px-3 last:border-r-0 text-ink-3"
                    >
                        {column.label}
                    </Text>
                ))}
            </div>

            {/* Stages */}
            {visibleStages.map((stage) => {
                const tasks = tasksByStage[stage.id] ?? [];

                return (
                    <StageListBox
                        key={stage.id}
                        stage={stage}
                        tasks={tasks}
                        isLoading={isLoading}
                        isCurrentStage={false}
                    />
                );
            })}
        </div>
    );
};

export default TableTaskPage;