import Drawer from '@/components/drawer/Drawer';
import Avatar from '@/components/avatar/Avatar';
import AvatarGroup from '@/components/avatar/AvatarGroups';
import Chip from '@/components/chips/Chip';
import Text from '@/components/common/Text';
import { useTypeById } from '@/lib/services/types/hooks';
import { formatDate } from '@/lib/utils';
import { ArrowUpRight, Link2, MoreHorizontal, Send } from 'lucide-react';
import { stageConfig, StageName } from '@/lib/stageConfig';
import Button from '@/components/button/Button';
import Input from '@/components/inputs/Input';
import { cn } from '@/lib/cn';
import useTaskDetailStore from '@/store/taskDetailStore';

interface TaskDetailsDrawerProps {
  className?: string;
}

const TaskDetailsDrawer = ({ className }: TaskDetailsDrawerProps) => {
  const currentTask = useTaskDetailStore((state) => state.currentTask);
  const closeTask = useTaskDetailStore((state) => state.closeTask);

  const { data: curType } = useTypeById(currentTask?.typeId ?? '');

  if (!currentTask) {
    return null;
  }

  const visibleUsers = currentTask.assignees.slice(0, 3);
  const extraUsers = currentTask.assignees.length - 3;

  const stageName = currentTask.stage?.name as StageName;
  const stageStyles = stageConfig[stageName];
  const stageDot = stageStyles?.dot ?? '';

  return (
    <Drawer
      onClose={closeTask}
      label={
        <div className="flex items-center gap-2">
          <Text variant="mono" className="text-ink-3">
            {currentTask.key}
          </Text>

          <Text variant="caption" className="rounded-md bg-white px-2 py-0.5 text-ink-3">
            {currentTask.dueDate ? formatDate(currentTask.dueDate) : 'No due date'}
          </Text>
        </div>
      }
      width="30dvw"
      className={cn('z-50 h-full bg-surface-sunken', className)}
    >
      <div className="flex h-full min-h-0 flex-col">
        {/* Header */}
        <div className="shrink-0 border-b border-lines-hairline px-4 pb-4">
          <div className="flex items-start justify-between pt-4">
            <Text variant="h1">{currentTask.name}</Text>

            <div className="flex items-center gap-1">
              <Button
                variant="tertiary"
                className="rounded-md p-1.5 text-ink-3 transition-colors hover:bg-surface-raised hover:text-ink border-none"
              >
                <ArrowUpRight size={14} />
              </Button>

              <Button
                variant="tertiary"
                className="rounded-md p-1.5 text-ink-3 transition-colors hover:bg-surface-raised hover:text-ink border-none"
              >
                <Link2 size={14} />
              </Button>

              <Button
                variant="tertiary"
                className="rounded-md p-1.5 text-ink-3 transition-colors hover:bg-surface-raised hover:text-ink border-none"
              >
                <MoreHorizontal size={15} />
              </Button>
            </div>
          </div>

          {/* currentTask metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {/* Stage */}
            <Chip
              text={
                <>
                  <span className={cn('h-2 w-2 shrink-0 rounded-full', stageDot)} />
                  {currentTask?.stage?.name}
                </>
              }
              variant="secondary"
              className="flex items-center gap-2 bg-surface rounded-md border-lines-hairline"
            ></Chip>

            {/* Assignees */}
            <div className="flex items-center justify-start gap-2">
              {currentTask.assigneeIds.length > 0 ? (
                <AvatarGroup>
                  {visibleUsers.map((assignee) => (
                    <Avatar key={assignee.id} userName={assignee.name} />
                  ))}

                  {extraUsers > 0 && <Avatar extraUsers={extraUsers} />}
                </AvatarGroup>
              ) : (
                <div className="flex items-center gap-1 rounded-md">
                  <Avatar />
                  <Text variant="caption" className="text-ink-2">
                    Unassigned
                  </Text>
                </div>
              )}

              <Chip
                className="bg-surface text-stage-blocked-text"
                text={currentTask?.dueDate ? formatDate(currentTask.dueDate) : 'No Due Date'}
              ></Chip>
            </div>

            {/* Type */}
            {curType && (
              <Chip
                variant="secondary"
                text={curType.name}
                textType="text-type-caption"
                className="py-1"
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Description */}
          <div className="shrink-0 px-4 py-4">
            <Text variant="body-sm" className="leading-relaxed text-ink-2">
              {currentTask?.description}
            </Text>
          </div>

          {/* //This will be the activity */}
          <div className="flex flex-1"></div>

          {/* Comment footer */}
          <div className="shrink-0 border-t border-lines-hairline bg-surface-page p-3 opacity-40 cursor-not-allowed">
            <div className="flex items-center gap-2 cursor-not-allowed">
              <Avatar userName="User" />

              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-lines-control bg-surface px-2">
                <Input
                  type="text"
                  placeholder="Comment, or @mention someone..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-xs text-ink outline-none placeholder:text-ink-3 cursor-not-allowed border-none"
                  onChange={() => {}}
                  value=""
                  disabled
                />

                <Button
                  variant="tertiary"
                  className="shrink-0 rounded-md p-1 text-ink-3 hover:text-ink border-none  cursor-not-allowed"
                  disabled
                >
                  <Send size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default TaskDetailsDrawer;
