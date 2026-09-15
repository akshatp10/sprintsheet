import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import { formatDate } from "@/lib/formatDate";

import type { TaskWithUsers } from "@/lib/services/tasks/types";

interface TaskCardProps {
    task: TaskWithUsers;
    isDone: boolean;
    isOverlay?: boolean
}

const TaskCard = ({ task, isDone, isOverlay = false }: TaskCardProps) => {

    const visibleUsers = task.assignees.slice(0, 3);
    const extraUsers = task.assignees.length - 3;

    const visibleTags = task.tags.slice(0, 2);
    const extraTags = task.tags.length - visibleTags.length;

    return (
        <div
            className={`rounded-md border-2 border-lines-hairline w-full min-h-fit bg-surface px-4 py-2 flex flex-col gap-2 justify-center ${isDone ? "opacity-50" : ""} ${isOverlay ? "opacity-75" : ""}`}
        >
            <div className="flex w-full items-start justify-between gap-2">
                <Text variant="mono" className="shrink-0">
                    {task.key}
                </Text>

                <div className="flex min-w-0 gap-1.5 overflow-hidden">
                    {visibleTags.map((tag) => (
                        <Chip
                            key={tag}
                            variant="secondary"
                            textType="text-type-caption"
                            text={tag}
                            borderColor="border-lines-control rounded-lg"
                        />
                    ))}

                    {extraTags > 0 && (
                        <Chip
                            variant="secondary"
                            textType="text-type-caption"
                            text={`+${extraTags}`}
                            borderColor="border-lines-control rounded-lg"
                        />
                    )}
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
                    <AvatarGroup>
                        {visibleUsers.map((assignee) => (
                            <Avatar key={assignee.id} userName={assignee.name} />
                        ))}

                        {extraUsers > 0 && (
                            <Avatar extraUsers={extraUsers} />
                        )}
                    </AvatarGroup>
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

                {task.dueDate && <Text variant="mono">{formatDate(task.dueDate)}</Text>}
            </div>
        </div>
    );
};

export default TaskCard;