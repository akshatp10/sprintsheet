import { useState } from "react";

import Button from "../button/Button";
import { useParams } from "react-router-dom";
import CreateCycleForm from "@/features/cycles/forms/CreateCycleForm";
import Text from "../common/Text";
import { Copy } from "lucide-react";
import { useCycles } from "@/lib/services/cycles/hooks";
import { useCycleStatus } from "@/hooks/useCycleStatus";

const CyclesTopbar = () => {
    const [openCycleForm, setOpenCycleForm] = useState(false);

    const { projectid } = useParams<{ projectid: string }>();
    const { data: allCycles = [] } = useCycles(projectid ?? "");

    const {
        active: activeCycles,
        closed: closedCycles,
        planned: plannedCycles,
    } = useCycleStatus(allCycles);

    const handleCycleFormClose = () => {
        setOpenCycleForm(false);
    };

    return (
        <>
            <div className="flex w-full items-center justify-between gap-3">
                <div className="flex w-full items-center gap-3">
                    <Text variant="h1">Cycles</Text>

                    <Text className="text-ink-3">
                        {activeCycles.length} active ·{" "}
                        {closedCycles.length} closed ·{" "}
                        {plannedCycles.length} planned
                    </Text>
                </div>

                <div className="flex min-w-0 shrink-0 gap-3">
                    <Button
                        variant="tertiary"
                        className="flex h-full items-center gap-1 bg-surface py-0.5 font-medium opacity-40 cursor-not-allowed"
                        onClick={() => {
                            /* TODO: Implement duplicate cycle */
                        }}
                    >
                        <Copy strokeWidth={2} size={13} />
                        Duplicate a cycle
                    </Button>

                    <Button
                        variant="primary"
                        className="h-full py-0.5 font-medium"
                        onClick={() => setOpenCycleForm(true)}
                    >
                        + New Cycle
                    </Button>
                </div>
            </div>

            {openCycleForm && (
                <CreateCycleForm
                    projectId={projectid ?? ""}
                    onClose={handleCycleFormClose}
                />
            )}
        </>
    );
};

export default CyclesTopbar;