import type { TaskWithUsers } from "@/lib/services/tasks/types";
import { useDraggable } from "@dnd-kit/react";
import TaskCard from "../TaskCard";

interface DraggableTaskCardProps {
    task: TaskWithUsers;
    isDone: boolean;
}

const DraggableTaskCard = ({
    task,
    isDone,
}: DraggableTaskCardProps) => {
    const { ref, isDragging } = useDraggable({
        id: task.id,
    });

    return (
        <div ref={ref} id={`task-${task.id}`}>
            {isDragging ? <div
                className={`h-20 rounded-md border-2 border-dashed border-lines-hairline w-full`}
            /> :
                <TaskCard
                    task={task}
                    isDone={isDone}
                />}
        </div>

    );
};

export default DraggableTaskCard;