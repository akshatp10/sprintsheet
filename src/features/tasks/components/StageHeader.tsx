import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import { Plus } from "lucide-react";
import type { Stage } from "@/lib/services/stages/type";
import { cn } from "@/lib/cn";
import { stageConfig, StageName } from "@/lib/stageConfig";

interface StageHeaderProps {
    stage: Stage;
    taskCount: number;
    onCreateTask: (stageId: string) => void;
}

const StageHeader = ({
    stage,
    taskCount,
    onCreateTask,
}: StageHeaderProps) => {
    const { dot } = stageConfig[stage.name as StageName];

    return (
        <div className="flex shrink-0 items-center justify-between px-3 pt-2">
            <div className="flex items-center gap-2">
                <span
                    className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        dot,
                    )}
                />

                <Text variant="h2">{stage.name}</Text>

                <Text
                    variant="mono"
                    className="text-[0.9375rem] font-normal text-ink-fades-ghost-rows"
                >
                    {taskCount}
                </Text>
            </div>

            <Button
                variant="tertiary"
                className="border-none p-0 text-ink-fades-ghost-rows"
                onClick={() => onCreateTask(stage.stageId)}
            >
                <Plus size={15} strokeWidth={1.5} />
            </Button>
        </div>
    );
};

export default StageHeader;