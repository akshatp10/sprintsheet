import Button from './Button'
import GlobalChip from '../chips/GlobalChip'
import Text from '../common/Text'
import { Settings } from 'lucide-react'

interface SettingsButtonProps {
    isAdmin?: boolean
}

const SettingsButton = ({ isAdmin }: SettingsButtonProps) => {
    return (
        <Button handleClick={() => { }} variant='tertiary' className='border-0 flex justify-between'>
            <Text className='flex text-ink gap-3 items-center'>
                <Settings size={17} className='text-ink-3' />
                Settings
            </Text>
            {isAdmin && <GlobalChip text='Admin' variant='secondary' textType='text-type-caption' borderColor='border-accent' />}
        </Button>
    )
}

export default SettingsButton
