import { type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue, type UseFormWatch, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import type { ProjectFormData } from "../../types/projectFormData";
import Text from "@/components/common/Text";
import Button from "@/components/button/Button";
import ColumnChip from "./ColumnChip";
import ProjectStage from "./ProjectStage";

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
};

const ColumnStagesStep = ({ control }: ColumnStagesStepProps) => {
    const { fields } = useFieldArray({ control, name: "stages" });

    const handleAddStage = () => { };

    return (
        <section className="flex flex-col gap-6">

            {/* Columns */}
            {/* This is blocked for now */}
            <div className="flex flex-col gap-2 opacity-50">
                <Text variant="body" className="text-ink font-medium">Columns</Text>
                <Text variant="caption" className="text-ink-3">
                    The standard set, pre-filled. Drag to reorder, click to rename, ⊖ to drop one.
                </Text>

                <div className="flex flex-wrap gap-2 mt-1">
                    {columns.map((column) => (
                        <ColumnChip label={column.label} required={column.required} key={column.label} />
                    ))}

                    <div className="flex items-center gap-1.5 rounded-md border border-dashed border-lines-hairline px-3 py-1.5 cursor-pointer">
                        <Plus className="w-3.5 h-3.5 text-ink-2" />
                        <Text variant="body-sm" className="text-ink-2">Add column</Text>
                    </div>
                </div>
            </div>

            {/* Stages*/}
            <div className="flex flex-col gap-2">
                <Text variant="body" className="text-ink font-medium">Stages</Text>
                <Text variant="caption" className="text-ink-3">
                    Board columns and Status options, in flow order. Each carries its own hue.
                </Text>

                <div className="flex flex-col gap-2 mt-1">
                    {fields.map((field, index) => (
                        <ProjectStage
                            color={stageColors[field.name] ?? "bg-ink-3"}
                            label={field.name}
                            tag={
                                index === 0 ? "start" : index === fields.length - 1 ? "terminal" : null
                            }
                        />
                    ))}
                </div>

                {/* Add stage */}
                <Button handleClick={handleAddStage} variant="tertiary" type="button"
                    className="flex items-center justify-between rounded-md border border-lines-hairline px-3 py-2"
                >
                    <div className="flex items-center gap-2">
                        <Plus className="w-3.5 h-3.5 text-ink-2" />
                        <Text variant="body-sm" className="text-ink-2">Add stage</Text>
                    </div>
                </Button>
            </div>

        </section>
    );
};

export default ColumnStagesStep;