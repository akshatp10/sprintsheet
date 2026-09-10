const SidebarProjectCardSkeleton = () => {
    return (
        <div className="bg-surface border border-lines-hairline rounded-lg flex items-center justify-between px-4 py-2 w-full h-fit animate-pulse">
            <div className="flex items-center gap-2">
                {/* Initials */}
                <div className="bg-accent-tint rounded-md w-8 h-6" />

                <div className="flex flex-col gap-1">
                    {/* Project name */}
                    <div className="bg-lines-hairline rounded h-4 w-24" />

                    {/* Cycle info */}
                    <div className="bg-lines-hairline rounded h-3 w-32" />
                </div>
            </div>

            {/* Chevron */}
            <div className="bg-lines-hairline rounded w-4 h-4" />
        </div>
    );
};

export default SidebarProjectCardSkeleton;