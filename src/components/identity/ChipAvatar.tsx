import CircleLayout from './CircleLayout'

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    extraUsers: number;
}

const ChipAvatar = ({ extraUsers, ...props }: UserAvatarProps) => {

    return (
        <CircleLayout variant={"chip"} {...props}>
            +{extraUsers}
        </CircleLayout>
    )
}

export default ChipAvatar
