
import Avatar from '../avatar/Avatar';
import Text, { type TextVariant } from '../common/Text';

interface UserPanelSidebarProps {
    userName: string
    isSidebar?: boolean
    textVariant?: TextVariant
    textColor?: string
}

const UserPanel = ({ userName, isSidebar, textVariant = "body", textColor = "text-ink" }: UserPanelSidebarProps) => {

    const displayUserName = userName.split(" ")[0]

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Avatar userName={displayUserName} isSideBar={isSidebar} />
                <Text variant={textVariant} className={textColor} truncate>{displayUserName}</Text>
            </div>
        </div>
    )
}

export default UserPanel
