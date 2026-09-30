import TableWrapper from "@/components/table/TableWrapper";
import CycleAllTaskSelectionFooter from "@/features/cycles/components/CycleAllTaskSelectionFooter";
import CycleHeaderElement from "@/features/cycles/components/CycleHeaderElement";
import CycleTaskSection from "@/features/tasks/components/CycleTaskSection";
import AllTaskListItem from "@/features/tasks/components/listView/AllTaskListItem";
import { useCycleStatus } from "@/hooks/useCycleStatus";
import { useGetAllCyclesByProject } from "@/lib/services/cycles/hooks";
import { useBacklogTasks, useGetTasksByCycle } from "@/lib/services/tasks/hooks";
import { useParams } from "react-router-dom";

const columns = [
    { key: "selection", label: "", width: "40px" },
    { key: "key", label: "KEY", width: "100px" },
    { key: "title", label: "TITLE", width: "1fr" },
    { key: "stage", label: "STAGE", width: "120px" },
    { key: "status", label: "STATUS", width: "120px" },
    { key: "assignee", label: "ASSIGNEE", width: "120px" },
    { key: "due", label: "DUE", width: "100px" },
];

const gridTemplateColumns = columns.map((column) => column.width).join(" ");

const AllTaskPage = () => {
    const { projectid } = useParams<{ projectid: string }>();

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
                    />
                ))}

                {cyclesWithStatus.map(({ cycle, status }) => (
                    <CycleTaskSection
                        key={cycle.id}
                        cycle={cycle}
                        status={status}
                        tasks={tasksByCycle[cycle.id] ?? []}
                        gridTemplateColumns={gridTemplateColumns}
                    />
                ))}
            </TableWrapper>

            <CycleAllTaskSelectionFooter />
        </div>
    );
};

export default AllTaskPage;