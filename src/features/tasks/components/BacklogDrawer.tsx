import Drawer from '@/components/drawer/Drawer'

interface BacklogDrawerProps {
    handleClose: () => void
}

const BacklogDrawer = ({ handleClose }: BacklogDrawerProps) => {
    return (
        <Drawer onClose={handleClose} label='Backlog' width='30dvw' className='h-[95dvh] bg-surface-page z-20'>
            Hi
        </Drawer>
    )
}

export default BacklogDrawer
