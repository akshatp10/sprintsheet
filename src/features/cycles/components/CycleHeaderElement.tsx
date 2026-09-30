import Text from "@/components/common/Text";
import { getToday } from "@/hooks/useCycleStatus";
import { cn } from "@/lib/cn";
import type { Cycle } from "@/lib/services/cycles/types";
import { formatCycleDate } from "@/lib/utils";
import { Inbox, RefreshCcw } from "lucide-react";

interface CycleHeaderElementProps {
    /**
     * Defines the visual variant of the cycle header.
     * - `backlog` — represents tasks that are not part of a cycle.
     * - `active` — represents the currently active cycle.
     * - `other` — represents completed, closed, or other inactive cycles.
     */
    variant: "backlog" | "active" | "other";

    cycle?: Cycle;

    taskCount: number;
}

const CycleHeaderElement = ({ variant, cycle, taskCount }: CycleHeaderElementProps) => {
    const isBacklog = variant === "backlog";
    const isActive = variant === "active";

    const cycleLength = (new Date(cycle!.endDate).getTime() - new Date(cycle!.startDate).getTime()) / (1000 * 60 * 60 * 24);

    const currentDay = Math.min(
        cycleLength,
        Math.max(
            1,
            Math.floor(
                (new Date(getToday()).getTime() - new Date(cycle!.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1
        )
    );

    return (
        <div
            className={cn(
                "flex min-h-10 items-center border border-lines-control px-3",
                isBacklog && "bg-surface-raised/50",
                isActive && "bg-accent-wash-active border-accent",
                variant === "other" && "bg-surface-sunken",
            )}
        >
            {/* Left section */}
            <div className="flex min-w-0 items-center gap-2">
                <Text className="shrink-0">{isBacklog ? <Inbox strokeWidth={1.5} size={10} /> : <RefreshCcw strokeWidth={1.5} size={10} />}</Text>

                <Text maxLines={1}>
                    {isBacklog ? "BACKLOG — NO CYCLE" : `${formatCycleDate(cycle?.startDate ?? "")} - ${formatCycleDate(cycle?.endDate ?? "")}`}
                </Text>

                {!isBacklog && (
                    <Text className="shrink-0 uppercase">
                        {isActive ? "· ACTIVE" : "· CLOSED"}
                    </Text>
                )}

                <Text className="shrink-0 text-ink-3">
                    {taskCount}
                </Text>
            </div>

            <div className="ml-auto flex items-center">
                <Text className="text-ink-3" variant="body-sm">
                    {isBacklog
                        ? "a task with no cycle lives here"
                        : isActive
                            ? `day ${currentDay} of ${cycleLength}`
                            : "9 of 11 done"}
                </Text>
            </div>
        </div>
    );
};

export default CycleHeaderElement;
