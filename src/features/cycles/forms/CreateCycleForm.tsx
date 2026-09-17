import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import Input from "@/components/inputs/Input";
import FormInputBox from "@/components/inputs/FormInputBox";
import PopupModal from "@/components/popupModals/PopupModal";

import { useCreateCycle } from "@/lib/services/cycles/hooks";
import type { CreateCycleInput } from "@/lib/services/cycles/types";

import {
    cycleFormSchema,
    defaultValues,
    type CycleFormData,
} from "../types/cycleFormData";
import { formatCycleDate } from "@/lib/formatCycleDate";
import ToggleButton from "@/components/inputs/ToggleButton";

interface CreateCycleFormProps {
    projectId: string;
    onClose: () => void;
}

const CreateCycleForm = ({ projectId, onClose }: CreateCycleFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<CycleFormData>({
        resolver: zodResolver(cycleFormSchema),
        defaultValues,
    });

    const { mutate } = useCreateCycle();

    const handleFormSubmit = (data: CycleFormData) => {
        const cycleName =
            data.name?.trim() ||
            `${formatCycleDate(data.startDate)} - ${formatCycleDate(data.endDate)}`;

        const newCycle: CreateCycleInput = {
            projectId,
            name: cycleName,
            startDate: data.startDate,
            endDate: data.endDate,
        };

        mutate(newCycle);

        reset();
        onClose();
    };

    return (
        <PopupModal label="New cycle" onClose={onClose} alert={isDirty}>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-4"
            >
                {/* Name */}
                <FormInputBox label="Name" optionalText="optional - dates are used if blank" error={errors.name?.message}>
                    <Input
                        register={register("name")}
                        placeholder="Release hardening"
                        autoFocus
                    />
                </FormInputBox>

                {/* Dates */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <FormInputBox
                        label="Start date"
                        error={errors.startDate?.message}
                    >
                        <Input register={register("startDate")} type="date" />
                    </FormInputBox>

                    <FormInputBox
                        label="End date"
                        error={errors.endDate?.message}
                    >
                        <Input register={register("endDate")} type="date" />
                    </FormInputBox>
                </div>

                {/* Make active */}
                <label className="flex items-center gap-2">
                    <ToggleButton onChange={() => { }} checked />

                    <Text variant="body-sm">Make it the active cycle</Text>
                </label>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        <Text variant="body-sm">Cancel</Text>
                    </Button>

                    <Button type="submit" variant="primary">
                        <Text variant="body-sm" className="font-medium">
                            Create cycle
                        </Text>
                    </Button>
                </div>
            </form>
        </PopupModal>
    );
};

export default CreateCycleForm;
