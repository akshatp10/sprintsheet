import { type Control, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import type { ProjectFormData } from "../../types/projectFormData";
import Text from "@/components/common/Text";
// import Button from "@/components/button/Button";
import ColumnChip from "./ColumnChip";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import SortableStage from "./SortableStage";

interface ColumnStagesStepProps {
    control: Control<ProjectFormData>;
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

const ColumnStagesStep = ({ control }: ColumnStagesStepProps) => {
    const { fields, move } = useFieldArray({
        control,
        name: "stages",
    });

    return (
        <section className="flex flex-col gap-3">
            {/* Columns */}
            {/* This is blocked for now */}
            <div className="flex flex-col gap-2 opacity-50">
                <Text variant="body" className="text-ink font-medium">
                    Columns
                </Text>

                <Text variant="caption" className="text-ink-3">
                    The standard set, pre-filled. Drag to reorder, click to rename, ⊖ to drop one.
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

                <DragDropProvider
                    onDragEnd={(event) => {
                        if (event.canceled) {
                            return;
                        }
                        const { source } = event.operation;
                        if (!isSortable(source)) {
                            return;
                        }
                        const { initialIndex, index } = source;
                        if (initialIndex === index) {
                            return;
                        }
                        move(initialIndex, index);
                    }}
                >
                    <div className="mt-1 flex flex-col gap-2">
                        {fields.map((stage, index) => (
                            <SortableStage
                                key={stage.id}
                                stage={stage}
                                index={index}
                                total={fields.length}
                            />
                        ))}
                    </div>
                </DragDropProvider>

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
