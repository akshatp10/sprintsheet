import Button from "../button/Button";
import Text from "../common/Text";
import Tabs, { type TabsOption } from "../inputs/Tabs";
import Chip from "../chips/Chip";
import TaskCreateForm from "@/features/tasks/components/forms/TaskCreateForm";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

const ProjectsTopbar = () => {
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const { projectid } = useParams<{ projectid: string }>();

    const [searchParams, setSearchParams] = useSearchParams();

    const currentView = searchParams.get("view") === "cards" ? "cards" : "table";

    const tabs: TabsOption<"table" | "cards">[] = [
        { label: "Table", value: "table" },
        { label: "Cards", value: "cards" },
    ];

    const handleViewChange = (view: "table" | "cards") => {
        setSearchParams((prev) => {
            prev.set("view", view);
            return prev;
        });
    };

    return (
        <>
            <div className="flex w-full items-center justify-between gap-3">
                <div className="flex w-full items-center gap-3">
                    <Tabs
                        onChange={handleViewChange}
                        activeTab={currentView}
                        tabs={tabs}
                    />

                    <Chip
                        text="Aug 17-21 · 5 days"
                        variant="primary"
                        bgColor="bg-accent-tint"
                        borderColor=""
                        textColor="text-accent-deep"
                    />

                    <Text className="text-ink-3">
                        9 tasks · 3 done
                    </Text>
                </div>

                <div className="min-w-0 shrink-0">
                    <Button
                        variant="secondary"
                        className="h-full py-0.5 font-medium"
                        handleClick={() => setOpenTaskForm(true)}
                    >
                        + New Task
                    </Button>
                </div>
            </div>

            {openTaskForm && (
                <TaskCreateForm
                    projectId={projectid ?? ""}
                    onClose={() => setOpenTaskForm(false)}
                />
            )}
        </>
    );
};

export default ProjectsTopbar;