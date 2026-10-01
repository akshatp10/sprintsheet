import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";
import Button from "@/components/button/Button";
import Checkbox from "@/components/inputs/Checkbox"; // adjust to your actual path
import Text from "@/components/common/Text";
import UserPanel from "@/components/sidebar/UserPanel";
import { cn } from "@/lib/cn";
import { useGetProjectMembers } from "@/lib/services/projects/hooks";

interface AssigneeSelectProps {
    projectId: string;
    value: string[];
    onChange: (ids: string[]) => void;
}

export function AssigneeSelect({
    projectId,
    value,
    onChange,
}: AssigneeSelectProps) {
    const { data: members = [], isLoading } = useGetProjectMembers(projectId);
    const [open, setOpen] = useState(false);

    //For already selected users
    const [pinnedIds, setPinnedIds] = useState<string[]>([]);

    const handleToggleOpen = () => {
        if (!open) setPinnedIds(value);
        setOpen((prev) => !prev);
    };

    const toggleAssignee = (userId: string) => {
        const nextValue = value.includes(userId)
            ? value.filter((id) => id !== userId)
            : [...value, userId];

        onChange(nextValue);
    };

    const selectedMembers = members.filter((member) =>
        value.includes(member.userId),
    );

    const { pinnedMembers, otherMembers } = useMemo(() => {
        const pinned = new Set(pinnedIds);

        return {
            pinnedMembers: members.filter((m) => pinned.has(m.userId)),
            otherMembers: members.filter((m) => !pinned.has(m.userId)),
        };
    }, [members, pinnedIds]);

    const commonClass =
        "flex items-center gap-1 rounded-md border border-lines-hairline bg-surface-2 pl-1 pr-2 py-0.5";

    const renderRow = (member: (typeof members)[number]) => (
        <div
            key={member.userId}
            className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-surface-page"
        >
            <Checkbox
                checked={value.includes(member.userId)}
                onChange={() => toggleAssignee(member.userId)}
            />

            <UserPanel
                userName={member.name}
                textVariant="body-sm"
                textColor="text-ink"
            />
        </div>
    );

    return (
        <div className="relative">
            <div className="flex flex-wrap items-center gap-1.5">
                {selectedMembers.length ? (
                    <AvatarGroup>
                        {selectedMembers.slice(0, 3).map((member) => (
                            <Avatar userName={member.name} key={member.id} />
                        ))}
                        {selectedMembers.length > 3 && (
                            <Avatar extraUsers={selectedMembers.length - 3} />
                        )}
                    </AvatarGroup>
                ) : (
                    <Avatar />
                )}

                <Button
                    variant="tertiary"
                    type="button"
                    onClick={handleToggleOpen}
                    className={cn(
                        commonClass,
                        "border-dashed text-ink-3 hover:text-ink-2",
                    )}
                >
                    <Plus className="h-3 w-3" />

                    <Text variant="body-sm">
                        {selectedMembers.length === 0 ? "Assignee" : "Add"}
                    </Text>
                </Button>
            </div>

            {open && (
                <div className="absolute z-10 mt-1.5 max-h-52 w-52 overflow-auto rounded-md border border-lines-hairline bg-surface py-1 shadow-md">
                    {isLoading ? (
                        <Text
                            variant="caption"
                            className="px-3 py-1.5 text-ink-3"
                        >
                            Loading…
                        </Text>
                    ) : members.length === 0 ? (
                        <Text
                            variant="caption"
                            className="px-3 py-1.5 text-ink-3"
                        >
                            No members found
                        </Text>
                    ) : (
                        <>
                            {pinnedMembers.map(renderRow)}
                            {otherMembers.map(renderRow)}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}