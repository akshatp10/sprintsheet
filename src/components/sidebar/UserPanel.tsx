import UserAvatar from '../identity/UserAvatar'
import Text, { type TextVariant } from '../common/Text';

interface UserPanelSidebarProps {
    userName: string
    isSidebar?: boolean
    variant: "purple" | "blue" | "amber" | "rose"
    textVariant?: TextVariant
    textColor?: string
}

const UserPanel = ({ userName, isSidebar, variant, textVariant = "body", textColor = "text-ink" }: UserPanelSidebarProps) => {

    const displayUserName = userName.split(" ")[0]

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <UserAvatar userName={displayUserName} isSideBar={isSidebar} variant={variant} />
                <Text variant={textVariant} className={textColor} truncate>{displayUserName}</Text>
            </div>
        </div>
    )
}

export default UserPanel
