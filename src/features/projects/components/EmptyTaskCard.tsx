import Text from "@/components/common/Text";
import EmptyTask from "@/assets/animations/Task_empty.svg"
import Button from "@/components/button/Button";

const EmptyTaskCard = () => {
    return (
        <Button handleClick={() => { }} variant="tertiary" className="flex min-h-40 h-full w-full flex-col items-center justify-center rounded-lg border border-dashed border-accent-deep">
            <img
                src={EmptyTask}
                alt="Empty project"
                className="h-16 w-16 object-contain"
            />

            <Text className="text-ink">
                Start a project
            </Text>

            <Text className="text-ink-2" variant="body-sm">
                Blank or from the standard sheet
            </Text>
        </Button>
    );
};

export default EmptyTaskCard;