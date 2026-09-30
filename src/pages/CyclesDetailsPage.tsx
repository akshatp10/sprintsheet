import Text from "@/components/common/Text";
import ToggleButtonBox from "@/components/common/ToggleButtonBox";
import ActiveCycle from "@/features/cycles/components/ActiveCycle";
import CycleRow from "@/features/cycles/components/CycleRow";
import { useCycleStatus } from "@/hooks/useCycleStatus";
import { useGetAllCyclesByProject } from "@/lib/services/cycles/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";

import NoActiveCycle from "@/features/cycles/components/NoActiveCycle";
import Button from "@/components/button/Button";
import Mascot from "@/components/common/Mascot";

const CyclesDetailsPage = () => {
    const [automaticCycle, setAutomaticCycle] = useState(false);
    const [defaultCycleLength, setDefaultCycleLength] = useState(5);

    const { projectid } = useParams<{ projectid: string }>();
    const { data: allCycles = [] } = useGetAllCyclesByProject(projectid ?? "");

    const {
        active: activeCycles,
        closed: closedCycles,
        planned: plannedCycles,
    } = useCycleStatus(allCycles);

    const cyclesWithStatus = [
        ...plannedCycles.map((cycle) => ({
            cycle,
            status: "planned" as const,
        })),
        ...closedCycles.map((cycle) => ({
            cycle,
            status: "closed" as const,
        })),
    ];

    const cycleColumns = [
        {
            key: "status",
            label: "STATUS",
            width: "100px",
        },
        {
            key: "cycle",
            label: "CYCLE",
            width: "1fr",
        },
        {
            key: "length",
            label: "LENGTH",
            width: "160px",
        },
        {
            key: "tasks",
            label: "TASKS",
            width: "120px",
        },
        {
            key: "completions",
            label: "COMPLETIONS",
            width: "200px",
        },
    ];

    const gridTemplateColumns = [
        ...cycleColumns.map((column) => column.width),
    ].join(" ");

    return (
        <div className="w-full flex flex-col px-8 py-6 gap-8">
            {/* Top section containing toggle */}
            <div className="w-full flex gap-3 items-stretch opacity-50">
                <ToggleButtonBox
                    checked={automaticCycle}
                    onChange={(value) => setAutomaticCycle(value)}
                    className="flex flex-1 items-center"
                    contentClassName="gap-0 w-full justify-between"
                    isDisabled
                >
                    <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col">
                            <Text variant="h2">Cycles open automatically</Text>
                            <Text>
                                Next: Aug 24-28 opens Mon 24 Aug, 00:00 IST - in
                                3 days
                            </Text>
                        </div>
                        <div className="flex items-center gap-3">
                            <Text className="text-ink-3">Default length</Text>

                            <div className="flex items-center h-7 border border-lines rounded-md overflow-hidden bg-surface">
                                <Button
                                    variant="tertiary"
                                    className="h-full w-7 p-0 rounded-none border-0 border-r border-lines flex items-center justify-center"
                                    onClick={() =>
                                        setDefaultCycleLength((prev) => Math.max(1, prev - 1))
                                    }
                                    disabled
                                >
                                    -
                                </Button>

                                <Text variant="mono" className="h-full min-w-10 px-2 flex items-center justify-center text-sm border-r border-lines">
                                    {defaultCycleLength}d
                                </Text>

                                <Button
                                    variant="tertiary"
                                    className="h-full w-7 p-0 rounded-none flex items-center justify-center border-0"
                                    onClick={() => setDefaultCycleLength((prev) => prev + 1)}
                                    disabled
                                >
                                    +
                                </Button>
                            </div>

                            <Button
                                variant="tertiary"
                                className="text-accent-deep font-medium border-none"
                                onClick={() => {
                                    // skip next cycle
                                }}
                            >
                                Skip next
                            </Button>
                        </div>
                    </div>
                </ToggleButtonBox>

                <div className="w-[25%] h-full border border-lines rounded-md p-4">
                    <Text className="text-ink-3">ON ROLLOVER</Text>
                    <Text>
                        The finished cycle closes itself and unfinished tasks
                        stay in it. Nothing carries forward unless you duplicate
                        or move it.
                    </Text>
                </div>
            </div>

            {/* Active Cycle */}
            {activeCycles.length === 0 ?
                <NoActiveCycle />
                :
                <ActiveCycle activeCycle={activeCycles} projectId={projectid ?? ""} />
            }

            {/* All Cycles */}
            <div className="w-full">
                {/* Header */}
                <div
                    className="grid items-center border-b border-lines px-3 py-2"
                    style={{ gridTemplateColumns }}
                >
                    {cycleColumns.map((column) => (
                        <Text
                            key={column.key}
                            variant="caption"
                            className="text-ink-3 font-medium"
                        >
                            {column.label}
                        </Text>
                    ))}
                </div>

                {/* Rows */}
                {cyclesWithStatus.map(({ cycle, status }) => (
                    <CycleRow
                        key={cycle.id}
                        cycle={cycle}
                        status={status}
                        gridTemplateColumns={gridTemplateColumns}
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="w-full border border-lines-hairline rounded-md p-4 flex gap-2 text-ink-2 sticky">

                <Mascot expression="info" size={50} renderAnimation />

                <Text>Unfinished tasks stay attached to the cycle they were in. Closing a cycle — by hand or by rollover — never moves work: carry it forward yourself with Duplicate, ⋯ → Move to cycle, or the backlog drawer.</Text>
            </div>
        </div>
    );
};

export default CyclesDetailsPage;
