import React from 'react'
import ToggleButton from '../inputs/ToggleButton'
import { cn } from '@/lib/cn';

interface ToggleButtonBoxProps {
    /** Content displayed alongside the toggle button. */
    children: React.ReactNode;

    /** Current checked state of the toggle. */
    checked: boolean;

    /** Callback invoked with the new checked state when the toggle changes. */
    onChange: (value: boolean) => void;

    /** Additional CSS classes applied to the outer container. */
    className?: string;

    /** Additional CSS classes applied to the content container. */
    contentClassName?: string;

    /** Disables the toggle button and prevents user interaction. Defaults to `false`. */
    isDisabled?: boolean;
}
const ToggleButtonBox = ({ children, checked, onChange, className, contentClassName, isDisabled = false }: ToggleButtonBoxProps) => {
    return (
        <div className={cn("w-full bg-accent-wash-selected border border-dashed border-accent rounded-md p-4", className)}>
            <div className="flex items-center gap-3 w-full">
                <ToggleButton checked={checked} onChange={onChange} disabled={isDisabled} />
                <div className={cn("flex w-full gap-1", contentClassName)}>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default ToggleButtonBox
