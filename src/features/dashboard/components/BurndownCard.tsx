import Text from '@/components/common/Text';

const BurndownCard = () => {
  return (
    <div className="flex-2 bg-surface border border-lines-hairline rounded-md p-4">
      <Text className="text-ink-2 font-bold flex items-baseline gap-2" variant="h2">
        Burndown
        <Text as="span" className="text-ink-3" variant="body-sm">
          open task vs ideal pace
        </Text>
      </Text>
    </div>
  );
};

export default BurndownCard;
