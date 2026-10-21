import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import FormInputBox from '@/components/inputs/FormInputBox';
import Input from '@/components/inputs/Input';
import TextArea from '@/components/inputs/TextArea';
import PopupModal from '@/components/popupModals/PopupModal';
import type { CreateTaskRequest } from '@/lib/services/tasks/types';
import { useGetStagesPerProject } from '@/lib/services/stages/hooks';
import { useCreateTask } from '@/lib/services/tasks/hooks';
import { useProjectTypes } from '@/lib/services/types/hooks';
import {
  defaultValues,
  taskFormSchema,
  type TaskFormData,
} from '@/features/tasks/types/taskFormData';
import { AssigneeSelect } from '@/features/tasks/components/inputs/AssigneeSelect';

interface TaskCreateFormProps {
  projectId: string;
  onClose: () => void;
  cycleId?: string;
  defaultStageId?: string;
}

const TaskCreateForm = ({ projectId, onClose, defaultStageId, cycleId }: TaskCreateFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    mode: 'onChange',
    defaultValues: {
      ...defaultValues,
      stage: defaultStageId ?? defaultValues.stage,
    },
  });

  const assigneeIds = watch('assigneeIds') ?? [];
  // const tags = watch("tags") ?? [];
  const { data: stages = [] } = useGetStagesPerProject(projectId);
  const { data: projectTypes = [] } = useProjectTypes(projectId);
  const { mutate: createNewTask } = useCreateTask();

  const handleFormSubmit = (data: TaskFormData, shouldContinue: boolean) => {
    const newTask: CreateTaskRequest = {
      projectId,
      name: data.name,
      description: data.description,
      assigneeIds: data.assigneeIds,
      dueDate: data.dueDate,
      typeId: data.type,
      tags: data.tags,
      ...(cycleId
        ? {
            cycle: {
              id: cycleId,
              stageId: data.stage,
            },
          }
        : {}),
    };

    createNewTask(newTask, {
      onSuccess: () => {
        if (shouldContinue) {
          reset({
            ...defaultValues,
            stage: defaultStageId ?? defaultValues.stage,
          });
        } else {
          reset();
          onClose();
        }
      },
    });
  };

  return (
    <PopupModal label="Create Task" onClose={onClose} alert={isDirty}>
      <form
        onSubmit={handleSubmit((data) => handleFormSubmit(data, false))}
        className="flex min-h-0 flex-1 flex-col px-4 pb-6 gap-1"
      >
        {/* Main content */}
        <div className="flex flex-col gap-5">
          {/* Title */}
          <FormInputBox label="" error={errors.name?.message}>
            <Input
              register={register('name')}
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
              register={register('description')}
              placeholder="Add a description…"
              rows={3}
              className="resize-none rounded-md border-none bg-transparent p-0 text-type-body-sm text-ink placeholder:text-ink-fades-placeholders focus:outline-none"
            />
          </FormInputBox>

          {/* <div className="border-b border-lines-hairline" /> */}
        </div>

        {/* Bottom toolbar */}
        <div className="mt-auto flex flex-col justify-between gap-5 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            {/* Stage */}
            <FormInputBox error={errors.stage?.message}>
              <select
                {...register('stage')}
                className="h-8 rounded-md border border-lines-hairline bg-surface px-2.5 text-type-caption text-ink-2 outline-none transition-colors hover:border-lines focus:border-lines-strong"
              >
                <option value="">Stage</option>

                {stages.map((stage) => (
                  <option key={stage.stageId} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </FormInputBox>

            {/* Assignee */}
            <AssigneeSelect
              projectId={projectId}
              value={assigneeIds}
              onChange={(ids) =>
                setValue('assigneeIds', ids, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />

            {/* Due date */}
            <Input
              register={register('dueDate')}
              type="date"
              className="h-8 rounded-md px-2.5 text-type-caption"
            />

            {/* Type */}
            <FormInputBox error={errors.type?.message}>
              <select
                {...register('type')}
                className="h-8 rounded-md border border-lines-hairline bg-surface px-2.5 text-type-caption text-ink-2 outline-none transition-colors hover:border-lines focus:border-lines-strong"
              >
                <option value="">Type</option>

                {projectTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </FormInputBox>
          </div>
          {/* <TagInput
                        value={tags}
                        onChange={(next) =>
                            setValue("tags", next, {
                                shouldDirty: true,
                            })
                        }
                    /> */}
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => {
                handleSubmit((data) => handleFormSubmit(data, true))();
              }}
              disabled={isSubmitting}
            >
              <Text variant="body-sm" className="font-medium">
                Save and Continue
              </Text>
            </Button>

            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              <Text variant="body-sm" className="font-medium">
                Create Task
              </Text>
            </Button>
          </div>
        </div>
      </form>
    </PopupModal>
  );
};

export default TaskCreateForm;
