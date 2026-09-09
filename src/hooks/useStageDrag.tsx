import { useEffect, useMemo, useState } from "react";
import type { RefObject } from "react";
import type { FieldArrayWithId, UseFieldArrayMove } from "react-hook-form";
import type { ProjectFormData } from "@/features/projects/types/projectFormData";

type StageField = FieldArrayWithId<ProjectFormData, "stages", "id">;

interface UseStageDragOptions {
    fields: StageField[];
    move: UseFieldArrayMove;
    containerRef: RefObject<HTMLElement | null>;
}

interface UseStageDragReturn {
    visualStages: StageField[];
    draggedStage: StageField | null;
    draggedId: string | null;
    draggedIndex: number;
    mouse: {
        x: number;
        y: number;
    };
    dropZone: number;
    handleDragStart: (
        event: React.MouseEvent<HTMLDivElement>,
        id: string,
    ) => void;
}

const useStageDrag = ({
    fields,
    move,
    containerRef,
}: UseStageDragOptions): UseStageDragReturn => {
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [dropZone, setDropZone] = useState(0);

    const draggedIndex = useMemo(
        () =>
            draggedId === null
                ? -1
                : fields.findIndex((stage) => stage.id === draggedId),
        [fields, draggedId],
    );

    const draggedStage = useMemo(
        () =>
            draggedId === null
                ? null
                : fields.find((stage) => stage.id === draggedId) ?? null,
        [fields, draggedId],
    );

    const visualStages = useMemo(() => {
        if (draggedId === null || draggedIndex === -1) {
            return fields;
        }

        const currentIndex = fields.findIndex(
            (stage) => stage.id === draggedId,
        );

        if (currentIndex === -1 || currentIndex === dropZone) {
            return fields;
        }

        const nextStages = [...fields];
        const [stage] = nextStages.splice(currentIndex, 1);

        if (!stage) {
            return fields;
        }

        nextStages.splice(dropZone, 0, stage);

        return nextStages;
    }, [fields, draggedId, draggedIndex, dropZone]);

    const handleDragStart = (
        event: React.MouseEvent<HTMLDivElement>,
        id: string,
    ) => {
        event.preventDefault();

        setMouse({
            x: event.clientX,
            y: event.clientY,
        });

        setDraggedId(id);

        const index = fields.findIndex((stage) => stage.id === id);

        setDropZone(index);
    };

    useEffect(() => {
        if (draggedId === null) {
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            setMouse({
                x: event.clientX,
                y: event.clientY,
            });

            const scope = containerRef.current ?? document;
            const elements = Array.from(
                scope.querySelectorAll<HTMLElement>('[data-drop-zone="true"]'),
            );

            const positions = elements.map(
                (element) => element.getBoundingClientRect().top,
            );

            if (!positions.length) {
                return;
            }

            const differences = positions.map((position) =>
                Math.abs(position - event.clientY),
            );

            let result = differences.indexOf(Math.min(...differences));

            if (result > draggedIndex) {
                result -= 1;
            }

            setDropZone(result);
        };

        const handleMouseUp = () => {
            if (draggedIndex !== -1 && draggedIndex !== dropZone) {
                move(draggedIndex, dropZone);
            }

            setDraggedId(null);
            setDropZone(0);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [draggedId, draggedIndex, dropZone, move, containerRef]);

    return {
        visualStages,
        draggedStage,
        draggedId,
        draggedIndex,
        mouse,
        dropZone,
        handleDragStart,
    };
};

export default useStageDrag;