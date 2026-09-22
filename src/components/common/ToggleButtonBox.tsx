import React from 'react'
import ToggleButton from '../inputs/ToggleButton'
import { cn } from '@/lib/cn';

interface ToggleButtonBoxProps {
    children: React.ReactNode;
    checked: boolean;
    onChange: (value: boolean) => void;
    classname?: string;
    contentClassName?: string;
}

const ToggleButtonBox = ({ children, checked, onChange, classname, contentClassName }: ToggleButtonBoxProps) => {
    return (
        <div className={cn("w-full bg-accent-wash-selected border border-dashed border-accent rounded-md p-4", classname)}>
            <div className="flex items-center gap-3 w-full">
                <ToggleButton checked={checked} onChange={onChange} />
                <div className={cn("flex w-full gap-1", contentClassName)}>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default ToggleButtonBox
