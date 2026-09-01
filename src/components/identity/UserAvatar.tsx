import CircleLayout from './CircleLayout'

interface UserAvatarProps {
    userName: string;
    variant: "purple" | "blue" | "amber" | "rose"
    isSideBar?: boolean
}

const UserAvatar = ({ userName, variant, isSideBar = false }: UserAvatarProps) => {

    const uiName = userName.slice(0, 2).toUpperCase();

    return (
        <CircleLayout variant={variant} isSideBar={isSideBar}>
            {uiName}
        </CircleLayout>
    )
}

export default UserAvatar
