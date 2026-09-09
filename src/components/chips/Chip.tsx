import { cn } from '@/lib/cn'

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string
    variant?: "primary" | "secondary" | "default"
    bgColor?: string
    borderColor?: string
    textColor?: string
    textType?: string
}

const Chip = ({ text, variant = "default", bgColor = "", borderColor = "", textColor = "", textType = "", ...props }: ChipProps) => {

    const commonClass = "w-fit h-fit text-center px-2 py-0.5 text-type-body rounded-sm text-ink-2";

    const variantClasses = {
        primary: cn(commonClass, " bg-lines-control"),
        secondary: cn(commonClass, " bg-transparent border border-lines-border"),
        default: cn(commonClass, "bg-transparent border border-lines-border"),
    }

    return (
        <div className={cn(variantClasses[variant], bgColor, borderColor, textColor, textType)} {...props}>
            {text}
        </div>
    )
}


export default Chip
