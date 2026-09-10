const ProjectCardGridSkeleton = () => {
    return (
        <div className="flex h-50 w-full flex-col items-stretch justify-between rounded-xl border border-lines-hairline bg-surface px-6 py-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 animate-pulse rounded-md bg-lines-control" />
                    <div className="h-5 w-32 animate-pulse rounded bg-lines-control" />
                </div>

                <div className="h-4 w-4 animate-pulse rounded bg-lines-control" />
            </div>

            {/* Description */}
            <div className="h-4 w-full animate-pulse rounded bg-lines-control" />

            {/* Chips */}
            <div className="flex gap-2">
                <div className="h-6 w-20 animate-pulse rounded-md bg-lines-control" />
                <div className="h-6 w-16 animate-pulse rounded-md bg-lines-control" />
            </div>

            {/* Progress */}
            <div className="h-2 w-full animate-pulse rounded-full bg-lines-control" />

            {/* Users + progress text */}
            <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                    <div className="h-7 w-7 animate-pulse rounded-full bg-lines-control" />
                    <div className="h-7 w-7 animate-pulse rounded-full bg-lines-control" />
                    <div className="h-7 w-7 animate-pulse rounded-full bg-lines-control" />
                </div>

                <div className="h-4 w-24 animate-pulse rounded bg-lines-control" />
            </div>
        </div>
    );
};

export default ProjectCardGridSkeleton;