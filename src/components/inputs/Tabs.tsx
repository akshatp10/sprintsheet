import { cn } from "@/lib/cn";

type TabsOption<T extends string> = {
    label: string;
    value: T;
};

type TabsProps<T extends string> = {
    tabs: TabsOption<T>[];
    activeTab: T;
    onChange: (activeTab: T) => void;
    classname?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export function Tabs<T extends string>({
    tabs,
    activeTab,
    onChange,
    className,
    ...props
}: TabsProps<T>) {
    const selectedIndex = tabs.findIndex(
        (tab) => tab.value === activeTab
    );

    return (
        <div
            className={cn(
                "relative inline-flex w-fit rounded-lg px-1 bg-surface-desk border border-lines-control",
                className
            )}
            {...props}
        >
            <div
                className="absolute top-0.5 bottom-0.5 left-0.5 rounded-md border border-lines-control shadow-sm transition-transform duration-200 ease-out"
                style={{
                    width: `calc((100% - 0.25rem) / ${tabs.length})`,
                    transform: `translateX(${selectedIndex * 100}%)`,
                }}
            />

            {tabs.map((tab) => {
                const selected = tab.value === activeTab;

                return (
                    <label
                        key={String(tab.value)}
                        className={`relative z-10 shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors duration-200 ${selected
                                ? "text-ink"
                                : "text-ink-fades-ghost-rows"
                            }`}
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
                );
            })}
        </div>
    );
}
