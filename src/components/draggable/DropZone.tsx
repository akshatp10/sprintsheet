import { cn } from "@/lib/cn";

interface DropZoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
    className?: string
}

const DropZone = ({ className = "", ...props }: DropZoneProps) => {
    return <div data-drop-zone="true" className={cn("h-0", className)} {...props} />;
};

export default DropZone;
