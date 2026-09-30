import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import { cn } from "@/lib/cn";

import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";
import { useTypeById } from "@/lib/services/types/hooks";
import { stageConfig, StageName } from "@/lib/stageConfig";
import { formatDate } from "@/lib/utils";
import useTaskDetailStore from "@/store/taskDetailStore";
import { GripVertical } from "lucide-react";

interface TaskListElementProps {
    gridTemplateColumns: string;
    task: CycleTaskWithUsers;
    taskNumber: number;
    isDone: boolean;
    isOverlay?: boolean;
}

const TaskListElement = ({
    gridTemplateColumns,
    task,
    taskNumber,
    isDone,
    isOverlay = false,
}: TaskListElementProps) => {
    const { data: curType } = useTypeById(task.typeId);

    const openTask = useTaskDetailStore((state) => state.openTask);

    const visibleUsers = task.assignees.slice(0, 3);
    const extraUsers = task.assignees.length - 3;

    const { chip } = stageConfig[task.stage.name as StageName];

    return (
        <div
            className={`
				grid
				min-h-10
				border-b
				border-lines-hairline
				text-sm
				bg-surface-page
				${isDone ? "opacity-50" : ""}
				${isOverlay ? "opacity-75" : ""}
			`}
            style={{ gridTemplateColumns }}

            onClick={() => { openTask(task) }}
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
                    truncate
                    className={`${isDone ? "line-through" : ""}`}
                >
                    {task.name}
                </Text>
            </div>

            {/* Assignee */}
            <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">
                {!!task?.assignees.length ? (
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
                {!!task.tags?.length ? (
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