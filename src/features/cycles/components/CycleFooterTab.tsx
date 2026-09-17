import Button from "@/components/button/Button";
import Text from "@/components/common/Text";

import type { Cycle } from "@/lib/services/cycles/types";

import { cn } from "@/lib/cn";

interface CycleFooterTabProps {
    cycle: Cycle;
    handleClick: () => void;
    isCurrent: boolean;
}

const CycleFooterTab = ({
    cycle,
    handleClick,
    isCurrent,
}: CycleFooterTabProps) => {
    return (
        <Button
            variant="tertiary"
            onClick={handleClick}
            className={cn(
                "flex items-center gap-3 rounded-none rounded-t-lg border-b-2 border-transparent px-3 py-1.5",
                isCurrent
                    ? "bg-accent-tint text-accent-deep border-b-accent border-t border-t-accent"
                    : "text-ink-2 hover:bg-surface-raised hover:border-b-lines-control",
            )}
        >
            <Text variant="h2">
                {cycle.name}
            </Text>
        </Button>
    );
};

export default CycleFooterTab;