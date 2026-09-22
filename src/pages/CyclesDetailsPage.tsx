import Chip from "@/components/chips/Chip";
import Text from "@/components/common/Text";
import ToggleButtonBox from "@/components/common/ToggleButtonBox";
import ProgressBar from "@/components/progressBar/ProgressBar";
import CycleRow from "@/features/cycles/components/CycleRow";
import { useCycleStatus } from "@/hooks/useCycleStatus";
import { useCycles } from "@/lib/services/cycles/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CyclesDetailsPage = () => {
    const [automaticCycle, setAutomaticCycle] = useState(false);

    const { projectid } = useParams<{ projectid: string }>();
    const { data: allCycles = [] } = useCycles(projectid ?? "");

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
        ...activeCycles.map((cycle) => ({
            cycle,
            status: "active" as const,
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
            <div className="w-full flex gap-3 items-center">
                <ToggleButtonBox
                    checked={automaticCycle}
                    onChange={(value) => setAutomaticCycle(value)}
                    classname="flex flex-1 items-center"
                    contentClassName="gap-0 w-full justify-between"
                >
                    <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col">
                            <Text variant="h2">Cycles open automatically</Text>
                            <Text>
                                Next: Aug 24-28 opens Mon 24 Aug, 00:00 IST - in
                                3 days
                            </Text>
                        </div>

                        <div>Button</div>
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
            <div className="w-full border border-accent rounded-md p-4 bg-surface min-h-30">
                <div>
                    <Chip text="Active" variant="primary" bgColor="bg-accent-tint" textColor="text-accent-deep" className="font-medium" />
                    <Text variant="h1">Aug 17 - 21</Text>
                </div>
                <ProgressBar label={{ cur: 3, total: 9 }} progress={33} />
                <div></div>
            </div>

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
                <svg viewBox="0 0 44 40" width={50}>
                    <rect x="8" y="6" width="28" height="24" rx="7" fill="#ffffff" stroke="#5a4fb0" strokeWidth="2"></rect>
                    <circle cx="17" cy="17" r="3" fill="#5a4fb0"></circle><circle cx="27" cy="17" r="3" fill="#5a4fb0"></circle>
                    <path d="M18 24 q4 3.5 8 0" stroke="#2f8f5b" strokeWidth="2" fill="none" strokeLinecap="round"></path>
                    <path d="M16 33 h12 M19 33 v4 M25 33 v4" stroke="#b3781f" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
                <Text>Unfinished tasks stay attached to the cycle they were in. Closing a cycle — by hand or by rollover — never moves work: carry it forward yourself with Duplicate, ⋯ → Move to cycle, or the backlog drawer.</Text>
            </div>
        </div>
    );
};

export default CyclesDetailsPage;
