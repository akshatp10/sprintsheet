import type { ReactNode, Ref } from "react";
import { cn } from "@/lib/cn";
import DropZone from "./DropZone";

interface DraggableTargetItem {
    id: string;
}

interface DraggableTargetProps<T extends DraggableTargetItem> {
    containerId: string;
    items: T[];
    draggedId: string | null;
    draggedItem: T | null;
    mouse: { x: number; y: number };
    renderItem: (item: T, index: number) => ReactNode;
    renderGhost?: (item: T) => ReactNode;
    className?: string;
    ref?: Ref<HTMLDivElement>;
    customDropZone?: ReactNode | ""
}

function DraggableTarget<T extends DraggableTargetItem>({
    containerId,
    items,
    draggedId,
    draggedItem,
    mouse,
    renderItem,
    renderGhost,
    className,
    customDropZone,
    ref,
}: DraggableTargetProps<T>) {
    return (
        <div
            ref={ref}
            data-target-id={containerId}
            className={cn("relative flex flex-col gap-2", className)}
        >
            {items.map((item, index) => {
                const isDragged = item.id === draggedId;

                return (
                    <div key={item.id} data-item-id={item.id}>
                        <DropZone />

                        {isDragged ? (customDropZone ? customDropZone :
                            < div className="flex items-center justify-between rounded-md border border-lines-hairline w-full px-3 py-2 min-h-9.5" />
                        ) : (
                            renderItem(item, index)
                        )}
                    </div>
                );
            })}

            <DropZone />

            {renderGhost && draggedItem && (
                <div
                    className="fixed z-50 w-fit pointer-events-none"
                    style={{ left: mouse.x, top: mouse.y }}
                >
                    {renderGhost(draggedItem)}
                </div>
            )}
        </div>
    );
}

export default DraggableTarget;
