import { useCallback, useState } from "react";
import Button from "../button/Button"
import Text from "../common/Text"
import TaskCreateForm from "@/features/tasks/components/forms/TaskCreateForm";
import { useParams } from "react-router-dom";
import useShortcutSearch from "@/hooks/useShortcutSearch";
import SearchInput from "../inputs/SearchInput";
import { isMac } from "@/lib/utils";

const AllTaskTopbar = () => {

    const [openTaskForm, setOpenTaskForm] = useState(false);
    const { projectid } = useParams<{ projectid: string }>();

    const [searchProject, setSearchProject] = useState("")
    const focusSearch = useCallback(() => {
        document.getElementById("search")?.focus();
    }, []);

    useShortcutSearch("k", focusSearch)

    return (
        <>
            <div className="flex w-full items-center justify-between gap-3">
                {/* Left Side */}
                <div className="flex items-center gap-3">
                    <Text variant="h1">All tasks</Text>

                    <Text className="text-ink-3">
                        {62} tasks · {18} in the backlog
                    </Text>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 shrink-0">
                    <SearchInput value={searchProject} onChange={setSearchProject} placeholder={`Search tasks... ${isMac ? "⌘ K" : "Ctrl K"
                        }`} />
                    <Button
                        variant="primary"
                        className="py-0.5 font-medium"
                        onClick={() => setOpenTaskForm(true)}
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
    )
}

export default AllTaskTopbar
