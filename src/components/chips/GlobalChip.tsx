import { cn } from '@/lib/cn'

interface GlobalChipProps {
    text: string
    variant: "primary" | "secondary"
    bgColor?: string
    borderColor?: string
    textColor?: string
    textType?: string
}

const GlobalChip = ({ text, variant, bgColor = "", borderColor = "", textColor = "", textType = "" }: GlobalChipProps) => {

    const commonClass = "w-fit h-fit text-center px-2 py-0.5 text-type-body rounded-sm text-ink-2";

    const variantClasses = {
        primary: commonClass + " bg-lines-control",
        secondary: commonClass + " bg-transparent border border-lines-border"
    }

    console.log(cn(variantClasses[variant], bgColor, borderColor, textColor))

    return (
        <div className={cn(variantClasses[variant], bgColor, borderColor, textColor, textType)}>
            {text}
        </div>
    )
}


export default GlobalChip
