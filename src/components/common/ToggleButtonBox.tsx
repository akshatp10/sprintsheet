import React from 'react'
import ToggleButton from '../inputs/ToggleButton'
import { cn } from '@/lib/cn';

interface ToggleButtonBox {
    children: React.ReactNode
    checked: boolean;
    onChange: (value: boolean) => void;
    classname?: string
}

const ToggleButtonBox = ({ children, checked, onChange, classname }: ToggleButtonBox) => {
    return (
        <div className={cn("w-full bg-accent-wash-selected border border-dashed border-accent rounded-md p-4", classname)}>
            <div className="flex items-start gap-3">
                <ToggleButton checked={checked} onChange={onChange} />
                <div className="flex flex-col gap-1 w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}


export default ToggleButtonBox
