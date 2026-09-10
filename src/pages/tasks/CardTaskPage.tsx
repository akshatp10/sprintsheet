import TaskCard from "@/features/tasks/components/TaskCard";
import type { Task } from "@/lib/services/tasks/types";

interface CardTaskPageProps {
    tasks: Task[] | undefined;
    isLoading: boolean;
}

const CardTaskPage = ({
    tasks,
    isLoading,
}: CardTaskPageProps) => {
    if (isLoading) {
        return <div>Loading Tasks</div>;
    }

    if (!tasks?.length) {
        return <div>No task found</div>;
    }

    return (
        <div className="p-4">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    isDone={task.stageId === "Done"}
                />
            ))}
        </div>
    );
};

export default CardTaskPage;