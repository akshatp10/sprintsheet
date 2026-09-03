import type { HTMLAttributes } from "react"
import { cn } from "@/lib/cn"

interface GlobalChipProps extends HTMLAttributes<HTMLDivElement> {
    text: string
    variant: "primary" | "secondary"
    bgColor?: string
    borderColor?: string
    textColor?: string
    textType?: string
}

const GlobalChip = ({ text, variant, bgColor = "", borderColor = "", textColor = "", textType = "", className, ...props }: GlobalChipProps) => {
    const commonClass =
        "w-fit h-fit text-center px-2 py-0.5 text-type-body rounded-md text-ink-2"

    const variantClasses = {
        primary: `${commonClass} bg-lines-control`,
        secondary: `${commonClass} bg-transparent border border-lines-border`,
    }

    return (
        <div
            {...props}
            className={cn(
                variantClasses[variant],
                bgColor,
                borderColor,
                textColor,
                textType,
                className
            )}
        >
            {text}
        </div>
    )
}

export default GlobalChip