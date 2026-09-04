import { cn } from "@/lib/cn"

type RadioOption<T extends string> = {
    label: string
    value: T
}

type RadioButtonProps<T extends string> = {
    options: RadioOption<T>[]
    value: T
    onChange: (value: T) => void
    name?: string
    classname?: string
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">

export function RadioButton<T extends string>({ options, value, onChange, className, name = "radio", ...props }: RadioButtonProps<T>) {
    const selectedIndex = options.findIndex(
        (option) => option.value === value
    )

    return (
        <div
            className={cn("relative inline-flex w-fit rounded-lg px-1 bg-surface-desk border border-lines-control", className)} {...props}>
            <div
                className="absolute top-0.5 bottom-0.5 left-0.5 rounded-md border border-lines-control shadow-sm transition-transform duration-200 ease-out"
                style={{
                    width: `calc((100% - 0.25rem) / ${options.length})`,
                    transform: `translateX(${selectedIndex * 100}%)`,
                }}
                aria-hidden="true"
            />


            {options.map((option) => {
                const selected = option.value === value

                return (
                    <label
                        key={String(option.value)}
                        className={`relative z-10 shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors duration-200 ${selected ? "text-ink" : "text-ink-fades-ghost-rows"}`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={String(option.value)}
                            checked={selected}
                            onChange={() => onChange(option.value)}
                            className="sr-only"
                        />

                        {option.label}
                    </label>
                )
            })}
        </div>
    )
}