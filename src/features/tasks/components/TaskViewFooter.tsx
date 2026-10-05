import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import CycleFooterTab from '@/features/cycles/components/CycleFooterTab';
import { Inbox, Menu, Plus } from 'lucide-react';
import type { Cycle } from '@/lib/services/cycles/types';

interface TaskViewFooterProps {
  isCardHeld?: boolean;
  taskLength?: number;
  onClick: () => void;
  setCurrentCycleId: (cycleId: string) => void;
  currentCycleId: string;
  cycles: Cycle[];
  openBacklog: boolean;
  setCreateCycle: (value: boolean) => void;
}

const TaskViewFooter = ({
  onClick,
  isCardHeld = false,
  taskLength = 0,
  currentCycleId,
  setCurrentCycleId,
  cycles,
  openBacklog,
  setCreateCycle,
}: TaskViewFooterProps) => {
  return (
    <div className="z-20 flex items-center justify-between border-t border-t-lines-hairline bg-surface-sunken px-4">
      <div className="flex">
        {/* Create cycle */}
        <Button
          variant="tertiary"
          className="border-none p-1.5"
          onClick={() => setCreateCycle(true)}
          aria-label="Create cycle"
        >
          <Plus strokeWidth={1.5} size={15} />
        </Button>

        {/* Menu */}
        <Button variant="tertiary" className="border-none p-1.5" aria-label="Cycle menu">
          <Menu strokeWidth={1.5} size={15} />
        </Button>

        {/* Cycles */}
        {cycles.map((cycle) => (
          <CycleFooterTab
            key={cycle.id}
            cycle={cycle}
            handleClick={() => {
              setCurrentCycleId(cycle.id);
            }}
            isCurrent={currentCycleId === cycle.id}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        {isCardHeld && (
          <Text variant="body-sm" className="text-ink-3">
            Card held - drop it in any stage column
          </Text>
        )}

        <Button
          variant="tertiary"
          className={`flex items-center justify-center gap-1 ${
            openBacklog
              ? 'border-accent-deep bg-accent-wash-selected text-accent-deep'
              : 'text-ink-2'
          }`}
          onClick={onClick}
        >
          <Inbox strokeWidth={1.5} size={13} />

          <Text>Backlog</Text>

          <Text variant="body-sm" className="font-normal">
            {taskLength}
          </Text>
        </Button>
      </div>
    </div>
  );
};

export default TaskViewFooter;
