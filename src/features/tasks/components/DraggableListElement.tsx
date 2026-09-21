import TaskListElement from "./TaskListElement";

import type { CycleTaskWithUsers } from "@/lib/services/tasks/types";
import { useDraggable } from "@dnd-kit/react";
import { GripVertical } from "lucide-react";

interface DraggableTaskListElementProps {
    task: CycleTaskWithUsers;
    taskNumber: number;
    isDone: boolean;
    isOverlay?: boolean;
}

const DraggableTaskListElement = ({
    task,
    taskNumber,
    isDone,
    isOverlay = false,
}: DraggableTaskListElementProps) => {
    const { ref, isDragging } = useDraggable({
        id: task.id,
    });

    return (
        <div
            className={`
				relative
				group
				${isDragging ? "opacity-50" : ""}
			`}
        >
            <div
                ref={ref}
                className="absolute left-0 top-0 z-10 flex h-full w-10 items-center justify-center cursor-grab opacity-0 hover:opacity-100"
            >
                <GripVertical
                    strokeWidth={1.5}
                    size={15}
                    className="text-ink-3"
                />
            </div>

            <TaskListElement
                task={task}
                taskNumber={taskNumber}
                isDone={isDone}
                isOverlay={isOverlay}
            />
        </div>
    );
};

export default DraggableTaskListElement;