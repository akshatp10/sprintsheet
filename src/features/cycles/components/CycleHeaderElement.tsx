import Text from '@/components/common/Text';
import { getToday } from '@/hooks/useCycleStatus';
import { cn } from '@/lib/cn';
import type { Cycle } from '@/lib/services/cycles/types';
import { formatCycleDate } from '@/lib/utils';
import { Inbox, RefreshCcw } from 'lucide-react';

const DAY_MS = 1000 * 60 * 60 * 24;

type CycleHeaderElementProps = {
  taskCount: number;
  doneTasks: number;
} & (
  | {
      variant: 'backlog';
      cycle?: undefined;
    }
  | {
      variant: 'active' | 'other';
      cycle: Cycle;
    }
);

const getCycleProgress = (cycle: Cycle) => {
  const start = new Date(cycle.startDate).getTime();
  const end = new Date(cycle.endDate).getTime();
  const today = new Date(getToday()).getTime();

  const cycleLength = (end - start) / DAY_MS;
  const currentDay = Math.min(cycleLength, Math.max(1, Math.floor((today - start) / DAY_MS) + 1));

  return { cycleLength, currentDay };
};

const CycleHeaderElement = ({ variant, cycle, taskCount, doneTasks }: CycleHeaderElementProps) => {
  const isBacklog = variant === 'backlog';
  const isActive = variant === 'active';

  const progress = cycle ? getCycleProgress(cycle) : null;

  const title = cycle
    ? `${formatCycleDate(cycle.startDate)} - ${formatCycleDate(cycle.endDate)}`
    : 'BACKLOG — NO CYCLE';

  const subtitle = !cycle
    ? 'a task with no cycle lives here'
    : isActive && progress
      ? `day ${progress.currentDay} of ${progress.cycleLength}`
      : `${doneTasks} of ${taskCount} done`;

  return (
    <div
      className={cn(
        'flex min-h-10 items-center border border-lines-control px-3',
        isBacklog && 'bg-surface-raised/50',
        isActive && 'border-accent bg-accent-wash-active',
        variant === 'other' && 'bg-surface-sunken',
      )}
    >
      {/* Left section */}
      <div className="flex min-w-0 items-center gap-2">
        <Text className="shrink-0">
          {isBacklog ? (
            <Inbox strokeWidth={1.5} size={10} />
          ) : (
            <RefreshCcw strokeWidth={1.5} size={10} />
          )}
        </Text>

        <Text maxLines={1}>{title}</Text>

        {!isBacklog && (
          <Text className="shrink-0 uppercase">{isActive ? '· ACTIVE' : '· CLOSED'}</Text>
        )}

        <Text className="shrink-0 text-ink-3">{taskCount}</Text>
      </div>

      <div className="ml-auto flex items-center">
        <Text className="text-ink-3" variant="body-sm">
          {subtitle}
        </Text>
      </div>
    </div>
  );
};

export default CycleHeaderElement;
