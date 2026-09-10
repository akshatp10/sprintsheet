// features/tasks/components/forms/TaskCreateForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import Input from "@/components/inputs/Input";
import {
    taskFormSchema,
    defaultValues,
    typeOptions,
    type TaskFormData,
} from "../../types/taskFormData";
import type { CreateTaskInput } from "@/lib/services/tasks/types";
import { AssigneeSelect } from "../inputs/AssigneeSelect";
import { TagInput } from "../inputs/TagInput";
import FormInputBox from "@/components/inputs/FormInputBox";
import TextArea from "@/components/inputs/TextArea";
import PopupModal from "@/components/popupModals/PopupModal";
import { useProjectStages } from "@/lib/services/stages/hooks";
import { useCreateTask } from "@/lib/services/tasks/hooks";

interface TaskCreateFormProps {
    projectId: string;
    onClose: () => void;
}

const TaskCreateForm = ({ projectId, onClose }: TaskCreateFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isDirty },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskFormSchema),
        defaultValues,
    });

    const assigneeIds = watch("assigneeIds") ?? [];
    const tags = watch("tags") ?? [];

    const { data: stages = [] } = useProjectStages(projectId);
    const { mutate } = useCreateTask()

    const handleFormSubmit = (data: TaskFormData) => {
        const newTask: CreateTaskInput = {
            projectId,
            stageId: data.stageId,
            name: data.name,
            description: data.description,
            assigneeIds: data.assigneeIds,
            dueDate: data.dueDate,
            type: data.type,
            tags: data.tags,
        };
        mutate(newTask)
        reset();
        onClose();
    };

    return (
        <PopupModal
            label="Create Task"
            onClose={onClose}
            alert={isDirty}
        >
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex min-h-0 flex-1 flex-col px-4 pb-4 gap-3"
            >
                {/* Title */}
                <FormInputBox label="" error={errors.name?.message}>
                    <Input
                        register={register("name")}
                        placeholder="Task Title"
                        className="h-auto border-none bg-transparent px-0 py-0 text-type-display font-medium focus:outline-none"
                    />
                </FormInputBox>

                {/* Pill row: stage, assignee, due date, type, tags */}
                <div className="flex flex-wrap items-start gap-2">
                    <select
                        {...register("stageId")}
                        className="rounded-md border border-lines-hairline bg-surface px-2.5 py-1 text-type-caption text-ink-2"
                    >
                        <option value="">Stage</option>

                        {stages.map((stage) => (
                            <option key={stage.stageId} value={stage.stageId}>
                                {stage.name}
                            </option>
                        ))}
                    </select>

                    <AssigneeSelect
                        projectId={projectId}
                        value={assigneeIds}
                        onChange={(ids) =>
                            setValue("assigneeIds", ids, {
                                shouldDirty: true,
                            })
                        }
                    />

                    <Input
                        register={register("dueDate")}
                        type="date"
                        className="rounded-md px-2.5 py-1 text-type-caption"
                    />

                    <select
                        {...register("type")}
                        className="rounded-md border border-lines-hairline bg-surface px-2.5 py-1 text-type-caption text-ink-2"
                    >
                        {typeOptions.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>

                    <TagInput
                        value={tags}
                        onChange={(next) =>
                            setValue("tags", next, {
                                shouldDirty: true,
                            })
                        }
                    />

                </div>

                <div className="border-b border-lines-hairline" />

                {/* Description */}
                <FormInputBox label="" error={errors.description?.message}>
                    <TextArea
                        register={register("description")}
                        placeholder="Add a description…"
                        rows={4}
                        className="resize-none rounded-md border-none bg-transparent p-0 text-type-body-sm text-ink placeholder:text-ink-fades-placeholders focus:outline-none"
                    />
                </FormInputBox>

                <div className="mt-auto flex justify-end">
                    <Button type="submit" variant="tertiary">
                        <Text variant="body-sm" className="font-medium">
                            Create Task
                        </Text>
                    </Button>
                </div>
            </form>
        </PopupModal>
    );
};

export default TaskCreateForm;
