import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import { Check, MoveLeft, MoveRight } from "lucide-react";

interface ProjectFormFooterProps {
    currentStep: number;
    onClose: () => void;
    onBack: () => void;
    onNext: () => void;
}

const ProjectFormFooter = ({
    currentStep,
    onClose,
    onBack,
    onNext,
}: ProjectFormFooterProps) => {
    return (
        <div className="flex items-center justify-end gap-2 py-4">

            {currentStep === 1 && (
                <Button
                    type="button"
                    handleClick={onClose}
                    variant="tertiary"
                >
                    <Text variant="body" className="font-medium">
                        Cancel
                    </Text>
                </Button>
            )}

            <div className="flex gap-2">

                {currentStep > 1 && (
                    <Button
                        type="button"
                        handleClick={onBack}
                        variant="tertiary"
                        className="flex items-center gap-1 border-none"
                    >
                        <MoveLeft
                            className="text-ink-3"
                            strokeWidth={1.5}
                            size={15}
                        />

                        <Text variant="body" className="font-medium">
                            Back
                        </Text>
                    </Button>
                )}

                {currentStep < 3 ? (
                    <Button
                        type="button"
                        handleClick={onNext}
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        <Text variant="body-sm" className="font-medium">
                            Continue
                        </Text>

                        <MoveRight
                            className="text-accent-deep"
                            strokeWidth={1.5}
                            size={15}
                        />
                    </Button>
                ) : (
                    <Button
                        key={currentStep.toString()}
                        type="submit"
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        <Check
                            className="text-accent-deep"
                            strokeWidth={1.5}
                            size={15}
                        />

                        <Text variant="body" className="font-medium">
                            Create project
                        </Text>
                    </Button>
                )}

            </div>
        </div>
    );
};

export default ProjectFormFooter;