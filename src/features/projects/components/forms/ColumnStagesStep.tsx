import { type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue, type UseFormWatch, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ProjectFormData } from "../../types/projectFormData";
import Text from "@/components/common/Text";
// import Button from "@/components/button/Button";
import ColumnChip from "./ColumnChip";
import ProjectStage from "./ProjectStage";
import useStageDrag from "@/hooks/useStageDrag";
import DraggableComponent from "@/components/draggable/DraggableComponent";
import DraggableTarget from "@/components/draggable/DraggableTarget";
import ProjectDropComponent from "../ProjectDropComponent";

interface ColumnStagesStepProps {
    register: UseFormRegister<ProjectFormData>;
    control: Control<ProjectFormData>;
    watch: UseFormWatch<ProjectFormData>;
    setValue: UseFormSetValue<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
}

const columns = [
    { label: "Type", required: false },
    { label: "Platform", required: false },
    { label: "Title", required: true },
    { label: "Status", required: true },
    { label: "Assignee", required: false },
    { label: "Due", required: false },
    { label: "Tags", required: false },
];

const stageColors: Record<string, string> = {
    Backlog: "bg-stage-backlog-dot",
    Todo: "bg-stage-todo-dot",
    "In progress": "bg-stage-progress-dot",
    "In QA": "bg-stage-qa-dot",
    Done: "bg-stage-done-dot",
    Blocked: "bg-stage-blocked-dot"
};

const ColumnStagesStep = ({ control, setValue }: ColumnStagesStepProps) => {
    const { fields, move } = useFieldArray({
        control,
        name: "stages",
    });

    const stageTargetRef = useRef<HTMLDivElement>(null);

    const {
        visualStages,
        draggedStage,
        draggedId,
        mouse,
        handleDragStart,
    } = useStageDrag({
        fields,
        move,
        containerRef: stageTargetRef,
    });

    // Keeping the persisted `order` field in sync with array position
    useEffect(() => {
        if (draggedId !== null) {
            return;
        }

        const hasIncorrectOrder = fields.some(
            (stage, index) => stage.order !== index,
        );

        if (!hasIncorrectOrder) {
            return;
        }

        setValue(
            "stages",
            fields.map((stage, index) => ({
                ...stage,
                order: index,
            })),
        );
    }, [fields, draggedId, setValue]);

    return (
        <section className="flex flex-col gap-3">
            {/* Columns */}
            {/* This is blocked for now */}
            <div className="flex flex-col gap-2 opacity-50">
                <Text variant="body" className="text-ink font-medium">
                    Columns
                </Text>

                <Text variant="caption" className="text-ink-3">
                    The standard set, pre-filled. Drag to reorder,
                    click to rename, ⊖ to drop one.
                </Text>

                <div className="flex flex-wrap gap-2 mt-1">
                    {columns.map((column) => (
                        <ColumnChip
                            label={column.label}
                            required={column.required}
                            key={column.label}
                        />
                    ))}

                    <div className="flex items-center gap-1.5 rounded-md border border-dashed border-lines-hairline px-3 py-1.5 cursor-pointer">
                        <Plus className="w-3.5 h-3.5 text-ink-2" />

                        <Text variant="body-sm" className="text-ink-2">
                            Add column
                        </Text>
                    </div>
                </div>
            </div>

            {/* Stages */}
            <div className="flex flex-col">
                <div className="flex flex-col shrink-0">
                    <Text variant="body" className="text-ink font-medium">
                        Stages
                    </Text>

                    <Text variant="caption" className="text-ink-3">
                        Board columns and Status options, in flow order.
                        Each carries its own hue.
                    </Text>
                </div>

                <DraggableTarget
                    ref={stageTargetRef}
                    containerId="stages"
                    className="mt-1"
                    items={visualStages}
                    draggedId={draggedId}
                    draggedItem={draggedStage}
                    mouse={mouse}
                    renderItem={(stage, index) => (
                        <DraggableComponent
                            className="rounded-md border border-lines-hairline"
                            onDragStart={(event) =>
                                handleDragStart(event, stage.id)
                            }
                        >
                            <ProjectStage
                                color={stageColors[stage.name] ?? "bg-ink-3"}
                                label={stage.name}
                                tag={
                                    index === 0
                                        ? "start"
                                        : index === visualStages.length - 1
                                            ? "terminal"
                                            : null
                                }
                            />
                        </DraggableComponent>
                    )}

                    customDropZone={<ProjectDropComponent color={stageColors[draggedStage?.name ?? "Backlog"]} label={draggedStage?.name ?? ""} />}
                />

                {/* Add stage - To be added in upcoming features */}
                {/* <Button handleClick={handleAddStage} variant="tertiary" type="button"
                    className="flex items-center justify-between rounded-md border border-lines-hairline px-3 py-2"
                >
                    <div className="flex items-center gap-2">
                        <Plus className="w-3.5 h-3.5 text-ink-2" />
                        <Text variant="body-sm" className="text-ink-2">Add stage</Text>
                    </div>
                </Button> */}
            </div>
        </section>
    );
};

export default ColumnStagesStep;
