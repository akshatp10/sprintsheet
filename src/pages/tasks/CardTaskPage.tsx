import TaskCard from "@/features/tasks/components/TaskCard";
import { cn } from "@/lib/cn";
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

    const stageColors: Record<string, string> = {
        Backlog: "bg-stage-backlog-bg border border-stage-blocked-border",
        Todo: "bg-stage-todo-bg border border-stage-todo-border",
        "In progress": "bg-stage-progress-bg border border-stage-progress-border",
        "In QA": "bg-stage-qa-bg border border-stage-qa-border",
        Done: "bg-stage-done-bg border border-stage-done-border",
        Blocked: "bg-stage-blocked-bg border border-stage-blocked-border"
    };

    return (
        <div
            className="grid gap-4 overflow-x-auto p-4 h-full"
            style={{
                gridTemplateColumns: `repeat(${sortedStages.length}, minmax(15rem, 1fr))`,
            }}
        >
            {sortedStages.map((stage) => {
                //TODO - Optimize the task filtering
                const stageTasks = tasks.filter((t) => t.stageId === stage.stageId);

                return (
                    <div
                        key={stage.id}
                        className={cn("flex h-full flex-col rounded-md", stageColors[stage.name])}
                    >
                        <div className="flex shrink-0 items-center justify-between px-4 pt-2">
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
                                <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-lines-control text-sm text-ink-2">
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