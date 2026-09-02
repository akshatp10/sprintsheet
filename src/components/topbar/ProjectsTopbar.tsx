import { useState } from 'react'
import Button from '../button/Button'
import Text from '../common/Text'
import { Tabs } from '../inputs/Tabs'
import Chip from '../chips/Chip'

const ProjectsTopbar = () => {

    const [radioButtonOption, setradioButtonOption] = useState("table")

    return (
        <div className='flex items-center'>
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

            <Button variant="secondary" handleClick={() => { }}>
                <Text>
                    + New Task
                </Text>
            </Button>
        </div>
    )
}

export default ProjectsTopbar
