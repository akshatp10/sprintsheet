interface AvatarGroupProps {
    children: React.ReactNode;
}

const AvatarGroup = ({ children, ...props }: AvatarGroupProps) => {
    return (
        <div className="flex items-center -space-x-1.5 *:border *:border-white" {...props}>
            {children}
        </div>
    );
};

export default AvatarGroup;