import CycleHeaderElement from "@/features/cycles/components/CycleHeaderElement";
import AllTaskListItem from "@/features/tasks/components/listView/AllTaskListItem";
import type { Cycle } from "@/lib/services/cycles/types";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";

interface CycleTaskSectionProps {
    cycle: Cycle;
    status: "active" | "closed" | "planned";
    tasks: CycleTaskWithUsers[];
    gridTemplateColumns: string;
}

const CycleTaskSection = ({
    cycle,
    status,
    tasks,
    gridTemplateColumns,
}: CycleTaskSectionProps) => {
    return (
        <>
            <CycleHeaderElement
                variant={status === "active" ? "active" : "other"}
                cycle={cycle}
                taskCount={tasks?.length}
            />

            {tasks.map((task) => (
                <AllTaskListItem
                    key={task.id}
                    task={task}
                    gridTemplateColumns={gridTemplateColumns}
                    isDone={false}
                />
            ))}
        </>
    );
};

export default CycleTaskSection;