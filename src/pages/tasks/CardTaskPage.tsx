import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import TaskCreateForm from "@/features/tasks/components/forms/TaskCreateForm";
import TaskCardSkeleton from "@/features/tasks/components/skeletons/TaskCardSkeleton";
import TaskCard from "@/features/tasks/components/TaskCard";
import { cn } from "@/lib/cn";
import type { Stage } from "@/lib/services/stages/type";
import type { Task } from "@/lib/services/tasks/types";
import { Plus } from "lucide-react";
import { useState } from "react";

interface CardTaskPageProps {
    stages: Stage[];
    tasksByStage: Record<string, Task[]>;
    isLoading: boolean;
    projectId: string;
}

const CardTaskPage = ({ stages, isLoading, projectId, tasksByStage }: CardTaskPageProps) => {
    // if (isLoading) return <div>Loading Tasks</div>;

    const [newTask, setNewTask] = useState(false)
    const [clickedStageId, setClickedStageId] = useState<string>("")

    const stageColors: Record<string, string> = {
        Backlog: "bg-stage-backlog-bg border border-stage-backlog-border text-stage-backlog-text",
        Todo: "bg-stage-todo-bg border border-stage-todo-border text-stage-todo-text",
        "In progress": "bg-stage-progress-bg border border-stage-progress-border text-stage-progress-text",
        "In QA": "bg-stage-qa-bg border border-stage-qa-border text-stage-qa-text",
        Done: "bg-stage-done-bg border border-stage-done-border text-stage-done-text",
        Blocked: "bg-stage-blocked-bg border border-stage-blocked-border text-stage-blocked-text"
    };
    const stageDotColors: Record<string, string> = {
        Backlog: "bg-stage-backlog-dot",
        Todo: "bg-stage-todo-dot",
        "In progress": "bg-stage-progress-dot",
        "In QA": "bg-stage-qa-dot",
        Done: "bg-stage-done-dot",
        Blocked: "bg-stage-blocked-dot",
    };

    const visibleStages = stages.filter((stage) => stage.name !== "Backlog");

    return (
        <>
            <div
                className="grid gap-4 overflow-x-auto p-4 h-full"
                style={{
                    gridTemplateColumns: `repeat(${visibleStages.length}, minmax(15rem, 1fr))`,
                }}
            >
                {visibleStages.map((stage) => {
                    const stageTasks = tasksByStage[stage.stageId] ?? [];

                    return (
                        <div
                            key={stage.id}
                            className={cn("flex h-full flex-col rounded-md", stageColors[stage.name])}
                        >
                            <div className="flex shrink-0 items-center justify-between px-3 pt-2">
                                <div className="flex items-center gap-2">
                                    <span className={cn("w-2 h-2 rounded-full shrink-0", stageDotColors[stage.name])} />
                                    <Text variant="h2">{stage.name}</Text>
                                    <Text variant="h2" className="font-normal text-ink-fades-ghost-rows">{stageTasks.length}</Text>
                                </div>

                                {/* This is creation of task in that particular stage */}
                                <Button variant="tertiary" className="border-none text-ink-fades-ghost-rows p-0" handleClick={() => { setNewTask(true); setClickedStageId(stage.stageId) }}>
                                    <Plus strokeWidth={1.5} size={15} />
                                </Button>
                            </div>

                            <div className="flex-1 space-y-3 overflow-y-auto p-2">
                                {isLoading ?
                                    [...Array(2)].map((_, index) => (
                                        <TaskCardSkeleton key={index} />
                                    )) :
                                    stageTasks.length ? (
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
                                    )
                                }
                            </div>
                        </div>
                    );
                })}
            </div>

            {newTask && <TaskCreateForm projectId={projectId} onClose={() => { setNewTask(false); setClickedStageId("") }} defaultStageId={clickedStageId} />}
        </>
    );
};

export default CardTaskPage;