import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import { cn } from "@/lib/cn";
import { stageConfig, StageName } from "@/lib/stageConfig";
import type { Stage } from "@/lib/services/stages/type";
import { ChevronDownIcon } from "lucide-react";

interface StageListHeaderProps {
    stage: Stage;
    taskCount: number;
    isCollapsed: boolean;
    onToggle: () => void;
}

const StageListHeader = ({
    stage,
    taskCount,
    isCollapsed,
    onToggle,
}: StageListHeaderProps) => {
    const { container } = stageConfig[stage.name as StageName];
    const { dot } = stageConfig[stage.name as StageName];

    return (
        <div
            className={cn(
                "grid h-9 border-b border-lines-hairline",
                container,
            )}
            style={{
                gridTemplateColumns:
                    "40px 100px minmax(250px, 1fr) 160px 120px 100px 140px",
            }}
        >
            <div className="col-span-full flex items-center gap-2 px-3">
                {/* Collapse */}
                <Button
                    variant="tertiary"
                    onClick={onToggle}
                    className={cn(
                        "flex items-center justify-center border-none p-0 transition-transform",
                        isCollapsed
                            ? "-rotate-90"
                            : "rotate-0",
                    )}
                >
                    <ChevronDownIcon
                        strokeWidth={1.5}
                        size={15}
                    />
                </Button>

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
                    {stage.name}
                </Text>

                {/* Task count */}
                <Text
                    variant="caption"
                    className="text-ink-3"
                >
                    {taskCount}
                </Text>

                {/* Add task */}
                <span className="ml-auto text-ink-3">
                    +
                </span>
            </div>
        </div>
    );
};

export default StageListHeader;