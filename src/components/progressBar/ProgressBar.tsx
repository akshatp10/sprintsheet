import { cn } from "@/lib/cn";
import Text from "../common/Text";

interface ProgressBarProps
    extends React.HTMLAttributes<HTMLDivElement> {
    progress: number;
    color?: string;
    classname?: string;
    label?: {
        cur: number;
        total: number;
    };
}

const ProgressBar = ({
    progress,
    color = "bg-accent",
    classname,
    label,
    ...props
}: ProgressBarProps) => {
    return (
        <div className="flex w-full items-center gap-2" {...props}>
            {/* Progress bar */}
            <div
                className={cn(
                    "h-2 w-full overflow-hidden rounded-full bg-surface-track",
                    classname
                )}
            >
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-300 ease-out",
                        color
                    )}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Label */}
            {label && (
                <Text
                    variant="caption"
                    className="shrink-0 text-ink-3"
                >
                    {label.cur}/{label.total}
                </Text>
            )}
        </div>
    );
};

export default ProgressBar;