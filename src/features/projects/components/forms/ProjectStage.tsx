import Text from '@/components/common/Text'
import { cn } from '@/lib/cn'
import { GripVertical } from 'lucide-react'

interface ProjectStageProps { label: string, color: string, tag: string | null }

const ProjectStage = ({ color, label, tag }: ProjectStageProps) => {
    return (
        <div
            key={label}
            className="flex items-center justify-between rounded-md border border-lines-hairline w-full px-3 py-2"
        >
            <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-ink-3 cursor-grab" />
                <span className={cn("w-2 h-2 rounded-full shrink-0", color)} />
                <Text variant="body-sm" className="text-ink">{label}</Text>
            </div>

            {tag && (
                <span className="rounded-md border border-lines-hairline px-2 py-0.5">
                    <Text variant="caption" className="text-ink-3">{tag}</Text>
                </span>
            )}
        </div>
    )
}



export default ProjectStage
