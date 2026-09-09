import { GripVertical } from 'lucide-react'
import ProjectStage from './forms/ProjectStage'
import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

interface ProjectDropComponentProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    color: string;
    className?: string
}

const ProjectDropComponent = ({ color, label, className, ...props }: ProjectDropComponentProps) => {
    return (
        <div className={cn('flex items-center gap-2 rounded-md border-2 border-lines-control', className)} {...props}>
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
