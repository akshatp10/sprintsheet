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

import { useNavigate, useParams } from "react-router-dom";

import CurProjectSidebarCard from "@/features/projects/components/CurProjectSidebarCard";
import { useSingleProject } from "@/lib/services/projects/hooks";
import SidebarProjectCardSkeleton from "@/features/projects/components/skeletons/SidebarProjectCardSkeleton";

import { isFeatureEnabled } from "@/config/features";

const ProjectsSidebar = () => {
    const navigate = useNavigate();
    const { projectid } = useParams();

    const { data: project } = useSingleProject(projectid ?? "");

    const options = [
        {
            label: "Dashboard",
            to: `/project/${projectid}`,
            icon: <ChartPie size={20} strokeWidth={1.5} />,
            feature: "PROJECT_HOME" as const,
        },
        {
            label: "Board",
            to: `/project/${projectid}/board`,
            icon: <Table2 size={20} strokeWidth={1.5} />,
            feature: "PROJECT_BOARD" as const,
        },
        {
            label: "All tasks",
            to: `/project/${projectid}/tasks`,
            icon: <ListChecks size={20} strokeWidth={1.5} />,
            feature: "PROJECT_TASKS" as const,
        },
        {
            label: "Cycles",
            to: `/project/${projectid}/cycles`,
            icon: <RefreshCcw size={20} strokeWidth={1.5} />,
            feature: "PROJECT_CYCLES" as const,
        },
    ];

    return (
        <div className="flex flex-col gap-3">
            {/* Back to all projects */}
            <Button
                className="flex items-center gap-2 border-none"
                onClick={() => navigate("/")}
                variant="tertiary"
            >
                <ArrowLeft
                    size={20}
                    strokeWidth={1.5}
                    className="text-ink-fades-ghost-rows"
                />

                <Text variant="h2" className="text-ink-2">
                    All projects
                </Text>
            </Button>

            {project ? (
                <CurProjectSidebarCard project={project} />
            ) : (
                <SidebarProjectCardSkeleton />
            )}

            {/* Navigation */}
            <div className="flex flex-col gap-1">
                {options
                    .filter((option) => isFeatureEnabled(option.feature))
                    .map((option) => (
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