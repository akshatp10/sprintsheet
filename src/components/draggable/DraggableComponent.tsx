import { GripVertical } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DraggableComponentProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onMouseDown"> {
    children: ReactNode;
    canDragFully?: boolean;
    onDragStart: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const DraggableComponent = ({
    children,
    canDragFully = false,
    onDragStart,
    className,
    ...props
}: DraggableComponentProps) => {
    return (
        <div
            className={cn(
                "flex items-center gap-2",
                canDragFully && "cursor-grab",
                className,
            )}
            onMouseDown={canDragFully ? onDragStart : undefined}
            {...props}
        >
            {!canDragFully && (
                <div
                    onMouseDown={onDragStart}
                    className="shrink-0 cursor-grab pl-3"
                >
                    <GripVertical className="w-4 h-4 text-ink-3" />
                </div>
            )}

            <div className="min-w-0 flex-1">{children}</div>
        </div>
    );
};

export default DraggableComponent;
