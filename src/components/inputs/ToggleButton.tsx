import { cn } from "@/lib/cn";

interface ToggleButtonProps {
    /** Controls the toggle's current state, including its accent/neutral background and the position of the toggle thumb. */
    checked: boolean;

    /** Handles user interaction and receives the new toggle state after the current value is inverted. */
    onChange: (value: boolean) => void;

    /** Additional CSS classes applied to the toggle button, allowing its dimensions, positioning, colors, or other visual styles to be customized. */
    className?: string;

    /** Disables the toggle, preventing user interaction and displaying the disabled cursor state. Defaults to `false`. */
    disabled?: boolean;
}

const ToggleButton = ({ checked, onChange, className, disabled = false }: ToggleButtonProps) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer",
            checked ? "bg-accent" : "bg-lines-control",
            disabled && "cursor-not-allowed",
            className
        )}
        disabled={disabled}
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