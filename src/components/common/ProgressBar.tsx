import { cn } from "@/lib/cn";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    progress: number; //Percentage out of 100
    color?: string;
    classname?: string;
}

const ProgressBar = ({
    progress,
    color = "bg-ink",
    classname,
    ...props
}: ProgressBarProps) => {

    return (
        //Denoting total component/bg of the progressbar
        <div
            className={cn("bg-surface-track w-full h-2 rounded-full overflow-hidden", classname)} {...props}>
            {/* Progress of progressbar */}
            <div
                className={cn("h-full rounded-full transition-all duration-300 ease-out", color)}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;