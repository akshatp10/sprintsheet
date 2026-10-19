import { useState } from 'react';
import { ArrowUpToLine, ChevronDown, Inbox } from 'lucide-react';

import Button from '@/components/button/Button';
import Chip from '@/components/chips/Chip';
import Text from '@/components/common/Text';

import type { Cycle } from '@/lib/services/cycles/types';
import { formatCycleDate } from '@/lib/utils';
import type { SelectOption } from '@/components/select/Select';
import Select from '@/components/select/Select';

interface CycleAllTaskSelectionFooterProps {
  activeCycle?: Cycle | null;
  allCycles: Cycle[];
  selectedTaskLength: number;
  onMoveToCycle: (cycleId: string) => void;
  onMoveToBacklog: () => void;
}

const CycleAllTaskSelectionFooter = ({
  activeCycle,
  allCycles,
  selectedTaskLength,
  onMoveToBacklog,
  onMoveToCycle,
}: CycleAllTaskSelectionFooterProps) => {
  const defaultCycle = activeCycle ?? allCycles.at(-1) ?? null;

  const [selectedCycleId, setSelectedCycleId] = useState<string | null>(defaultCycle?.id ?? null);

  const [previousDefaultCycleId, setPreviousDefaultCycleId] = useState(defaultCycle?.id);

  if (defaultCycle?.id !== previousDefaultCycleId) {
    setPreviousDefaultCycleId(defaultCycle?.id);
    setSelectedCycleId(defaultCycle?.id ?? null);
  }

  const selectedCycle = allCycles.find((cycle) => cycle.id === selectedCycleId) ?? defaultCycle;

  const cycleOptions: SelectOption[] = allCycles.map((cycle) => ({
    value: cycle.id,
    label: `${formatCycleDate(cycle.startDate)} - ${formatCycleDate(cycle.endDate)}`,
  }));

  return (
    <div className="flex h-[5dvh] w-full items-center justify-between bg-black px-4 py-2 text-white">
      <div className="flex items-center gap-3">
        <Chip
          className="bg-white/25"
          textColor="text-white"
          borderColor="border-none"
          text={<>{selectedTaskLength} selected</>}
        />

        <Text className="text-ink-3">Set status</Text>
        <Text className="text-ink-3">Assign</Text>

        {allCycles.length === 0 ? (
          <div className="rounded-md border border-ink-3 px-2 py-1 text-sm text-white">
            No Cycles Present
          </div>
        ) : (
          <div className="flex items-center gap-0">
            <Button
              type="button"
              variant="secondary"
              disabled={!selectedCycle}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                if (selectedCycle) {
                  onMoveToCycle(selectedCycle.id);
                }
              }}
              className="flex items-center gap-1 border-ink-3 text-white shadow-none"
            >
              <ArrowUpToLine size={15} strokeWidth={1.5} />
              Add to{' '}
              {selectedCycle
                ? `${formatCycleDate(selectedCycle.startDate)} - ${formatCycleDate(selectedCycle.endDate)}`
                : 'cycle'}
              <div
                className="relative h-1 -mt-7"
                onClick={(event) => event.stopPropagation()}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <Select
                  mode="single"
                  options={cycleOptions}
                  value={selectedCycleId}
                  onChange={setSelectedCycleId}
                  placeholder="Select a cycle"
                  dropdownPlacement="top"
                  className="w-full"
                  listClassName="w-64 text-ink-2"
                  searchable={false}
                  renderTrigger={({ open, toggleOpen }) => (
                    <Button
                      variant="tertiary"
                      type="button"
                      aria-label="Choose cycle"
                      aria-expanded={open}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleOpen();
                      }}
                      className="flex h-8 w-full items-center justify-center text-white cursor-pointer border-none px-1"
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${open ? 'rotate-180' : ''}`}
                      />
                    </Button>
                  )}
                />
              </div>
            </Button>
          </div>
        )}

        <Button
          type="button"
          onClick={() => onMoveToBacklog()}
          variant="secondary"
          className="flex items-center gap-1 border-ink-3 text-white shadow-none"
        >
          <Inbox size={15} strokeWidth={1.5} />
          Move to Backlog
        </Button>
      </div>
    </div>
  );
};

export default CycleAllTaskSelectionFooter;
