type RadioOption = {
    label: string
    value: string
}

type RadioButtonProps = {
    options: RadioOption[]
    value: string
    onChange: (value: string) => void
    name?: string
}

export function RadioButton({ options, value, onChange, name = "radio" }: RadioButtonProps) {
    const selectedIndex = options.findIndex(
        (option) => option.value === value
    )

    return (
        <div
            className="relative inline-flex w-fit rounded-lg p-1 bg-surface-desk border border-lines-control">
            <div
                className="absolute inset-y-1 left-1 rounded-md shadow-sm transition-transform duration-200 ease-out border border-lines-control"
                style={{
                    width: `calc((100% - 0.5rem) / ${options.length})`,
                    transform: `translateX(${Math.max(selectedIndex, 0) * 100}%)`,
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