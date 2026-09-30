import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import Checkbox from "@/components/inputs/Checkbox";
import { cn } from "@/lib/cn";
import { GripVertical } from "lucide-react";
import { useState } from "react";

const BacklogTaskCard = () => {
    const assignees = ["John Doe"];

    const [checked, setChecked] = useState(false);

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
                onChange={setChecked}
            />

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