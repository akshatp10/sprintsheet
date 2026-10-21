import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import CycleFooterTab from '@/features/cycles/components/CycleFooterTab';
import { Inbox, Menu, Plus } from 'lucide-react';
import type { Cycle } from '@/lib/services/cycles/types';
import { useCycleStatus } from '@/hooks/useCycleStatus';
import Select, { type SelectOption } from '@/components/select/Select';

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
  const {
    active: activeCycles,
    closed: closedCycles,
    planned: plannedCycles,
  } = useCycleStatus(cycles);

  const active = activeCycles[0];
  const previous = closedCycles.slice(0, 2);
  const nextPlanned = plannedCycles.at(-1);

  const visibleCycles = [
    ...(nextPlanned ? [nextPlanned] : []),
    ...(active ? [active] : []),
    ...previous,
  ];

  const uniqueVisibleCycles = visibleCycles.filter(
    (cycle, index, items) => items.findIndex((item) => item.id === cycle.id) === index,
  );
  const visibleIds = new Set(uniqueVisibleCycles.map((cycle) => cycle.id));

  const hiddenCycles = cycles.filter((cycle) => !visibleIds.has(cycle.id));

  const getCycleStatus = (cycle: Cycle) => {
    if (closedCycles.some((item) => item.id === cycle.id)) {
      return 'Closed';
    }

    if (plannedCycles.some((item) => item.id === cycle.id)) {
      return 'Planned';
    }

    return 'Active';
  };

  const cycleOptions: SelectOption[] = hiddenCycles.map((cycle) => ({
    label: cycle.name,
    value: cycle.id,
  }));

  return (
    <div className="relative z-20 flex w-full min-w-0 items-center gap-3 border-t border-t-lines-hairline bg-surface-sunken px-4">
      {/* Create cycle and cycle selection menu */}
      <div className="flex shrink-0 items-center">
        <Button
          variant="tertiary"
          className="border-none p-1.5 hover:bg-surface-desk"
          onClick={() => setCreateCycle(true)}
          aria-label="Create cycle"
        >
          <Plus strokeWidth={1.5} size={15} />
        </Button>

        <Select
          options={cycleOptions}
          value={null}
          onChange={(cycleId) => {
            if (cycleId !== null) {
              setCurrentCycleId(cycleId);
            }
          }}
          searchable={false}
          listClassName="w-[256px]"
          itemClassName="cursor-pointer"
          dropdownPlacement="top"
          emptyMessage="No Cycles Found"
          dropdownOffset={8}
          renderTrigger={({ open, toggleOpen }) => (
            <Button
              variant="tertiary"
              className={`flex items-center gap-2 border-none p-1.5 hover:bg-surface-desk ${open && 'bg-accent-tint'}`}
              onClick={toggleOpen}
            >
              <Text variant="mono">{cycleOptions.length}</Text>
              <Menu strokeWidth={1.5} size={15} />
            </Button>
          )}
          renderOption={(option) => {
            const cycle = hiddenCycles.find((item) => item.id === option.value);

            if (!cycle) {
              return option.label;
            }

            return (
              <div className="flex w-full min-w-0 items-center justify-between gap-3">
                <Text className="truncate">{cycle.name}</Text>

                <Text variant="body-sm" className="shrink-0 text-ink-3">
                  {getCycleStatus(cycle)}
                </Text>
              </div>
            );
          }}
          getOptionClassName={(option) =>
            option.value === currentCycleId ? 'bg-accent-wash-active text-accent-deep' : ''
          }
        />
      </div>

      {/* Previous, active, and next planned cycles */}
      <div className="flex min-w-0 flex-1 items-center overflow-hidden">
        {uniqueVisibleCycles.map((cycle) => (
          <CycleFooterTab
            key={cycle.id}
            cycle={cycle}
            handleClick={() => setCurrentCycleId(cycle.id)}
            isCurrent={currentCycleId === cycle.id}
          />
        ))}
      </div>

      {/* Fixed Backlog section */}
      <div className="flex shrink-0 items-center gap-3">
        {isCardHeld && (
          <Text variant="body-sm" className="text-ink-3">
            Card held - drop it in any stage column
          </Text>
        )}

        <Button
          variant="tertiary"
          className={`flex shrink-0 items-center justify-center gap-1 ${
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
