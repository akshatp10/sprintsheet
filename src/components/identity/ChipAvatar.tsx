import CircleLayout from './CircleLayout'

interface UserAvatarProps {
    extraUsers: number;
}

const ChipAvatar = ({ extraUsers }: UserAvatarProps) => {

    return (
        <CircleLayout variant={"chip"}>
            +{extraUsers}
        </CircleLayout>
    )
}

export default ChipAvatar
