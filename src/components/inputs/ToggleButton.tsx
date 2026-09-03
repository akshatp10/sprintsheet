import { cn } from "@/lib/cn";

interface ToggleButtonProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    classname?: string
}

const ToggleButton = ({ checked, onChange, classname }: ToggleButtonProps) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer",
            checked ? "bg-accent" : "bg-lines-control",
            classname
        )}
    >
        <span
            className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
                checked ? "translate-x-4" : "translate-x-0.5"
            )}
        />
    </button>
);

export default ToggleButton;