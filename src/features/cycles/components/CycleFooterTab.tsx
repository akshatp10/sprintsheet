import Button from '@/components/button/Button';
import Text from '@/components/common/Text';

import type { Cycle } from '@/lib/services/cycles/types';

import { cn } from '@/lib/cn';

interface CycleFooterTabProps {
  cycle: Cycle;
  handleClick: () => void;
  isCurrent: boolean;
  activeCycleId: string;
}

const CycleFooterTab = ({ cycle, handleClick, isCurrent, activeCycleId }: CycleFooterTabProps) => {
  return (
    <Button
      variant="tertiary"
      onClick={handleClick}
      className={cn(
        'relative flex items-center gap-3 rounded-none rounded-t-lg border-b-2 border-transparent px-3 py-1.5 min-w-0 shrink-0',
        isCurrent
          ? 'bg-accent-tint text-accent-deep border-b-accent border-t border-t-accent'
          : 'text-ink-2 hover:bg-surface-raised hover:border-b-lines-control',
      )}
    >
      <Text variant="h2">{cycle.name}</Text>

      {activeCycleId === cycle.id && (
        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent" />
      )}
    </Button>
  );
};

export default CycleFooterTab;
