import Text from '@/components/common/Text';

interface DashboardHeaderProps {
  cycleName?: string;
  cycleLength: number;
  currentDay: number;
}

const DashboardHeader = ({ cycleName, cycleLength, currentDay }: DashboardHeaderProps) => {
  return (
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
  );
};

export default DashboardHeader;
