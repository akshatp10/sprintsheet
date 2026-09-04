import UserAvatar from '../identity/UserAvatar'
import Text from '../common/Text';
import ExtraOptionButton from '../button/ExtraOptionButton';

interface UserPanelSidebarProps {
    userName: string
}

const UserPanelSidebar = ({ userName }: UserPanelSidebarProps) => {

    const displayUserName = userName.split(" ")[0]

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <UserAvatar userName={displayUserName} isSideBar variant='blue' />
                <Text variant='h2' className='text-ink-2' truncate>{displayUserName}</Text>
            </div>

            <ExtraOptionButton handleClick={() => { }} />
        </div>
    )
}

export default UserPanelSidebar
