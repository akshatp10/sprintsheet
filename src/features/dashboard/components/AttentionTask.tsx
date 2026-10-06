import Text from '@/components/common/Text';
import type { TaskNeedingAttention } from '../types/types';
import { stageConfig, StageName } from '@/lib/stageConfig';
import Chip from '@/components/chips/Chip';
import { cn } from '@/lib/cn';

interface AttentionTaskProps {
  completeTask: TaskNeedingAttention;
}

const AttentionTask = ({ completeTask }: AttentionTaskProps) => {
  const { task, reason } = completeTask;

  const { chip } = stageConfig[task?.stage?.name as StageName];

  return (
    <div className="flex items-center gap-4 min-h-9 border-b border-lines-hairline last:border-b-0">
      {/* Task key */}
      <Text className="w-20 shrink-0 text-ink-3" variant="mono">
        {task?.key}
      </Text>

      {/* Task name */}
      <Text className="flex-1 min-w-0 text-ink font-medium" variant="body-sm" maxLines={1}>
        {task?.name}
      </Text>

      {/* Stage */}
      <div className="w-24 shrink-0 flex justify-end">
        <Chip
          text={task?.stage?.name}
          className={cn(chip, task?.stage?.name === 'Blocked' && 'bg-stage-blocked-chip')}
        />
      </div>

      {/* Attention reason */}
      <div className="w-20 shrink-0 text-center">
        <Text
          variant="caption"
          className={reason?.type === 'overdue' ? 'text-red-500 font-medium' : 'text-ink-3'}
        >
          {reason?.type === 'blocked' ? `-` : reason?.label}
        </Text>
      </div>
    </div>
  );
};

export default AttentionTask;
