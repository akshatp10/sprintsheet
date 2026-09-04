import Text from "@/components/common/Text"
import { cn } from "@/lib/cn"
import { CircleMinus, GripVertical } from "lucide-react"

interface ColumnChipProps {
    label: string,
    required: boolean
}

const ColumnChip = ({ label, required }: ColumnChipProps) => {
    return (
        <div
            className={cn(
                "flex items-center gap-1.5 rounded-md border px-3 py-1.5",
                required
                    ? "bg-accent-wash-selected border-accent-wash-selected"
                    : "bg-surface border-lines-hairline"
            )}
        >
            <GripVertical className="w-4 h-4 text-ink-3 cursor-grab" />
            <Text variant="body-sm" className="text-ink">
                {label}
            </Text>
            {required ? (
                <Text variant="caption" className="text-ink-3">required</Text>
            ) : (
                <CircleMinus className="w-3.5 h-3.5 text-ink-3" />
            )}
        </div>
    )
}

export default ColumnChip
