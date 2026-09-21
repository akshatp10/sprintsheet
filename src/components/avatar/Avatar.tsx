import React from 'react';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/cn';
import Text from '../common/Text';

type AvatarVariant = 'purple' | 'blue' | 'amber' | 'rose' | 'chip' | 'default';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    userName?: string | null;
    extraUsers?: number;
    isSideBar?: boolean;
    variant?: AvatarVariant;
}

const variantClasses: Record<AvatarVariant, string> = {
    purple: 'bg-identity-avatar-purple text-identity-avatar-text',
    blue: 'bg-identity-avatar-blue text-identity-avatar-text',
    amber: 'bg-identity-avatar-amber text-identity-avatar-text',
    rose: 'bg-identity-avatar-rose text-identity-avatar-text',
    chip: 'bg-identity-overflow-chip text-identity-overflow-text font-mono text-type-mono',
    default: 'bg-surface border border-ink-fades-ghost-rows',
};

const avatarVariants: AvatarVariant[] = [
    'purple',
    'blue',
    'amber',
    'rose',
];

const getAvatarVariant = (userName: string): AvatarVariant => {
    let hash = 0;

    for (let i = 0; i < userName.length; i++) {
        hash = userName.charCodeAt(i) + ((hash << 5) - hash);
    }

    return avatarVariants[Math.abs(hash) % avatarVariants.length];
};

const Avatar = ({
    userName,
    extraUsers,
    isSideBar = false,
    ...props
}: AvatarProps) => {
    const isChip = extraUsers !== undefined;

    const resolvedVariant = isChip
        ? 'chip'
        : userName
            ? getAvatarVariant(userName)
            : 'default';

    return (
        <div
            className={cn(
                'rounded-full flex shrink-0 items-center justify-center leading-none',
                variantClasses[resolvedVariant],
                isSideBar
                    ? 'w-8 h-8'
                    : 'w-5.5 h-5.5',
                isChip ? "tabular-nums" : "",
            )}
            {...props}
        >
            {isChip ? (
                `+${extraUsers}`
            ) : userName ? (
                <Text variant={isSideBar ? "body" : "caption"} className='leading-1'>
                    {userName.slice(0, 2).toUpperCase()}
                </Text>
            ) : (
                <UserRound size={12} strokeWidth={1.5} className='text-ink-2' />
            )}
        </div>
    );
};

export default Avatar;