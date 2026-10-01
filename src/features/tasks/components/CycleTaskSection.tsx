import CycleHeaderElement from "@/features/cycles/components/CycleHeaderElement";
import AllTaskListItem from "@/features/tasks/components/listView/AllTaskListItem";
import type { Cycle } from "@/lib/services/cycles/types";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";

interface CycleTaskSectionProps {
    cycle: Cycle;
    status: "active" | "closed" | "planned";
    tasks: CycleTaskWithUsers[];
    gridTemplateColumns: string;
    onSelectionChange: (taskId: string, selected: boolean) => void;
    selectedTaskIds: string[];
}

const CycleTaskSection = ({
    cycle,
    status,
    tasks,
    gridTemplateColumns,
    onSelectionChange,
    selectedTaskIds
}: CycleTaskSectionProps) => {

    const doneTasks = tasks ? tasks.filter((task => task.stage.isTerminal === true)).length : 0;

    return (
        <>
            <CycleHeaderElement
                variant={status === "active" ? "active" : "other"}
                cycle={cycle}
                taskCount={tasks?.length}
                doneTasks={doneTasks}
            />

            {tasks.map((task) => (
                <AllTaskListItem
                    key={task.id}
                    task={task}
                    gridTemplateColumns={gridTemplateColumns}
                    isDone={false}
                    onSelectionChange={onSelectionChange}
                    selectedTaskIds={selectedTaskIds}
                />
            ))}
        </>
    );
};

export default CycleTaskSection;