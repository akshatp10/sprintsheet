import Text from "@/components/common/Text"
import CycleHeaderElement from "@/features/cycles/components/CycleHeaderElement";
import AllTaskListItem from "@/features/tasks/components/listView/AllTaskListItem";
import { useCycleStatus } from "@/hooks/useCycleStatus";
import { useGetAllCyclesByProject } from "@/lib/services/cycles/hooks";
import { useBacklogTasks } from "@/lib/services/tasks/hooks";
import { useParams } from "react-router-dom";

const AllTaskPage = () => {

    const columns = [
        {
            key: "key",
            label: "KEY",
            width: "100px",
        },
        {
            key: "title",
            label: "TITLE",
            width: "1fr",
        },
        {
            key: "stage",
            label: "STAGE",
            width: "120px",
        },
        {
            key: "status",
            label: "STATUS",
            width: "120px",
        },
        {
            key: "assignee",
            label: "ASSIGNEE",
            width: "120px",
        },
        {
            key: "due",
            label: "DUE",
            width: "100px",
        },
    ];

    const gridTemplateColumns = [
        "40px",
        ...columns.map((column) => column.width),
    ].join(" ");

    const { projectid } = useParams<{ projectid: string }>();

    const { data: allCycles = [] } = useGetAllCyclesByProject(projectid ?? "");

    const {
        active: activeCycles,
        closed: closedCycles,
        planned: plannedCycles,
    } = useCycleStatus(allCycles);

    const cyclesWithStatus = [
        ...plannedCycles.map((cycle) => ({
            cycle,
            status: "planned" as const,
        })),
        ...activeCycles.map((cycle) => ({
            cycle,
            status: "active" as const,
        })),
        ...closedCycles.map((cycle) => ({
            cycle,
            status: "closed" as const,
        })),
    ];

    const { data: backlogTasks = [] } = useBacklogTasks(projectid ?? "");

    console.log('====================================');
    console.log(backlogTasks);
    console.log('====================================');

    return (
        <>
            <div
                className="grid h-10 border-b border-lines-control bg-surface-desk text-xs font-medium"
                style={{
                    gridTemplateColumns,
                }}
            >
                <div className="flex items-center border-r border-lines-control px-3" />

                {columns.map((column) => (
                    <Text
                        key={column.key}
                        className="flex items-center border-r border-lines-control px-3 last:border-r-0 text-ink-3"
                    >
                        {column.label}
                    </Text>
                ))}
            </div>

            <CycleHeaderElement variant="backlog" />
            {cyclesWithStatus.map((cycle) => (
                <CycleHeaderElement variant={cycle?.status === "active" ? "active" : "other"} cycle={cycle?.cycle} />
            ))}

            <AllTaskListItem gridTemplateColumns={gridTemplateColumns} isDone={false} />

        </>
    )
}

export default AllTaskPage
