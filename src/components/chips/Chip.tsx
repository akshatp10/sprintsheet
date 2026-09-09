import { cn } from '@/lib/cn'

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string
    variant: "primary" | "secondary"
    bgColor?: string
    borderColor?: string
    textColor?: string
    textType?: string
}

const Chip = ({ text, variant, bgColor = "bg-transparent", borderColor = "border border-lines-control", textColor = "text-ink-2", textType = "text-type-body-sm", ...props }: ChipProps) => {

    const commonClass = "w-fit h-fit text-center px-2 py-0.5 text-type-body rounded-sm text-ink-2";

    const variantClasses = {
        primary: commonClass + " bg-lines-control",
        secondary: commonClass + " bg-transparent border border-lines-border"
    }

    return (
        <div className={cn(variantClasses[variant], bgColor, borderColor, textColor, textType)} {...props}>
            {text}
        </div>
    )
}


export default Chip
