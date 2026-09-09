import { Ellipsis } from 'lucide-react';
import Button from '../button/Button';
import Text from '../common/Text';
import Avatar from '../avatar/Avatar';

interface UserPanelSidebarProps {
    userName: string
}

const UserPanelSidebar = ({ userName }: UserPanelSidebarProps) => {

    const displayUserName = userName?.split(" ")[0]

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Avatar userName={displayUserName} />
                <Text variant='h2' className='text-ink-2' truncate>{displayUserName}</Text>
            </div>

            <Button handleClick={() => { }} variant='tertiary' className='border-0'>
                <Ellipsis size={17} strokeWidth={1.5} className="text-ink-fades-ghost-rows" />
            </Button>
        </div>
    )
}

export default UserPanelSidebar
