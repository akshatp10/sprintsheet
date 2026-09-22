import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import FormInputBox from "@/components/inputs/FormInputBox";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import PopupModal from "@/components/popupModals/PopupModal";
import type { CreateTaskInput } from "@/lib/services/tasks/types";
import { useProjectStages } from "@/lib/services/stages/hooks";
import { useCreateTask } from "@/lib/services/tasks/hooks";
import { useProjectTypes } from "@/lib/services/types/hooks";
import { defaultValues, taskFormSchema, type TaskFormData } from "@/features/tasks/types/taskFormData";
import { AssigneeSelect } from "@/features/tasks/components/inputs/AssigneeSelect";
// import { TagInput } from "../inputs/TagInput";

interface TaskCreateFormProps {
    projectId: string;
    onClose: () => void;
    defaultStageId?: string;
}

const TaskCreateForm = ({
    projectId,
    onClose,
    defaultStageId,
}: TaskCreateFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isDirty },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskFormSchema),
        mode: "onChange",
        defaultValues: {
            ...defaultValues,
            stage: defaultStageId ?? defaultValues.stage,
        },
    });

    const assigneeIds = watch("assigneeIds") ?? [];
    // const tags = watch("tags") ?? [];
    const { data: stages = [] } = useProjectStages(projectId);
    const { data: projectTypes = [] } = useProjectTypes(projectId);
    const { mutate: createNewTask } = useCreateTask();

    const handleFormSubmit = (data: TaskFormData) => {
        const newTask: CreateTaskInput = {
            projectId,
            stageId: data.stage,
            name: data.name,
            description: data.description,
            assigneeIds: data.assigneeIds,
            dueDate: data.dueDate,
            typeId: data.type,
            tags: data.tags,
        };
        createNewTask(newTask);
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
                className="flex min-h-0 flex-1 flex-col px-4 pb-4"
            >
                {/* Main content */}
                <div className="flex flex-col gap-4">
                    {/* Title */}
                    <FormInputBox
                        label=""
                        error={errors.name?.message}
                    >
                        <Input
                            register={register("name")}
                            placeholder="Task Title"
                            className="h-auto border-none bg-transparent px-0 py-0 text-type-display font-medium text-ink placeholder:text-ink-fades-placeholders focus:outline-none"
                            autoFocus
                        />
                    </FormInputBox>

                    {/* Description */}
                    <FormInputBox
                        label=""
                        error={errors.description?.message}
                        className="rounded-md border border-lines-hairline p-2"
                    >
                        <TextArea
                            register={register("description")}
                            placeholder="Add a description…"
                            rows={3}
                            className="resize-none rounded-md border-none bg-transparent p-0 text-type-body-sm text-ink placeholder:text-ink-fades-placeholders focus:outline-none"
                        />
                    </FormInputBox>

                    {/* <div className="border-b border-lines-hairline" /> */}
                </div>

                {/* Bottom toolbar */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    {/* Task properties */}
                    <div className="flex min-w-0 items-center gap-2">
                        {/* Stage */}
                        <select
                            {...register("stage")}
                            className="h-8 rounded-md border border-lines-hairline bg-surface px-2.5 text-type-caption text-ink-2 outline-none transition-colors hover:border-lines focus:border-lines-strong"
                        >
                            <option value="">Stage</option>

                            {stages.map((stage) => (
                                <option
                                    key={stage.stageId}
                                    value={stage.stageId}
                                >
                                    {stage.name}
                                </option>
                            ))}
                        </select>

                        {/* Assignee */}
                        <AssigneeSelect
                            projectId={projectId}
                            value={assigneeIds}
                            onChange={(ids) =>
                                setValue("assigneeIds", ids, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        />

                        {/* Due date */}
                        <Input
                            register={register("dueDate")}
                            type="date"
                            className="h-8 rounded-md px-2.5 text-type-caption"
                        />

                        {/* Type */}
                        <select
                            {...register("type")}
                            className="h-8 rounded-md border border-lines-hairline bg-surface px-2.5 text-type-caption text-ink-2 outline-none transition-colors hover:border-lines focus:border-lines-strong"
                        >
                            <option value="">Type</option>

                            {projectTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>

                        {/*
                        <TagInput
                            value={tags}
                            onChange={(next) =>
                                setValue("tags", next, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        />
                        */}
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="primary"
                        className="shrink-0"
                    >
                        <Text
                            variant="body-sm"
                            className="font-medium"
                        >
                            Create Task
                        </Text>
                    </Button>
                </div>
            </form>
        </PopupModal>
    );
};

export default TaskCreateForm;