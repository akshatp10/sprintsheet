import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import ProgressBar from "@/components/progressBar/ProgressBar";
import { cn } from "@/lib/cn";
import type { Cycle } from "@/lib/services/cycles/types";
import { useTasksByCycle } from "@/lib/services/tasks/hooks";

interface CycleRowProps {
    cycle: Cycle;
    status: "active" | "closed" | "planned";
    gridTemplateColumns: string;
}

const CycleRow = ({ cycle, status, gridTemplateColumns }: CycleRowProps) => {

    const cycleLength = (new Date(cycle.endDate).getTime() - new Date(cycle.startDate).getTime()) / (1000 * 60 * 60 * 24);

    const { data: allTasks } = useTasksByCycle(cycle.id)

    return (
        <div
            className="grid items-center border-b border-lines px-3 py-3"
            style={{ gridTemplateColumns }}
        >
            {/* Status */}
            <div>
                <Chip
                    text={status}
                    variant="secondary"
                    className={cn(
                        "rounded-md capitalize bg-surface",
                        status === "planned" &&
                        "border-accent text-accent",
                        status === "active" &&
                        "border-success text-success",
                        status === "closed" &&
                        "border-lines text-ink-3"
                    )}
                />
            </div>

            {/* Cycle */}
            <div>
                <Text variant="body-sm" className="font-medium">
                    {cycle.name}
                </Text>
            </div>

            {/* Length */}
            <div>
                <Text variant="body-sm">
                    {cycleLength} days
                </Text>
            </div>

            {/* Tasks */}
            <div>
                <Text variant="body-sm">
                    {allTasks && allTasks.length} tasks
                </Text>
            </div>

            {/* Completion */}
            <div>
                {status === "planned" ?
                    <Text variant="body-sm" className="text-ink-3">
                        —
                    </Text>
                    : <ProgressBar progress={40} label={{ cur: 4, total: 10 }} />}
            </div>
        </div>
    );
};

export default CycleRow;