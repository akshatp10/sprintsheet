import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import { cn } from "@/lib/cn";

interface AllTaskListItemProps {
    gridTemplateColumns: string;
    isDone: boolean;
}
const AllTaskListItem = ({
    gridTemplateColumns,
    isDone,
}: AllTaskListItemProps) => {
    const assignees = ["John Doe", "Jane Doe"];

    return (
        <div
            className={cn(
                "grid min-h-10 border-b border-lines-hairline bg-surface-page text-sm",
                isDone && "opacity-50",
            )}
            style={{ gridTemplateColumns }}
        >

            {/* Number */}
            <div className="flex items-center border-r border-lines-hairline bg-surface-desk px-3">

                <Text variant="mono" className="mx-auto text-ink-3">

                    1
                </Text>
            </div>
            {/* Key */}
            <div className="flex items-center border-r border-lines-hairline px-3">

                <Text variant="mono" className="text-ink-3">

                    SPR-001
                </Text>
            </div>
            {/* Title */}
            <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">

                <Text
                    variant="body"
                    maxLines={1}
                    className={cn(isDone && "line-through")}
                >

                    Implement task list view
                </Text>
            </div>
            {/* Stage */}
            <div className="flex items-center border-r border-lines-hairline px-3">

                <Chip
                    variant="secondary"
                    text="In Progress"
                    textType="text-type-caption"
                    className="px-1 py-0"
                />
            </div>
            {/* Status */}
            <div className="flex items-center border-r border-lines-hairline px-3">

                <Chip
                    variant="secondary"
                    text="Active"
                    textType="text-type-caption"
                    className="px-1 py-0"
                />
            </div>
            {/* Assignee */}
            <div className="flex min-w-0 items-center border-r border-lines-hairline px-3">

                <AvatarGroup>

                    {assignees.map((assignee) => (
                        <Avatar key={assignee} userName={assignee} />
                    ))}
                </AvatarGroup>
            </div>
            {/* Due */}
            <div className="flex items-center px-3">

                <Text variant="mono"> — </Text>
            </div>
        </div>
    );
};
export default AllTaskListItem;
