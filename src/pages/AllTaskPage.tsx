import Text from "@/components/common/Text"
import AllTaskListItem from "@/features/tasks/components/listView/AllTaskListItem";

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

            <AllTaskListItem gridTemplateColumns={gridTemplateColumns} isDone={false} />

        </>
    )
}

export default AllTaskPage
