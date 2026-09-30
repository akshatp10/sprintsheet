import Button from "@/components/button/Button";
import Drawer from "@/components/drawer/Drawer";
import SearchInput from "@/components/inputs/SearchInput";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TaskCreateForm from "./forms/TaskCreateForm";
import type { Task } from "@/lib/services/tasks/types";
import { ArrowUpToLine, Inbox } from "lucide-react";
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
                        autoFocus
                        searchElementId="backlogTasksSearch"
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
                <div className="w-full px-4 flex flex-col flex-1 gap-2 min-h-0 overflow-y-auto">
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

                {/* Footer */}
                <div className="shrink-0 p-4 bg-surface-sunken border-t border-lines-hairline flex flex-col gap-2">
                    <Text className="text-ink-3">
                        Adds to
                        <Text as="span" className="font-medium mx-1 text-ink">
                            Aug 17-21
                        </Text>
                        and leaves the backlog. Stage, status, assignee and history are unchanged.
                    </Text>
                    <div className="flex gap-2 w-full">
                        <Button variant="secondary" className="bg-surface text-ink border-lines-control shadow-lines-control" onClick={handleClose}>
                            <Text variant="body" className="font-medium">
                                Close
                            </Text>
                        </Button>
                        <Button
                            variant="secondary"
                            className="text-ink border flex items-center gap-1 flex-1 justify-center"
                        >
                            <ArrowUpToLine strokeWidth={1.5} size={15} /> Add to{" "}
                            {"Sep 18 - Sep 20"}
                        </Button>
                    </div>
                </div>
            </Drawer >

            {openTaskForm && (
                <TaskCreateForm
                    projectId={projectid ?? ""}
                    defaultStageId={clickedStageId}
                    onClose={handleCloseTaskForm}
                />
            )
            }
        </>
    );
};

export default BacklogDrawer;
