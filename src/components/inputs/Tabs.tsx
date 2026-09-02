import { cn } from "@/lib/cn"

type TabsOption = {
    label: string
    value: string
}

type TabsProps = {
    tabs: TabsOption[]
    activeTab: string
    onChange: (activeTab: string) => void
    classname?: string
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">

export function Tabs({ tabs, activeTab, onChange, className, ...props }: TabsProps) {
    const selectedIndex = tabs.findIndex(
        (tab) => tab.value === activeTab
    )

    return (
        <div
            className={cn("relative inline-flex w-fit rounded-lg px-1 bg-surface-desk border border-lines-control", className)} {...props}>
            <div
                className="absolute inset-y-1 left-1 rounded-md shadow-sm transition-transform duration-200 ease-out border border-lines-control"
                style={{
                    width: `calc((100% - 0.5rem) / ${tabs.length})`,
                    transform: `translateX(${Math.max(selectedIndex, 0) * 100}%)`,
                }}
            />

            {tabs.map((tab) => {
                const selected = tab.value === activeTab

                return (
                    <label
                        key={String(tab.value)}
                        className={`relative z-10 shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors duration-200 ${selected ? "text-ink" : "text-ink-fades-ghost-rows"}`}
                    >
                        <input
                            type="radio"
                            value={String(tab.value)}
                            checked={selected}
                            onChange={() => onChange(tab.value)}
                            className="sr-only"
                        />

                        {tab.label}
                    </label>
                )
            })}
        </div>
    )
}