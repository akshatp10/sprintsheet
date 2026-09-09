import { GripVertical } from 'lucide-react'
import ProjectStage from './forms/ProjectStage'

interface ProjectDropComponentProps {
    label: string;
    color: string;
}

const ProjectDropComponent = ({ color, label }: ProjectDropComponentProps) => {
    return (
        <div className='flex items-center gap-2 rounded-md border border-lines-hairline'>
            <div
                className="shrink-0 cursor-grab pl-3"
            >
                <GripVertical className="w-4 h-4 text-ink-3" />
            </div>
            <ProjectStage
                color={color ?? "bg-ink-3"}
                label={label}
                tag={null
                }
            />
        </div>
    )
}

export default ProjectDropComponent
