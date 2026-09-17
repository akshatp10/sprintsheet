import Button from "@/components/button/Button"
import Text from "@/components/common/Text"
import CreateCycleForm from "@/features/cycles/forms/CreateCycleForm"
import { useCycles } from "@/lib/services/cycles/hooks"
import { Inbox, Menu, Plus } from "lucide-react"
import { useState } from "react"

interface TaskViewFooterProps {
    isCardHeld?: boolean
    taskLength?: number
    onClick: () => void
    projectId: string;
}

const TaskViewFooter = ({ projectId, onClick, isCardHeld = true, taskLength = 0 }: TaskViewFooterProps) => {

    const [createCycle, setCreateCycle] = useState(false)

    const { data: cycles } = useCycles(projectId);

    return (
        <>
            <div className='bg-surface-sunken border-t border-t-lines-hairline flex justify-between items-center px-4 z-20'>
                <div className="flex">
                    {/* This is creation of cycle */}
                    <Button variant="tertiary" className="border-none p-1.5" onClick={() => { setCreateCycle(true) }}>
                        <Plus strokeWidth={1.5} size={15} />
                    </Button>
                    {/* This is menu*/}
                    <Button variant="tertiary" className="border-none p-1.5">
                        <Menu strokeWidth={1.5} size={15} />
                    </Button>

                    {/* TODO : Add Cycle Tabs */}
                    {cycles?.map((cycle) => (
                        <>
                            {cycle.name}
                        </>
                    ))}
                </div>
                <div className="flex gap-3 items-center">
                    {isCardHeld && <Text variant="body-sm" className="text-ink-3">Card held - drop it in any stage column</Text>}
                    <Button variant="tertiary" className="flex gap-1 items-center justify-center" onClick={onClick}>
                        <Inbox strokeWidth={1.5} size={13} />
                        <Text className="text-ink-2">Backlog</Text>
                        <Text variant="body-sm" className="font-normal text-ink-3">{taskLength}</Text>
                    </Button>
                </div>
            </div>

            {createCycle && <CreateCycleForm projectId={projectId} onClose={() => { setCreateCycle(false) }} />}
        </>
    )
}

export default TaskViewFooter
