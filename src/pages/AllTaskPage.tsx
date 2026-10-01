import Checkbox from "@/components/inputs/Checkbox";
import TableWrapper from "@/components/table/TableWrapper";
import CycleAllTaskSelectionFooter from "@/features/cycles/components/CycleAllTaskSelectionFooter";
import CycleHeaderElement from "@/features/cycles/components/CycleHeaderElement";
import CycleTaskSection from "@/features/tasks/components/CycleTaskSection";
import AllTaskListItem from "@/features/tasks/components/listView/AllTaskListItem";
import TaskDetailsDrawer from "@/features/tasks/components/TaskDetailsDrawer";
import { useCycleStatus } from "@/hooks/useCycleStatus";
import { useGetAllCyclesByProject } from "@/lib/services/cycles/hooks";
import { useBacklogTasks, useGetAllTasksByProject, useGetTasksByCycle } from "@/lib/services/tasks/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";


const AllTaskPage = () => {
    const columns = [
        {
            key: "selection",
            label: "",
            width: "40px",
            renderHeader: () => (
                <Checkbox
                    checked={allTasksSelected}
                    onChange={handleSelectAll}
                    className="bg-transparent border-2"
                />),
        },
        { key: "key", label: "KEY", width: "100px" },
        { key: "title", label: "TITLE", width: "1fr" },
        { key: "stage", label: "STAGE", width: "120px" },
        { key: "status", label: "STATUS", width: "120px" },
        { key: "assignee", label: "ASSIGNEE", width: "120px" },
        { key: "due", label: "DUE", width: "100px" },
    ];

    const gridTemplateColumns = columns.map((column) => column.width).join(" ");
    const { projectid } = useParams<{ projectid: string }>();

    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

    const { data: allCycles = [] } = useGetAllCyclesByProject(projectid ?? "");
    const { data: tasksByCycle = {} } = useGetTasksByCycle(projectid ?? "");
    const { data: allBacklogTasks } = useBacklogTasks(projectid ?? "");

    const {
        active: activeCycles,
        closed: closedCycles,
        planned: plannedCycles,
    } = useCycleStatus(allCycles);

    const cyclesWithStatus = [
        ...plannedCycles.map((cycle) => ({ cycle, status: "planned" as const })),
        ...activeCycles.map((cycle) => ({ cycle, status: "active" as const })),
        ...closedCycles.map((cycle) => ({ cycle, status: "closed" as const })),
    ];

    const { data: allTasks } = useGetAllTasksByProject(projectid ?? "");

    const allTaskIds = allTasks?.map((task) => task.id) ?? [];

    console.log(allTasks?.length);


    const allTasksSelected =
        allTaskIds.length > 0 &&
        allTaskIds.every((id) => selectedTaskIds.includes(id));

    const handleSelectAll = (selected: boolean) => {
        setSelectedTaskIds(selected ? allTaskIds : []);
    };

    const handleTaskSelection = (taskId: string, selected: boolean) => {
        setSelectedTaskIds((prev) => {
            if (selected) {
                return [...prev, taskId];
            }

            return prev.filter((id) => id !== taskId);
        });
    };

    return (
        <div className="flex h-full flex-col justify-between">
            <TableWrapper columns={columns}>
                <CycleHeaderElement variant="backlog" taskCount={allBacklogTasks?.length ?? 0} />
                {!!allBacklogTasks?.length && allBacklogTasks.map((task) => (
                    <AllTaskListItem
                        key={task.id}
                        task={task}
                        gridTemplateColumns={gridTemplateColumns}
                        isDone={false}
                        onSelectionChange={handleTaskSelection}
                        selectedTaskIds={selectedTaskIds}
                    />
                ))}

                {cyclesWithStatus.map(({ cycle, status }) => (
                    <CycleTaskSection
                        key={cycle.id}
                        cycle={cycle}
                        status={status}
                        tasks={tasksByCycle[cycle.id] ?? []}
                        gridTemplateColumns={gridTemplateColumns}
                        onSelectionChange={handleTaskSelection}
                        selectedTaskIds={selectedTaskIds}
                    />
                ))}
            </TableWrapper>
            {!!selectedTaskIds.length &&
                <CycleAllTaskSelectionFooter activeCycle={activeCycles[0]} selectedTaskLength={selectedTaskIds.length} />
            }

            <TaskDetailsDrawer />
        </div>
    );
};

export default AllTaskPage;