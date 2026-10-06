import Chip from '@/components/chips/Chip';
import Text from '@/components/common/Text';

interface DashboardHeaderProps {
  cycleName?: string;
  cycleLength: number;
  currentDay: number;
  members: number;
  isActive: boolean;
}

const DashboardHeader = ({
  cycleName,
  cycleLength,
  currentDay,
  members,
  isActive,
}: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div>
        <Text variant="display">{cycleName}</Text>

        <div className="flex items-center gap-1 text-ink-2">
          <Text as="span">{cycleLength}-day cycle</Text> ·
          <Text as="span">
            day {currentDay} of {cycleLength}
          </Text>{' '}
          ·<Text as="span">{cycleLength - currentDay} day left</Text>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {isActive && (
          <Chip
            text="Active"
            variant="primary"
            className="bg-accent-tint text-accent border border-accent rounded-md"
          />
        )}
        <Chip text={members + ' members'} variant="secondary" className="bg-surface rounded-md" />
      </div>
    </div>
  );
};

export default DashboardHeader;
