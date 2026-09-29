import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import { cn } from "@/lib/cn";
import { GripVertical } from "lucide-react";

const BacklogTaskCard = () => {
    const assignees = ["John Doe"];

    return (
        <div
            className={cn(
                "group flex min-h-16 items-center gap-2 rounded-lg border border-lines-control bg-surface px-3",
                "hover:border-lines-strong",
            )}
        >
            {/* Checkbox */}
            <div className="flex shrink-0 items-center">
                <div className="flex h-4 w-4 items-center justify-center rounded-full border border-lines-control">
                    {/* Empty checkbox */}
                </div>
            </div>

            {/* Main content */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                {/* Title */}
                <Text
                    variant="body"
                    className="truncate"
                >
                    Split the settings screen into tabs
                </Text>

                {/* Metadata */}
                <div className="flex min-w-0 items-center gap-2">
                    <Text
                        variant="mono"
                        className="text-ink-3"
                    >
                        CRM-158
                    </Text>

                    <Chip
                        variant="secondary"
                        text="refactor"
                        textType="text-type-caption"
                        className="px-1 py-0"
                    />

                    <Chip
                        variant="secondary"
                        text="WEB"
                        textType="text-type-caption"
                        className="px-1 py-0"
                    />

                    <AvatarGroup>
                        {assignees.map((assignee) => (
                            <Avatar
                                key={assignee}
                                userName={assignee}
                            />
                        ))}
                    </AvatarGroup>
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