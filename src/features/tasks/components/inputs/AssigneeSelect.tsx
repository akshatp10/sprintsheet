// features/tasks/components/inputs/AssigneeSelect.tsx
import { useEffect, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import UserPanel from "@/components/sidebar/UserPanel";
import Text from "@/components/common/Text";
import { cn } from "@/lib/cn";
import Button from "@/components/button/Button";
import { useProjectMembers } from "@/lib/services/projects/hooks";

export interface ProjectMember {
    id: string;
    name: string;
    avatarUrl?: string;
}

interface AssigneeSelectProps {
    projectId: string;
    value: string[];
    onChange: (ids: string[]) => void;
}


export function AssigneeSelect({ projectId, value, onChange }: AssigneeSelectProps) {
    const { data: members = [], isLoading } = useProjectMembers(projectId);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggle = (id: string) => {
        onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
    };

    const selectedMembers = members.filter((m) => value.includes(m.userId));

    const commonClass = "flex items-center gap-1 rounded-md border border-lines-hairline bg-surface-2 pl-1 pr-2 py-0.5"

    return (
        <div className="relative" ref={containerRef}>
            <div className="flex flex-wrap items-center gap-1.5">
                {selectedMembers.map((m) => (
                    <div
                        key={m.id}
                        className={commonClass}
                    >
                        <UserPanel userName={m.name} textVariant="caption" textColor="text-ink-2" />
                    </div>
                ))}

                <Button
                    variant="tertiary"
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className={cn(commonClass, "border-dashed text-ink-3 hover:text-ink-2")}
                >
                    <Plus className="w-3 h-3" />
                    <Text variant="body-sm">
                        {selectedMembers.length === 0 ? "Assignee" : "Add"}
                    </Text>
                </Button>
            </div>

            {open && (
                <div className="absolute z-10 mt-1.5 w-52 rounded-md border border-lines-hairline bg-surface py-1 shadow-md">
                    {isLoading && (
                        <Text variant="caption" className="px-3 py-1.5 text-ink-3">Loading…</Text>
                    )}
                    {!isLoading && members.length === 0 && (
                        <Text variant="caption" className="px-3 py-1.5 text-ink-3">No members found</Text>
                    )}
                    {members.map((m) => (
                        <button
                            key={m.id}
                            type="button"
                            onClick={() => toggle(m.id)}
                            className="flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-surface-2"
                        >
                            <UserPanel userName={m.name} textVariant="body-sm" textColor="text-ink" />
                            {value.includes(m.id) && <Check className="w-3.5 h-3.5 text-accent-deep" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}