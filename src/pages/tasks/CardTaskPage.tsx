import TaskCard from "@/features/tasks/components/TaskCard";
import type { Stage } from "@/lib/services/stages/type";
import type { Task } from "@/lib/services/tasks/types";

interface CardTaskPageProps {
    tasks: Task[] | undefined;
    stages: Stage[];
    isLoading: boolean;
}

const CardTaskPage = ({ tasks, stages, isLoading }: CardTaskPageProps) => {
    if (isLoading) return <div>Loading Tasks</div>;
    if (!tasks?.length) return <div>No task found</div>;

    const sortedStages = [...stages].sort((a, b) => a.order - b.order);
    console.log(sortedStages);

    return (
        <div
            className="grid gap-4 overflow-x-auto p-4 h-full"
            style={{
                gridTemplateColumns: `repeat(${sortedStages.length}, minmax(15rem, 1fr))`,
            }}
        >
            {sortedStages.map((stage) => {
                const stageTasks = tasks.filter((t) => t.stageId === stage.stageId);

                return (
                    <div
                        key={stage.id}
                        className="flex h-full flex-col rounded-md bg-muted/50"
                    >
                        <div className="flex shrink-0 items-center justify-between border-b p-4">
                            <h2 className="font-semibold">{stage.name}</h2>
                            <span className="text-sm text-muted-foreground">
                                {stageTasks.length}
                            </span>
                        </div>

                        <div className="flex-1 space-y-3 overflow-y-auto p-3">
                            {stageTasks.length ? (
                                stageTasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        isDone={stage.name === "Done"}
                                    />
                                ))
                            ) : (
                                <div className="flex h-24 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                                    No tasks
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardTaskPage;