import {
    ArrowLeft,
    ChartPie,
    ListChecks,
    RefreshCcw,
    Table2,
} from "lucide-react";

import SidebarNavigations from "./SidebarNavigations";
import Text from "../common/Text";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const ProjectsSidebar = () => {
    const options = [
        {
            label: "Dashboard",
            to: "/project",
            icon: <ChartPie size={20} strokeWidth={1.5} />,
        },
        {
            label: "Board",
            to: "/project",
            icon: <Table2 size={20} strokeWidth={1.5} />,
        },
        {
            label: "All tasks",
            to: "/project",
            icon: <ListChecks size={20} strokeWidth={1.5} />,
        },
        {
            label: "Cycles",
            to: "/project",
            icon: <RefreshCcw size={20} strokeWidth={1.5} />,
            count: 12,
        },
    ];

    const navigate = useNavigate()

    return (
        <div className="flex flex-col">
            {/* Back to all projects */}
            <Button className="flex items-center gap-2 mb-6 border-none" handleClick={() => { navigate("/") }} variant="tertiary">
                <ArrowLeft
                    size={20}
                    strokeWidth={1.5}
                    className="text-ink-fades-ghost-rows"
                />

                <Text variant="h2" className="text-ink-2">
                    All projects
                </Text>
            </Button>

            {/* Current project */}


            {/* Navigation */}
            <div className="flex flex-col gap-1">
                {options.map((option) => (
                    <SidebarNavigations
                        key={option.to}
                        label={option.label}
                        to={option.to}
                        icon={option.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectsSidebar;