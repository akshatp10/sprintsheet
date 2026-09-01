interface AvatarGroupProps {
    children: React.ReactNode;
}

const AvatarGroup = ({ children }: AvatarGroupProps) => {
    return (
        <div className="flex items-center -space-x-1.5 *:border *:border-white">
            {children}
        </div>
    );
};

export default AvatarGroup;