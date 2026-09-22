import React from 'react'
import ToggleButton from '../inputs/ToggleButton'
import { cn } from '@/lib/cn';

interface ToggleButtonBox {
    children: React.ReactNode
    checked: boolean;
    onChange: (value: boolean) => void;
    classname?: string
    isDisabled?: boolean
}

const ToggleButtonBox = ({ children, checked, onChange, classname, isDisabled = false }: ToggleButtonBox) => {
    return (
        <div className={cn("w-full bg-accent-wash-selected border border-dashed border-accent rounded-md p-4", classname)}>
            <div className="flex items-start gap-3">
                <ToggleButton checked={checked} onChange={onChange} disabled={isDisabled} />
                <div className="flex flex-col gap-1 w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}


export default ToggleButtonBox
