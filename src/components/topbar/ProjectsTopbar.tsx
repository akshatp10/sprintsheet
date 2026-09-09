import { useState } from 'react'
import Button from '../button/Button'
import Text from '../common/Text'
import Tabs, { type TabsOption } from '../inputs/Tabs'
import Chip from '../chips/Chip'
import SlideOverModal from '../slideover/SlideOverModal'

const ProjectsTopbar = () => {

    const [radioButtonOption, setradioButtonOption] = useState("table")
    const [openTaskForm, setOpenTaskForm] = useState(false)

    const tabs: TabsOption<"table" | "cards">[] = [
        { label: "Table", value: "table" },
        { label: "Cards", value: "cards" },
    ];

    return (
        <>
            <div className='flex w-full justify-between items-center gap-3'>
                <div className='flex items-center gap-3 w-full'>
                    <Tabs
                        onChange={setradioButtonOption}
                        activeTab={radioButtonOption}
                        tabs={tabs}
                    />

                    <Chip
                        text='Aug 17-21 · 5 days'
                        variant='primary'
                        bgColor='bg-accent-tint'
                        borderColor=''
                        textColor='text-accent-deep'
                    />

                    <Text className='text-ink-3'>
                        9 tasks · 3 done
                    </Text>
                </div>

                <div className='min-w-0 shrink-0'>
                    <Button variant="secondary" className="h-full font-medium py-0.5" handleClick={() => { setOpenTaskForm(true) }}>
                        + New Task
                    </Button>
                </div>
            </div>

            {openTaskForm && <SlideOverModal width='40dvw' label='Create Task' onClose={() => { setOpenTaskForm(false) }}>Hi</SlideOverModal>}
        </>
    )
}

export default ProjectsTopbar
