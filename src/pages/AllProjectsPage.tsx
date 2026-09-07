import Text from "@/components/common/Text";
import Tabs, { type TabsOption } from "@/components/inputs/Tabs";
import EmptyTaskCard from "@/features/projects/components/EmptyTaskCard";
import ProjectCardGrid from "@/features/projects/components/ProjectCardGrid";
import { mapProjectToCard } from "@/lib/mapProjectToCard";
import { getAllUserProjects, getProjectMembers } from "@/lib/services/api/projectServices";
import type { Project, ProjectMember } from "@/lib/services/types";
import { useEffect, useState } from "react";

const AllProjectsPage = () => {
    const [projectsView, setProjectsView] = useState("grid")

    const tabs: TabsOption<"grid" | "list">[] = [{ label: "Grid", value: "grid" }, { label: "List", value: "list" }]

    return (
        <div className="w-full flex flex-col px-8 py-6 gap-8">
            <div className="flex w-full items-center justify-between">
                <div>
                    <Text variant="display" className="text-3xl font-medium">
                        Projects
                    </Text>

                    <Text variant="body-sm" className="text-ink-2">
                        {activeCount} active · {archivedCount} archived
                    </Text>
                </div>

                <Tabs
                    onChange={setProjectsView}
                    activeTab={projectsView}
                    tabs={tabs}
                />
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCardGrid
                        key={project.id}
                        {...mapProjectToCard(project, membersByProject[project.id])}
                    />
                ))}

                <EmptyTaskCard />
            </div>

            <div>
                <Text className="text-ink-2" variant="h2">
                    RECENT ACTIVITY
                </Text>
            </div>
        </div>
    );
};

export default AllProjectsPage;