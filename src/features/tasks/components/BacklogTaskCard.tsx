import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import Checkbox from "@/components/inputs/Checkbox";
import { cn } from "@/lib/cn";
import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";
import { useTypeById } from "@/lib/services/types/hooks";
import { GripVertical } from "lucide-react";

interface BacklogTaskCardProps {
    backlogTask: CycleTaskWithUsers;
    onSelectionChange: (taskId: string, selected: boolean) => void;
    selectedTaskIds: string[];
}

const BacklogTaskCard = ({ backlogTask, onSelectionChange, selectedTaskIds }: BacklogTaskCardProps) => {
    const { data: curType } = useTypeById(backlogTask.typeId);

    const checked = selectedTaskIds.includes(backlogTask?.id)

    const visibleUsers = backlogTask?.assignees.slice(0, 3);
    const extraUsers = backlogTask?.assignees.length - 3;

    return (
        <div
            className={cn(
                "group flex min-h-16 items-center gap-2 rounded-lg border border-lines-control bg-surface px-3",
                "hover:border-lines-strong",
            )}
        >
            {/* Checkbox */}
            <Checkbox
                checked={checked}
                onChange={(value) => {
                    onSelectionChange(backlogTask?.id, value);
                }}
            />

            {/* Main content */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                {/* Title */}
                <Text
                    variant="body"
                    maxLines={1}
                >
                    {backlogTask?.name}
                </Text>

                {/* Metadata */}
                <div className="flex min-w-0 items-center gap-2">
                    <Text
                        variant="mono"
                        className="text-ink-3"
                    >
                        {backlogTask?.key}
                    </Text>


                    {/* Type */}
                    <Chip
                        variant="secondary"
                        text={curType?.name ?? ""}
                        textType="text-type-caption"
                        className="px-1 py-0"
                    />

                    {!!backlogTask?.assignees.length ? (
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
            </div>

            {/* Drag handle */}
            <div className="flex shrink-0 items-center text-ink-3 opacity-50">
                <GripVertical
                    size={14}
                    strokeWidth={1.5}
                />
            </div>
        </div>
    );
};

export default BacklogTaskCard;