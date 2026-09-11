import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import TaskCardSkeleton from "@/features/tasks/components/skeletons/TaskCardSkeleton";
import TaskCard from "@/features/tasks/components/TaskCard";
import { cn } from "@/lib/cn";
import type { Stage } from "@/lib/services/stages/type";
import type { Task } from "@/lib/services/tasks/types";
import { Plus } from "lucide-react";

interface StageViewBoxProps {
    stage: Stage;
    tasks: Task[];
    isLoading: boolean;
    onCreateTask: (stageId: string) => void;
}

const stageColors: Record<string, string> = {
    Backlog:
        "bg-stage-backlog-bg border border-stage-backlog-border text-stage-backlog-text",
    Todo:
        "bg-stage-todo-bg border border-stage-todo-border text-stage-todo-text",
    "In progress":
        "bg-stage-progress-bg border border-stage-progress-border text-stage-progress-text",
    "In QA":
        "bg-stage-qa-bg border border-stage-qa-border text-stage-qa-text",
    Done:
        "bg-stage-done-bg border border-stage-done-border text-stage-done-text",
    Blocked:
        "bg-stage-blocked-bg border border-stage-blocked-border text-stage-blocked-text",
};

const stageDotColors: Record<string, string> = {
    Backlog: "bg-stage-backlog-dot",
    Todo: "bg-stage-todo-dot",
    "In progress": "bg-stage-progress-dot",
    "In QA": "bg-stage-qa-dot",
    Done: "bg-stage-done-dot",
    Blocked: "bg-stage-blocked-dot",
};

const StageViewBox = ({
    stage,
    tasks,
    isLoading,
    onCreateTask,
}: StageViewBoxProps) => {
    return (
        <div
            className={cn(
                "flex h-full flex-col rounded-md",
                stageColors[stage.name],
            )}
        >
            <div className="flex shrink-0 items-center justify-between px-3 pt-2">
                <div className="flex items-center gap-2">
                    <span
                        className={cn(
                            "h-2 w-2 shrink-0 rounded-full",
                            stageDotColors[stage.name],
                        )}
                    />

                    <Text variant="h2">{stage.name}</Text>

                    <Text
                        variant="h2"
                        className="font-normal text-ink-fades-ghost-rows"
                    >
                        {tasks.length}
                    </Text>
                </div>

                <Button
                    variant="tertiary"
                    className="border-none p-0 text-ink-fades-ghost-rows"
                    handleClick={() => onCreateTask(stage.stageId)}
                >
                    <Plus strokeWidth={1.5} size={15} />
                </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-2">
                {isLoading ? (
                    [...Array(2)].map((_, index) => (
                        <TaskCardSkeleton key={index} />
                    ))
                ) : tasks.length ? (
                    tasks.map((task) => (
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
};

export default StageViewBox;