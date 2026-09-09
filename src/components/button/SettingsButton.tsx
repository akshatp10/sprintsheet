import Button from './Button'
import Chip from '../chips/Chip'
import Text from '../common/Text'
import { Settings } from 'lucide-react'

interface SettingsButtonProps {
    isAdmin?: boolean
}

const SettingsButton = ({ isAdmin }: SettingsButtonProps) => {
    return (
        <Button handleClick={() => { }} variant='tertiary' className='border-0 flex justify-between'>
            <Text className='flex text-ink gap-3 items-center'>
                <Settings size={17} strokeWidth={1.5} className='text-ink-3' />
                Settings
            </Text>
            {isAdmin && <Chip text='Admin' variant='secondary' textType='text-type-caption' borderColor='border-accent' />}
        </Button>
    )
}

export default SettingsButton
