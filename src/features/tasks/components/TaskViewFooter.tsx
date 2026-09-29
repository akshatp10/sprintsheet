import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import CycleFooterTab from "@/features/cycles/components/CycleFooterTab";
import CreateCycleForm from "@/features/cycles/forms/CreateCycleForm";
import type { Cycle } from "@/lib/services/cycles/types";
import { Inbox, Menu, Plus } from "lucide-react";
import { useState } from "react";

interface TaskViewFooterProps {
    isCardHeld?: boolean;
    taskLength?: number;
    onClick: () => void;
    projectId: string;
    setCurrentCycleId: (cycleId: string) => void;
    currentCycleId: string;
    cycles: Cycle[]
    openBacklog: boolean
}

const TaskViewFooter = ({
    projectId,
    onClick,
    isCardHeld = true,
    taskLength = 0,
    currentCycleId,
    setCurrentCycleId,
    cycles,
    openBacklog
}: TaskViewFooterProps) => {

    const [createCycle, setCreateCycle] = useState(false)

    // if (cycles && !!cycles.length) setCurrentCycleId(cycles[0]?.id)

    return (
        <>
            <div className="bg-surface-sunken border-t border-t-lines-hairline flex justify-between items-center px-4 z-20">
                <div className="flex">
                    {/* This is creation of cycle */}
                    <Button
                        variant="tertiary"
                        className="border-none p-1.5"
                        onClick={() => {
                            setCreateCycle(true);
                        }}
                    >
                        <Plus strokeWidth={1.5} size={15} />
                    </Button>
                    {/* This is menu*/}
                    <Button variant="tertiary" className="border-none p-1.5">
                        <Menu strokeWidth={1.5} size={15} />
                    </Button>

                    {cycles?.map((cycle) => (
                        <CycleFooterTab
                            cycle={cycle}
                            key={cycle?.id}
                            handleClick={() => {
                                setCurrentCycleId(cycle.id);
                            }}

                            isCurrent={currentCycleId === cycle?.id}
                        />
                    ))}
                </div>
                <div className="flex gap-3 items-center">
                    {isCardHeld && (
                        <Text variant="body-sm" className="text-ink-3">
                            Card held - drop it in any stage column
                        </Text>
                    )}
                    <Button
                        variant="tertiary"
                        className={`flex gap-1 items-center justify-center ${openBacklog ? "text-accent-deep border-accent-deep bg-accent-wash-selected" : "text-ink-2"}`}
                        onClick={onClick}
                    >
                        <Inbox strokeWidth={1.5} size={13} />
                        <Text className="">Backlog</Text>
                        <Text
                            variant="body-sm"
                            className={`font-normal`}
                        >
                            {taskLength}
                        </Text>
                    </Button>
                </div>
            </div>

            {createCycle && (
                <CreateCycleForm
                    projectId={projectId}
                    onClose={(cycleId?: string) => {
                        setCreateCycle(false);
                        if (cycleId)
                            setCurrentCycleId(cycleId)
                    }}
                />
            )}
        </>
    );
};

export default TaskViewFooter;
