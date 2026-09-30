import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import Checkbox from "@/components/inputs/Checkbox";
import { cn } from "@/lib/cn";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";
import { stageConfig, StageName } from "@/lib/stageConfig";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

interface AllTaskListItemProps {
    gridTemplateColumns: string;
    isDone: boolean;
    task: CycleTaskWithUsers;
}
const AllTaskListItem = ({
    gridTemplateColumns,
    isDone,
    task
}: AllTaskListItemProps) => {
    const [checked, setChecked] = useState(false);

    const visibleUsers = task.assignees.slice(0, 3);
    const extraUsers = task.assignees.length - 3;

    const { chip, dot } = stageConfig[task.stage.name as StageName];

    return (
        <div
            className={cn(
                "grid min-h-10 border-b border-lines-hairline bg-surface-page text-sm",
                isDone && "opacity-50",
                checked && "bg-accent-wash-selected"
            )}
            style={{ gridTemplateColumns }}
        >

            {/* Checkbox */}
            <div className="flex items-center border-r border-lines-hairline bg-surface-desk px-3">

                <Checkbox
                    checked={checked}
                    onChange={setChecked}
                />
            </div>
            {/* Key */}
            <div className="flex items-center border-r border-lines-hairline px-3">

                <Text variant="mono" className="text-ink-3">

                    {task?.key}
                </Text>
            </div>
            {/* Title */}
            <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">

                <Text
                    variant="body"
                    maxLines={1}
                    className={cn(isDone && "line-through")}
                >

                    {task?.name}
                </Text>
            </div>
            {/* Stage */}
            <div className="flex items-center border-r border-lines-hairline px-3 gap-2">
                {/* Stage dot */}
                <span
                    className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        dot,
                    )}
                />

                {/* Stage name */}
                <Text
                    variant="caption"
                    className="font-medium uppercase"
                >
                    {task?.stage?.name}
                </Text>
            </div>
            {/* Status */}
            <div className="flex items-center border-r border-lines-hairline px-3">
                <Chip
                    variant="secondary"
                    text={task?.stage?.name}
                    textType="text-type-caption"
                    className={cn("px-1 py-0", chip)}
                />
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
            {/* Due */}
            <div className="flex items-center border-r border-lines-hairline px-3">
                {task?.dueDate ? (
                    <Text variant="mono">
                        {formatDate(task.dueDate)}
                    </Text>
                ) : (
                    <Text variant="mono" className="text-ink-3">
                        —
                    </Text>
                )}
            </div>
        </div>
    );
};
export default AllTaskListItem;
