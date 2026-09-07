import type { Project, ProjectMember } from "@/lib/services/types";

interface ProjectUser {
    userName: string;
    variant: "blue" | "amber" | "purple" | "rose";
}

const avatarVariants: ProjectUser["variant"][] = ["blue", "amber", "purple", "rose"];

const getInitials = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");

const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export const mapProjectToCard = (project: Project, members: ProjectMember[] = []) => {
    const users: ProjectUser[] = members.slice(0, 4).map((m, i) => ({
        userName: m.name || m.email,
        variant: avatarVariants[i % avatarVariants.length],
    }));

    return {
        initials: getInitials(project.name),
        title: project.name,
        description: project.description,
        date: formatDate(project.createdAt),
        openCount: 0,
        progress: 0,
        progressText: "",
        users,
        extraUsers: members.length > 4 ? members.length - 4 : 0,
    };
};