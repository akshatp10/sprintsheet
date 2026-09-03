import Text from "@/components/common/Text";
import Button from "@/components/button/Button";
import ProgressBar from "@/components/common/ProgressBar";
import AvatarGroup from "@/components/identity/AvatarGroups";
import UserAvatar from "@/components/identity/UserAvatar";
import ChipAvatar from "@/components/identity/ChipAvatar";
import GlobalChip from "@/components/chips/GlobalChip";
import { useNavigate } from "react-router-dom";
import { Ellipsis } from "lucide-react";

type ProjectUser = {
    userName: string;
    variant: "blue" | "amber" | "purple" | "rose";
};

type ProjectCardProps = {
    initials: string;
    title: string;
    description: string;
    date: string;
    openCount: number;
    progress: number;
    progressText: string;
    users: ProjectUser[];
    extraUsers?: number;
};

const ProjectCardGrid = ({
    initials,
    title,
    description,
    date,
    openCount,
    progress,
    progressText,
    users,
    extraUsers = 0,
}: ProjectCardProps) => {

    const navigate = useNavigate();

    //Temporary navigating to sample project route
    const clickingProjectCard = () => {
        navigate("/project/1")
    }

    return (
        <Button
            handleClick={clickingProjectCard}
            variant="tertiary"
            className="flex h-55 w-full flex-col items-stretch justify-between rounded-xl border border-lines-hairline bg-surface px-6 py-4 text-left"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-tint text-accent text-type-h2">
                        {initials}
                    </span>

                    <Text variant="h1" className="text-xl text-ink font-medium">
                        {title}
                    </Text>
                </div>

                <Ellipsis size={17} strokeWidth={1.5} className="text-ink-fades-ghost-rows" />
            </div>

            <Text className="w-full text-left text-ink-2">
                {description}
            </Text>

            <div className="flex gap-2">
                <GlobalChip
                    text={date}
                    variant="primary"
                    bgColor="bg-accent-tint"
                    textColor="text-accent"
                />

                <GlobalChip
                    text={`${openCount} open`}
                    variant="secondary"
                    borderColor="border-lines-control"
                    textColor="text-ink-2"
                />
            </div>

            <ProgressBar
                progress={progress}
                color="bg-accent"
            />

            <div className="flex items-center gap-3">
                <AvatarGroup>
                    {users.map((user) => (
                        <UserAvatar
                            key={user.userName}
                            userName={user.userName}
                            variant={user.variant}
                        />
                    ))}

                    {extraUsers > 0 && (
                        <ChipAvatar extraUsers={extraUsers} />
                    )}
                </AvatarGroup>

                <Text variant="body-sm" className="text-ink-2">
                    {progressText}
                </Text>
            </div>
        </Button>
    );
};

export default ProjectCardGrid;