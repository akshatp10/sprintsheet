import Text from '@/components/common/Text'
import type { Project } from '@/lib/services/projects/types'
import { ChevronsUpDown } from 'lucide-react'

interface CurProjectSidebarCardProps {
    project: Project
    cycleName: string;
}

const CurProjectSidebarCard = ({ project, cycleName }: CurProjectSidebarCardProps) => {

    const initials = project.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return (
        <div className='bg-surface border border-lines-hairline rounded-lg flex items-center justify-between px-4 py-2 w-full h-15'>
            <div className='flex items-center gap-2'>
                <span className='bg-accent-tint px-2 rounded-md text-accent'>
                    {initials}
                </span>

                <div className='flex flex-col'>
                    <Text variant='h2'>
                        {project.name}
                    </Text>

                    <Text className='text-ink-3'>
                        {cycleName}
                    </Text>
                </div>
            </div>

            <ChevronsUpDown
                strokeWidth={1.5}
                size={15}
                className='text-ink-3'
            />
        </div>
    )
}

export default CurProjectSidebarCard
