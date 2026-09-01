import CircleLayout from './CircleLayout'

interface UserAvatarProps {
    extraUsers: string;
}

const ChipAvatar = ({ extraUsers }: UserAvatarProps) => {

    return (
        <CircleLayout variant={"chip"} overlap={true}>
            +{extraUsers}
        </CircleLayout>
    )
}

export default ChipAvatar
