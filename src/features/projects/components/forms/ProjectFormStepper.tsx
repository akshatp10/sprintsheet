import Text from "@/components/common/Text";
import FormStepCompontent from "../FormStepCompontent";

interface ProjectFormStepperProps {
    currentStep: number;
}

const steps = [
    { step: 1, label: "Basics" },
    { step: 2, label: "Columns & Stages" },
    { step: 3, label: "People" },
];

const ProjectFormStepper = ({
    currentStep,
}: ProjectFormStepperProps) => {
    return (
        <div className="flex items-center w-full">
            {steps.map((step, index) => (
                <>
                    <div key={step.step} className="flex items-center gap-1">
                        <FormStepCompontent
                            currentStep={currentStep}
                            step={step.step}
                        />

                        <Text
                            variant="body"
                            className={
                                currentStep >= step.step
                                    ? "text-accent"
                                    : "text-ink-2"
                            }
                        >
                            {step.label}
                        </Text>
                    </div>

                    {index < steps.length - 1 && (
                        <div
                            key={`line-${step.step}`}
                            className={`h-px flex-1 mx-3 ${currentStep > step.step
                                ? "bg-accent"
                                : "bg-ink-2"
                                }`}
                        />
                    )}
                </>
            ))}
        </div>
    );
};

export default ProjectFormStepper;