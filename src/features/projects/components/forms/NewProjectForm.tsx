import { useForm } from "react-hook-form";
import { defaultValues, projectFormSchema, type ProjectFormData } from "../../types/projectFormData";
import BasicsStep from "./BasicsStep";
import ColumnStagesStep from "./ColumnStagesStep";
import PeopleStep from "./PeopleStep";
import ProjectFormStepper from "./ProjectFormStepper";
import { useRef, useState } from "react";
import ProjectFormFooter from "./ProjectFormFooter";
import PopupModal, { type PopupModalHandle } from "@/components/popupModals/PopupModal";
import { zodResolver } from "@hookform/resolvers/zod";

interface NewProjectFormProps {
    onClose: () => void
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
        trigger,
        formState: { errors, isDirty },
    } = useForm<ProjectFormData>({ defaultValues, resolver: zodResolver(projectFormSchema) });

    // These fields should have some data in order to move to next step
    const stepFields: Record<number, (keyof ProjectFormData)[]> = {
        1: ["name", "key", "cycleLength", "customCycleDays", "startingDay"],
        2: ["stages"],
        3: ["people"],
    };

    const onSubmit = (data: ProjectFormData) => {
        console.log(data);
    };

    const handleNext = async () => {
        const valid = await trigger(stepFields[currentStep]);
        if (valid && currentStep < 3) {
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