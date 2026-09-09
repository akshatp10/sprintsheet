import Text from "@/components/common/Text";
import { cn } from "@/lib/cn";

interface ProjectStageProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    color: string;
    tag: string | null;
}

const ProjectStage = ({ color, label, tag, className, ...props }: ProjectStageProps) => {
    return (
        <div
            className={cn(
                "flex items-center justify-between w-full pr-3 py-2",
                className,
            )}
            {...props}
        >
            <div className="flex items-center gap-2 min-w-0">
                <span className={cn("w-2 h-2 rounded-full shrink-0", color)} />
                <Text variant="body-sm" className="text-ink truncate">
                    {label}
                </Text>
            </div>

            {tag && (
                <span className="rounded-md border border-lines-hairline px-2 py-0.5 shrink-0">
                    <Text variant="caption" className="text-ink-3">
                        {tag}
                    </Text>
                </span>
            )}
        </div>
    );
};

export default ProjectStage;
