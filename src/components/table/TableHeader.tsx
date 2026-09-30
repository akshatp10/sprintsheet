import Text from "@/components/common/Text";

import { cn } from "@/lib/cn";

export type TableColumn = {
    /**
     * Unique identifier used to associate the column with its header
     * and provide a stable React key.
     */
    key: string;

    /**
     * Text displayed as the column's header label.
     * Can be empty when the column intentionally has no header.
     */
    label: string;

    /**
     * CSS width value used to determine the column's size within
     * the table grid layout.
     */
    width: string;
};

interface TableHeaderProps {
    /**
     * Column definitions rendered as header cells, including each
     * column's label, identifier, and grid width.
     */
    columns: TableColumn[];

    /**
     * CSS grid-template-columns value that defines the complete
     * header column layout.
     */
    gridTemplateColumns: string;

    /**
     * Additional CSS classes applied to the entire table header row,
     * allowing its height, background, border, spacing, or other
     * styles to be customized.
     */
    className?: string;

    /**
     * Additional CSS classes applied to each header cell, allowing
     * their spacing, alignment, typography, or other styles to be
     * customized.
     */
    cellClassName?: string;
}

const TableHeader = ({
    columns,
    gridTemplateColumns,
    className,
    cellClassName,
}: TableHeaderProps) => {
    return (
        <div
            className={cn(
                "grid h-10 border-b border-lines-control bg-surface-desk text-xs font-medium",
                className,
            )}
            style={{
                gridTemplateColumns,
            }}
        >
            {columns.map((column) => (
                <Text
                    key={column.key}
                    className={cn(
                        "flex items-center border-r border-lines-control px-3 text-ink-3 last:border-r-0",
                        cellClassName,
                    )}
                >
                    {column.label}
                </Text>
            ))}
        </div>
    );
};

export default TableHeader;