import Text from "@/components/common/Text";
import { RadioButton } from "@/components/inputs/RadioButton";
import EmptyTaskCard from "@/features/projects/components/EmptyTaskCard";
import ProjectCardGrid from "@/features/projects/components/ProjectCardGrid";
import { useState } from "react";

const AllProjectsPage = () => {
    interface projectType {
        initials: string;
        title: string;
        description: string;
        date: string;
        openCount: number;
        progress: number;
        progressText: string;
        users: {
            userName: string;
            variant: "blue" | "amber" | "purple" | "rose";
        }[];
        extraUsers?: number;
    }
    const projects: projectType[] = [
        {
            initials: "CR",
            title: "CRM Frontend",
            description:
                "Web + mobile CRM rebuild. Weekly cycles, QA gate before release.",
            date: "Aug 17-21",
            openCount: 9,
            progress: 64,
            progressText: "64% this cycle",
            users: [
                {
                    userName: "Akshat",
                    variant: "blue",
                },
                {
                    userName: "Rohit",
                    variant: "amber",
                },
            ],
            extraUsers: 3,
        },
        {
            initials: "AP",
            title: "Analytics Platform",
            description:
                "New analytics dashboard with reporting and data visualization.",
            date: "Aug 22-28",
            openCount: 6,
            progress: 48,
            progressText: "48% this cycle",
            users: [
                {
                    userName: "Akshat",
                    variant: "blue",
                },
            ],
        },
        {
            initials: "MB",
            title: "Mobile App",
            description:
                "Mobile experience improvements, onboarding and navigation updates.",
            date: "Aug 25-29",
            openCount: 4,
            progress: 78,
            progressText: "78% this cycle",
            users: [
                {
                    userName: "Rohit",
                    variant: "amber",
                },
                {
                    userName: "Sam",
                    variant: "rose",
                },
            ],
            extraUsers: 1,
        },
    ];

    const [projectsView, setProjectsView] = useState("grid")

    return (
        <div className="w-full flex flex-col px-8 py-6 gap-8">
            <div className="flex w-full items-center justify-between">
                <div>
                    <Text variant="display">Projects</Text>
                    <Text variant="body-sm" className="text-ink-2">3 active · 1 archived</Text>
                </div>

                <RadioButton
                    onChange={setProjectsView}
                    value={projectsView}
                    options={[{ label: "Grid", value: "grid" }, { label: "List", value: "list" }]}
                />
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCardGrid
                        key={project.title}
                        {...project}
                    />
                ))}
                <EmptyTaskCard />
            </div>

            <div>
                <Text className="text-ink-2" variant="h2">RECENT ACTIVITY</Text>
            </div>
        </div>
    );
};

export default AllProjectsPage;