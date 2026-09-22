import { Grid2X2, UsersRound } from "lucide-react";
import SidebarNavigations from "./SidebarNavigations";
import { isFeatureEnabled } from "@/config/features";

const WorkspaceSidebar = () => {

    const options = [
        {
            label: "All projects",
            to: "/",
            icon: <Grid2X2 size={20} strokeWidth={1.5} />,
            feature: null,
        },
        {
            label: "People",
            to: "/test",
            icon: <UsersRound size={20} strokeWidth={1.5} />,
            feature: "HOME_PEOPLE" as const,
        },
    ];

    return (
        <div>
            {/* Workspace */}
            <div className="flex items-center gap-3">
                <span className="bg-accent px-2 rounded-md text-white">
                    S
                </span>

                <span>Sprintsheet</span>
            </div>

            {/* Options */}
            <div className="mt-6 flex flex-col gap-1">
                {options
                    .filter(
                        (option) =>
                            option.feature === null ||
                            isFeatureEnabled(option.feature),
                    )
                    .map((option) => (
                        <SidebarNavigations
                            key={option.to}
                            {...option}
                        />
                    ))}
            </div>
        </div>
    );
};

export default WorkspaceSidebar;