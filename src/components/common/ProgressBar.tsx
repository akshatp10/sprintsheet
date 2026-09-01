import { cn } from "@/lib/cn";

interface ProgressBarProps {
    progress: number; //Percentage out of 100
    color?: string;
}

const ProgressBar = ({
    progress,
    color = "bg-ink",
}: ProgressBarProps) => {

    return (
        //Denoting total component/bg of the progressbar
        <div
            className="bg-surface-track w-full h-2 rounded-full overflow-hidden">
            {/* Progress of progressbar */}
            <div
                className={cn("h-full rounded-full transition-all duration-300 ease-out", color)}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;