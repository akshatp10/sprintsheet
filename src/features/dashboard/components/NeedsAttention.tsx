import Text from '@/components/common/Text';
import type { TaskNeedingAttention } from '../types/types';
import AttentionTask from './AttentionTask';
import Mascot from '@/components/common/Mascot';

interface NeedsAttentionProps {
  needsAttentionTasks: TaskNeedingAttention[];
}

const NeedsAttention = ({ needsAttentionTasks }: NeedsAttentionProps) => {
  return (
    <div className="flex-2 min-h-0 flex flex-col bg-surface border border-lines-hairline rounded-md p-4">
      <Text className="text-ink-2 font-bold flex items-baseline gap-2" variant="h2">
        Needs Attention
        <Text as="span" className="text-ink-3" variant="body-sm">
          blocked, overdue or unassigned in this cycle
        </Text>
      </Text>

      <div className="mt-3 flex-1 min-h-0 overflow-y-auto flex flex-col">
        {needsAttentionTasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 px-4">
            <Mascot expression="happy" renderAnimation size={75} />

            <div className="flex flex-col gap-1">
              <Text variant="h2">Everything looks good!</Text>

              <Text className="text-ink-3">
                No tasks are blocked, overdue, or unassigned in this cycle.
              </Text>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {needsAttentionTasks.map((attentionTask) => (
              <AttentionTask completeTask={attentionTask} key={attentionTask.task.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NeedsAttention;
