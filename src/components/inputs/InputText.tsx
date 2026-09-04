import { cn } from "@/lib/cn"

type InputTextProps = {
    value: string
    onChange: (value: string) => void
    className?: string
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "className"
>

export function InputText({
    value,
    onChange,
    className,
    ...props
}: InputTextProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={cn(
                "bg-surface rounded-md border border-lines-hairline focus:outline-0 px-2 py-1.5 text-ink placeholder:text-ink-fades-placeholders h-full text-type-body-sm",
                className
            )}
            {...props}
        />
    )
}