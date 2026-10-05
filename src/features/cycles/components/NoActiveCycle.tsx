import Mascot from '@/components/common/Mascot';
import Text from '@/components/common/Text';

const NoActiveCycle = () => {
  return (
    <div className="w-full border border-accent rounded-md p-6 bg-surface flex min-h-30 items-center justify-between">
      <div className="flex items-center gap-5">
        <Mascot expression="sleeping" size={75} renderAnimation />

        <div className="flex flex-col gap-1">
          <Text variant="h1">No active cycle</Text>

          <Text className="text-ink-3">
            There's no cycle running right now. Create a new cycle to start planning and tracking
            your work.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NoActiveCycle;
