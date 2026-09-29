import Button from "@/components/button/Button";
import Drawer from "@/components/drawer/Drawer";
import SearchInput from "@/components/inputs/SearchInput";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TaskCreateForm from "./forms/TaskCreateForm";
import type { Task } from "@/lib/services/tasks/types";
import { Inbox } from "lucide-react";
import Text from "@/components/common/Text";
import BacklogTaskCard from "./BacklogTaskCard";
import Mascot from "@/components/common/Mascot";

interface BacklogDrawerProps {
    handleClose: () => void;
    backlogTasks: Task[];
}

const BacklogDrawer = ({ handleClose, backlogTasks }: BacklogDrawerProps) => {
    const [searchProject, setSearchProject] = useState("");
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [clickedStageId, setClickedStageId] = useState("");

    const { projectid } = useParams<{ projectid: string }>();

    const handleCreateTask = () => {
        setClickedStageId("");
        setOpenTaskForm(true);
    };

    const handleCloseTaskForm = () => {
        setOpenTaskForm(false);
        setClickedStageId("");
    };

    return (
        <>
            <Drawer
                onClose={handleClose}
                label={
                    <div className="flex items-center gap-2">
                        <Inbox strokeWidth={1.5} size={18} /> Backlog <Text variant="label" className="text-ink-3" as="span">{backlogTasks?.length} tasks - no cycle</Text>
                    </div>
                }
                width="30dvw"
                className="h-[95dvh] bg-surface-page z-20"
            >
                <div className="w-full p-4 flex flex-col gap-4">
                    <SearchInput
                        placeholder="Search the backlog..."
                        onChange={setSearchProject}
                        value={searchProject}
                        className="w-full h-10"
                        autofocus
                    />
                    <Button
                        variant="primary"
                        className="py-0.5 px-3 font-medium w-full h-10 text-type-body text-left bg-transparent text-ink-2 border-lines"
                        onClick={() => {
                            handleCreateTask();
                        }}
                    >
                        + New Task - Stays in the backlog
                    </Button>
                </div>
                <div className="w-full px-4 flex flex-col gap-2">
                    {backlogTasks?.length > 0
                        ? backlogTasks.map(backlogTask => (<BacklogTaskCard key={backlogTask.id} />))
                        : <div className="flex min-h-16 items-center justify-center gap-2 rounded-lg border border-lines-control bg-surface">
                            <Mascot renderAnimation expression="sleeping" />
                            <Text
                                variant="body-sm"
                                className="text-ink-3"
                            >
                                No backlog tasks
                            </Text>
                        </div>}
                </div>
            </Drawer>

            {openTaskForm && (
                <TaskCreateForm
                    projectId={projectid ?? ""}
                    defaultStageId={clickedStageId}
                    onClose={handleCloseTaskForm}
                />
            )}
        </>
    );
};

export default BacklogDrawer;
