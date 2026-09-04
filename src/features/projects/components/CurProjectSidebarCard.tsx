import Text from '@/components/common/Text'
import { ChevronsUpDown } from 'lucide-react'

const CurProjectSidebarCard = () => {
    return (
        <div className='bg-surface border border-lines-hairline rounded-lg flex items-center justify-between px-4 py-2 w-full h-fit'>
            <div className='flex items-center gap-2'>
                <span className="bg-accent-tint px-2 rounded-md text-accent">
                    CR
                </span>

                <div className='flex flex-col'>
                    <Text variant='h2'>
                        CRM Frontend
                    </Text>
                    <Text className='text-ink-3'>Cycle 12 · Aug 17-21</Text>
                </div>
            </div>

            <ChevronsUpDown strokeWidth={1.5} size={15} className='text-ink-3' />
        </div>
    )
}

export default CurProjectSidebarCard
