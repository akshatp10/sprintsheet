import { UserRound } from 'lucide-react';
import CircleLayout from './CircleLayout'
import Text from '../common/Text';

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    userName: string | null;
    variant?: "purple" | "blue" | "amber" | "rose"
    isSideBar?: boolean
}

const UserAvatar = ({ userName, variant, isSideBar = false, ...props }: UserAvatarProps) => {

    if (userName === null)
        return (
            <CircleLayout {...props}>
                <UserRound size={15} strokeWidth={1.5} />
            </CircleLayout>
        )

    const uiName = userName.slice(0, 2).toUpperCase();

    return (
        <CircleLayout variant={variant} isSideBar={isSideBar} {...props}>
            <Text variant={isSideBar ? "body-sm" : "caption"}>
                {uiName}
            </Text>
        </CircleLayout>
    )
}

export default UserAvatar
