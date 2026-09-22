import Button from '@/components/button/Button'
import Chip from '@/components/chips/Chip'
import Text from '@/components/common/Text'
import ProgressBar from '@/components/progressBar/ProgressBar'
import { getToday } from '@/hooks/useCycleStatus'
import { formatCycleDate } from '@/lib/formatCycleDate'
import { getPercentage } from '@/lib/getPercentage'
import type { Cycle } from '@/lib/services/cycles/types'
import { useProjectStages } from '@/lib/services/stages/hooks'
import { useTasksByStage } from '@/lib/services/tasks/hooks'
import { Copy, Lock, Pencil } from 'lucide-react'

interface ActiveCycleProps {
    activeCycle: Cycle[]
    projectId: string
}

const ActiveCycle = ({ activeCycle, projectId }: ActiveCycleProps) => {

    const curCycle = activeCycle[0];
    const cycleLength = (new Date(curCycle.endDate).getTime() - new Date(curCycle.startDate).getTime()) / (1000 * 60 * 60 * 24);

    const currentDay = Math.min(
        cycleLength,
        Math.max(
            1,
            Math.floor(
                (new Date(getToday()).getTime() - new Date(curCycle.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1
        )
    );

    const { data: tasks = {}, isLoading } = useTasksByStage(curCycle.id);
    const { data: stages = [] } = useProjectStages(projectId);

    const sortedStages = [...stages].sort((a, b) => a.order - b.order).reverse();

    const totalTasks = Object.values(tasks ?? {}).reduce((total, stageTasks) => total + stageTasks.length, 0);
    const terminalTasks = sortedStages[0] ? tasks?.[sortedStages[0].id]?.length ?? 0 : 0;

    const cycleActions = [
        { label: "Edit dates", icon: Pencil },
        { label: "Duplicate", icon: Copy },
        { label: "Close Cycle", icon: Lock },
    ];

    if (isLoading) return ("wait");

    return (
        <div className="w-full border border-accent rounded-md p-4 bg-surface min-h-30 flex flex-col justify-evenly">
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <Chip text="Active" variant="primary" bgColor="bg-accent-tint" textColor="text-accent-deep" className="font-medium" />

                    <Text variant="h1">{formatCycleDate(curCycle.startDate)}-{formatCycleDate(curCycle.endDate)}</Text>
                    <Text className="text-ink-3">{cycleLength} days · day {currentDay} of {cycleLength}</Text>
                </div>

                <div className="flex gap-3 items-center">
                    {cycleActions.map(({ label, icon: Icon }) => (
                        <Button
                            key={label}
                            variant="tertiary"
                            className="flex items-center gap-1 opacity-40 cursor-not-allowed"
                        >
                            <Icon strokeWidth={1.5} size={13} />
                            {label}
                        </Button>
                    ))}
                </div>
            </div>

            <ProgressBar label={{ cur: terminalTasks, total: totalTasks }} progress={getPercentage(terminalTasks, totalTasks)} />

            <div className="flex gap-3 items-center">
                {sortedStages.filter((stage => stage.name !== "Backlog" && tasks[stage.id])).map(stage => {

                    const taskCount = tasks[stage.id].length

                    return (
                        <Text className="text-ink-3" key={stage.id}>{taskCount} {stage.name}</Text>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default ActiveCycle
