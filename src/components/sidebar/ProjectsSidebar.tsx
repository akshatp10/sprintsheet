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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CurProjectSidebarCard from "@/features/projects/components/CurProjectSidebarCard";
import { useSingleProject } from "@/lib/services/projects/hooks";
import SidebarProjectCardSkeleton from "@/features/projects/components/skeletons/SidebarProjectCardSkeleton";
import { useCycle } from "@/lib/services/cycles/hooks";

const ProjectsSidebar = () => {

    const navigate = useNavigate();
    const { projectid } = useParams();
    const [searchParams] = useSearchParams();
    const cycleId = searchParams.get("cycle")

    const { data: project } = useSingleProject(projectid ?? "");
    const { data: cycle } = useCycle(cycleId ?? "");


    const options = [
        {
            label: "Dashboard",
            to: `project/${projectid}`,
            icon: <ChartPie size={20} strokeWidth={1.5} />,
        },
        {
            label: "Board",
            to: `project/${projectid}/board`,
            icon: <Table2 size={20} strokeWidth={1.5} />,
        },
        {
            label: "All tasks",
            to: `project/${projectid}/tasks`,
            icon: <ListChecks size={20} strokeWidth={1.5} />,
        },
        {
            label: "Cycles",
            to: `project/${projectid}/cycles`,
            icon: <RefreshCcw size={20} strokeWidth={1.5} />,
        },
    ];

    return (
        <div className="flex flex-col gap-3">
            {/* Back to all projects */}
            <Button className="flex items-center gap-2 border-none" onClick={() => { navigate("/") }} variant="tertiary">
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
                <CurProjectSidebarCard project={project} cycleName={cycle?.name ?? ""} />
            ) : (
                <SidebarProjectCardSkeleton />
            )}

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