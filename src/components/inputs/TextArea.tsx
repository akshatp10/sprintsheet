import { cn } from "@/lib/cn"

type TextAreaProps = {
    value: string
    onChange: (value: string) => void
    className?: string
} & Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "className"
>

export default function TextArea({
    value,
    onChange,
    className,
    ...props
}: TextAreaProps) {
    return (
        <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={cn(
                "bg-surface rounded-md border border-lines-hairline px-2 py-1.5 text-ink placeholder:text-ink-fades-placeholders h-full text-type-body-sm focus:outline-0",
                className
            )}
            {...props}
        />
    )
}