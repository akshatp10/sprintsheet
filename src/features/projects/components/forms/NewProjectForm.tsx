import { useForm } from "react-hook-form";
import type { ProjectFormData } from "../../types/projectFormData";
import BasicsStep from "./BasicsStep";
import ColumnStagesStep from "./ColumnStagesStep";
import PeopleStep from "./PeopleStep";
import ProjectFormStepper from "./ProjectFormStepper";
import { useRef, useState } from "react";
import ProjectFormFooter from "./ProjectFormFooter";
import PopupModal, { type PopupModalHandle } from "@/components/popupModals/PopupModal";

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

    const popupRef = useRef<PopupModalHandle>(null);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isDirty },
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
        <PopupModal ref={popupRef} className="max-h-[90dvh]" label="New Project" onClose={onClose} alert={isDirty}>

            <ProjectFormStepper currentStep={currentStep} />

            <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">

                <div className="py-5 min-h-0 overflow-auto">
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
                    onClose={() => popupRef.current?.requestClose()}
                    onBack={handleBack}
                    onNext={handleNext}
                />

            </form>

        </PopupModal>
    );
};

export default NewProjectForm;