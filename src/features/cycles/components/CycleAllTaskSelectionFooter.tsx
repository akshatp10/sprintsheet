import Button from "@/components/button/Button";
import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import type { Cycle } from "@/lib/services/cycles/types";
import { formatCycleDate } from "@/lib/utils";
import { ArrowUpToLine, Inbox } from "lucide-react";

interface CycleAllTaskSelectionFooterProps {
    activeCycle: Cycle;
    selectedTaskLength: number
}

const CycleAllTaskSelectionFooter = ({ activeCycle, selectedTaskLength }: CycleAllTaskSelectionFooterProps) => {

    return (
        <div className="flex w-full items-center justify-between px-4 py-2 bg-black text-white h-[5dvh]">
            <div className="flex gap-3 items-center">
                <Chip className="bg-white/25" textColor="text-white" borderColor="border-none" text={<>{selectedTaskLength} selected</>} />
                <Text className="text-ink-3">Set status</Text>
                <Text className="text-ink-3">Assign</Text>

                {activeCycle && <>
                    <Button
                        variant="secondary"
                        className="border-ink-3 text-white shadow-none flex items-center gap-1"
                    >
                        <ArrowUpToLine strokeWidth={1.5} size={15} /> Add to {`${formatCycleDate(activeCycle.startDate)} - ${formatCycleDate(activeCycle.endDate)}`}
                    </Button>
                </>
                }
                <Button
                    variant="secondary"
                    className="border-ink-3 text-white shadow-none flex items-center gap-1"
                >
                    <Inbox strokeWidth={1.5} size={15} /> Move to Backlog
                </Button>
            </div>
        </div>
    );
};

export default CycleAllTaskSelectionFooter;
