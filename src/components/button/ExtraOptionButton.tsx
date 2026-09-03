import type { ButtonHTMLAttributes } from 'react';
import Button from './Button'
import { Ellipsis } from 'lucide-react'

interface ExtraOptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    handleClick: () => void;
}

const ExtraOptionButton = ({ handleClick }: ExtraOptionButtonProps) => {
    return (
        <Button handleClick={handleClick} variant='tertiary' className='border-0'>
            <Ellipsis size={17} strokeWidth={1.5} className="text-ink-fades-ghost-rows" />
        </Button>
    )
}

export default ExtraOptionButton
