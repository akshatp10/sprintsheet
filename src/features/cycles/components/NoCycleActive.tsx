import Button from '@/components/button/Button';
import Mascot from '@/components/common/Mascot';
import Text from '@/components/common/Text';
import { Plus } from 'lucide-react';

interface NoCycleActiveProps {
  hasCycles?: boolean;
  onCreateCycle?: () => void;
}

const NoCycleActive = ({ hasCycles, onCreateCycle }: NoCycleActiveProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex max-w-md flex-col items-center text-center">
        <Mascot renderAnimation expression="blocked" size={120} />

        <Text variant="h2" className="mt-4">
          {hasCycles ? 'No cycle selected' : 'No cycles yet'}
        </Text>

        <Text variant="body" className="mt-2 text-ink-3">
          {hasCycles
            ? 'Select a cycle from the bar below to view its tasks, or create a new cycle.'
            : 'Create your first cycle to start organizing and tracking your tasks.'}
        </Text>
        {!!onCreateCycle && (
          <Button
            variant="primary"
            className="mt-5 flex items-center gap-2"
            onClick={onCreateCycle}
          >
            <Plus size={15} strokeWidth={1.5} />
            Create New Cycle
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoCycleActive;
