import type { Cycle } from "@/lib/services/cycles/types";
import { useMemo } from "react";

const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const useCycleStatus = (cycles: Cycle[]) => {
    const today = getToday();

    return useMemo(() => {
        const active = [];
        const closed = [];
        const planned = [];

        for (const cycle of cycles) {
            if (cycle.endDate < today) {
                closed.push(cycle);
            } else if (cycle.startDate > today) {
                planned.push(cycle);
            } else {
                active.push(cycle);
            }
        }

        return {
            active,
            closed,
            planned,
        };
    }, [cycles, today]);
};