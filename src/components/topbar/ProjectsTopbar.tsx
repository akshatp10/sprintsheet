import { useState } from 'react'
import Button from '../button/Button'
import Text from '../common/Text'
import { Tabs } from '../inputs/Tabs'
import Chip from '../chips/Chip'

const ProjectsTopbar = () => {

    const [radioButtonOption, setradioButtonOption] = useState("table")

    return (
        <div className='flex w-full justify-between items-center gap-3'>
            <div className='flex items-center gap-3 w-full border-r border-lines-hairline'>
                <Tabs
                    onChange={setradioButtonOption}
                    activeTab={radioButtonOption}
                    tabs={[
                        { label: "Table", value: "table" },
                        { label: "Cards", value: "cards" },
                    ]}
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

            <Button variant="secondary" handleClick={() => { }} className='min-w-0 shrink-0'>
                <Text>
                    + New Task
                </Text>
            </Button>
        </div>
    )
}

export default ProjectsTopbar
