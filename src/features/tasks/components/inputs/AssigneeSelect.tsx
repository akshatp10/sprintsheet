import { useState } from "react";
import { Check, Plus } from "lucide-react";
import UserPanel from "@/components/sidebar/UserPanel";
import Text from "@/components/common/Text";
import { cn } from "@/lib/cn";
import Button from "@/components/button/Button";
import { useProjectMembers } from "@/lib/services/projects/hooks";
import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroups";

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
    const { data: members = [], isLoading } = useProjectMembers(projectId);
    const [open, setOpen] = useState(false);

    const toggle = (userId: string) => {
        const nextValue = value.includes(userId)
            ? value.filter((id) => id !== userId)
            : [...value, userId];

        onChange(nextValue);
    };

    const selectedMembers = members.filter((member) =>
        value.includes(member.userId)
    );

    const commonClass =
        "flex items-center gap-1 rounded-md border border-lines-hairline bg-surface-2 pl-1 pr-2 py-0.5";

    return (
        <div className="relative">
            <div className="flex flex-wrap items-center gap-1.5">

                {selectedMembers.length > 0 ?
                    <AvatarGroup>
                        {selectedMembers.map(member => (<Avatar userName={member.name} key={member.id} />))}
                    </AvatarGroup> :
                    <Avatar />
                }

                <Button
                    variant="tertiary"
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={cn(
                        commonClass,
                        "border-dashed text-ink-3 hover:text-ink-2"
                    )}
                >
                    <Plus className="h-3 w-3" />

                    <Text variant="body-sm">
                        {selectedMembers.length === 0 ? "Assignee" : "Add"}
                    </Text>
                </Button>
            </div>

            {open && (
                <div className="absolute z-10 mt-1.5 w-52 rounded-md border border-lines-hairline bg-surface py-1 shadow-md">
                    {isLoading && (
                        <Text
                            variant="caption"
                            className="px-3 py-1.5 text-ink-3"
                        >
                            Loading…
                        </Text>
                    )}

                    {!isLoading && members.length === 0 && (
                        <Text
                            variant="caption"
                            className="px-3 py-1.5 text-ink-3"
                        >
                            No members found
                        </Text>
                    )}

                    {members.map((member) => {
                        const selected = value.includes(member.userId);

                        return (
                            <button
                                key={member.userId}
                                type="button"
                                onClick={() => { toggle(member.userId); setOpen(false) }}
                                className="flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-surface-2"
                            >
                                <UserPanel
                                    userName={member.name}
                                    textVariant="body-sm"
                                    textColor="text-ink"
                                />

                                {selected && (
                                    <Check className="h-3.5 w-3.5 text-accent-deep" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}