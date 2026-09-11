import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";

import type { Task } from "@/lib/services/tasks/types";
import { useDraggable } from "@dnd-kit/react";

interface TaskCardProps {
    task: Task;
    isDone: boolean;
}

const TaskCard = ({ task, isDone }: TaskCardProps) => {

    const { ref } = useDraggable({
        id: task.id,
    });

    return (
        <div
            className={`rounded-md border-2 border-lines-hairline w-full min-h-fit bg-surface px-4 py-2 flex flex-col gap-2 justify-center ${isDone ? "opacity-50" : ""
                }`}

            ref={ref}
        >
            <div className="w-full flex justify-between items-center">
                <Text variant="micro">CRM-101</Text>

                <div className="flex gap-2">
                    {task.tags.length > 0 &&
                        task.tags.map((tag) => (
                            <Chip
                                variant="secondary"
                                textType="text-type-caption"
                                text={tag}
                                key={tag}
                                borderColor="border-lines-hairline"
                            />
                        ))}
                </div>
            </div>

            <Text
                variant="h2"
                className={isDone ? "line-through" : ""}
            >
                {task.name}
            </Text>

            <Chip
                variant="secondary"
                text={task.type}
                textType="text-type-caption"
                className="px-2 py-0.5"
            />

            <div className="flex items-center justify-start gap-4">
                {task.assigneeIds.length > 0 ? (
                    task.assigneeIds.map((assignee) => (
                        <AvatarGroup key={assignee}>
                            <Avatar userName={assignee} />
                        </AvatarGroup>
                    ))
                ) : (
                    <div className="flex items-center gap-1">
                        <Avatar />
                        <Text
                            variant="label"
                            className="text-ink-2"
                        >
                            Unassigned
                        </Text>
                    </div>
                )}

                {task.dueDate && <Text>{task.dueDate}</Text>}
            </div>
        </div>
    );
};

export default TaskCard;