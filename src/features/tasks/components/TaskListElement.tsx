import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import { cn } from "@/lib/cn";

import { formatDate } from "@/lib/formatDate";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";
import { useTypeById } from "@/lib/services/types/hooks";
import { stageConfig, StageName } from "@/lib/stageConfig";
import { GripVertical } from "lucide-react";

export const TASK_LIST_GRID =
    "40px 100px minmax(250px, 1fr) 160px 120px 100px 140px";

interface TaskListElementProps {
    task: CycleTaskWithUsers;
    taskNumber: number;
    isDone: boolean;
    isOverlay?: boolean;
}

const TaskListElement = ({
    task,
    taskNumber,
    isDone,
    isOverlay = false,
}: TaskListElementProps) => {
    const { data: curType } = useTypeById(task.typeId);

    const visibleUsers = task.assignees.slice(0, 3);
    const extraUsers = task.assignees.length - 3;

    const { chip } = stageConfig[task.stage.name as StageName];

    return (
        <div
            className={`
				grid
				min-h-12
				border-b
				border-lines-hairline
				text-sm
				bg-surface-page
				${isDone ? "opacity-50" : ""}
				${isOverlay ? "opacity-75" : ""}
			`}
            style={{
                gridTemplateColumns: TASK_LIST_GRID,
            }}
        >
            {/* Number */}
            <div className="flex items-center border-r border-lines-hairline px-3 bg-surface-desk">
                {isOverlay ? <GripVertical
                    strokeWidth={1.5}
                    size={15}
                    className="text-ink-3"
                /> :
                    <Text variant="mono" className="text-ink-3 group-hover:opacity-0 mx-auto">
                        {taskNumber}
                    </Text>
                }
            </div>

            {/* Type */}
            <div className="flex items-center border-r border-lines-hairline px-3">
                <Chip
                    variant="secondary"
                    text={curType?.name ?? ""}
                    textType="text-type-caption"
                    className="px-1 py-0"
                />
            </div>

            {/* Title */}
            <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">
                <Text
                    variant="body"
                    className={`truncate ${isDone ? "line-through" : ""}`}
                >
                    {task.name}
                </Text>
            </div>

            {/* Assignee */}
            <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">
                {task.assignees.length > 0 ? (
                    <div className="flex min-w-0 items-center gap-2">
                        <AvatarGroup>
                            {visibleUsers.map((assignee) => (
                                <Avatar
                                    key={assignee.id}
                                    userName={assignee.name}
                                />
                            ))}

                            {extraUsers > 0 && (
                                <Avatar extraUsers={extraUsers} />
                            )}
                        </AvatarGroup>

                        <Text
                            variant="caption"
                            className="truncate text-ink-2"
                        >
                            {task.assignees[0]?.name}
                        </Text>
                    </div>
                ) : (
                    <div className="flex items-center gap-1">
                        <Avatar />

                        <Text
                            variant="caption"
                            className="text-ink-2"
                        >
                            Unassigned
                        </Text>
                    </div>
                )}
            </div>

            {/* Status */}
            <div className="flex items-center border-r border-lines-hairline px-3">
                <Chip
                    variant="secondary"
                    text={task.stage.name}
                    textType="text-type-caption"
                    className={cn("px-1 py-0", chip)}
                />
            </div>

            {/* Due */}
            <div className="flex items-center border-r border-lines-hairline px-3">
                {task.dueDate ? (
                    <Text variant="mono">
                        {formatDate(task.dueDate)}
                    </Text>
                ) : (
                    <Text variant="mono" className="text-ink-3">
                        —
                    </Text>
                )}
            </div>

            {/* Tags */}
            <div className="flex min-w-0 items-center gap-1 px-3">
                {task.tags.length > 0 ? (
                    task.tags.map((tag) => (
                        <Chip
                            key={tag}
                            variant="secondary"
                            text={tag}
                            textType="text-type-caption"
                            className="px-1 py-0"
                        />
                    ))
                ) : (
                    <Text variant="caption" className="text-ink-3">
                        —
                    </Text>
                )}
            </div>
        </div>
    );
};

export default TaskListElement;