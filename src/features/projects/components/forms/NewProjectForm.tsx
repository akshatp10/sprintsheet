import { useForm } from "react-hook-form";
import type { ProjectFormData } from "../../types/projectFormData";
import BasicsStep from "./BasicsStep";
import ColumnStagesStep from "./ColumnStagesStep";
import PeopleStep from "./PeopleStep";
import ProjectFormHeader from "./ProjectFormHeader";
import ProjectFormStepper from "./ProjectFormStepper";
import { useState } from "react";
import ProjectFormFooter from "./ProjectFormFooter";

interface NewProjectFormProps {
    onClose: () => void
}

const defaultValues = {
    name: "",
    key: "",
    description: "",
    cycleLength: "default",
    customCycleDays: "5",
    startingDay: "",
    autoCycle: false,
    defaultView: "table",
    stages: [
        { name: "Backlog" },
        { name: "Todo" },
        { name: "In progress" },
        { name: "In QA" },
        { name: "Done" },
    ],
    people: [],
    startFirstCycle: true,
}

const NewProjectForm = ({ onClose }: NewProjectFormProps) => {
    const [currentStep, setCurrentStep] = useState(1);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProjectFormData>({ defaultValues });

    const onSubmit = (data: ProjectFormData) => {
        console.log(data);
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl px-6">

                <ProjectFormHeader onClose={onClose} />

                <ProjectFormStepper currentStep={currentStep} />

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="py-5">
                        {currentStep === 1 && (
                            <BasicsStep
                                register={register}
                                watch={watch}
                                setValue={setValue}
                                errors={errors}
                            />
                        )}

                        {currentStep === 2 && (
                            <ColumnStagesStep
                                register={register}
                                control={control}
                                watch={watch}
                                setValue={setValue}
                                errors={errors}
                            />
                        )}

                        {currentStep === 3 && (
                            <PeopleStep
                                register={register}
                                control={control}
                                watch={watch}
                                setValue={setValue}
                                errors={errors}
                            />
                        )}
                    </div>

                    <ProjectFormFooter
                        currentStep={currentStep}
                        onClose={onClose}
                        onBack={handleBack}
                        onNext={handleNext}
                    />

                </form>
            </div>
        </div>
    );
};

export default NewProjectForm;