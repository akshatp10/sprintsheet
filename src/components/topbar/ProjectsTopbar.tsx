import { useState } from 'react'
import { RadioButton } from '@/components/inputs/RadioButton'
import GlobalChip from '../chips/GlobalChip'
import Button from '../button/Button'
import Text from '../common/Text'

const ProjectsTopbar = () => {

    const [radioButtonOption, setradioButtonOption] = useState("table")

    return (
        <div className='flex items-center'>
            <RadioButton
                onChange={setradioButtonOption}
                value={radioButtonOption}
                options={[
                    { label: "Table", value: "table" },
                    { label: "Cards", value: "cards" },
                ]}
            />

            <GlobalChip
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
