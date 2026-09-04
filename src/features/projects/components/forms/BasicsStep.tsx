import { type FieldErrors, type UseFormRegister, type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import type { ProjectFormData } from "../../types/projectFormData";
import Text from "@/components/common/Text";
import { InputText } from "@/components/inputs/InputText";
import { RadioButton } from "@/components/inputs/RadioButton";
import ToggleButtonBox from "@/components/common/ToggleButtonBox";
import FormInputBox from "@/components/inputs/FormInputBox";

interface BasicsStepProps {
    register: UseFormRegister<ProjectFormData>;
    watch: UseFormWatch<ProjectFormData>;
    setValue: UseFormSetValue<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
}

const BasicsStep = ({ register, watch, setValue }: BasicsStepProps) => {
    const name = watch("name");
    const key = watch("key");
    const cycleLength = watch("cycleLength");
    const customCycleDays = watch("customCycleDays");
    const startingDay = watch("startingDay");
    const autoCycle = watch("autoCycle");
    const defaultView = watch("defaultView");

    return (
        <section className="flex flex-col gap-3">

            {/* Top section inputs */}
            <div className="flex gap-4">
                <FormInputBox label="Project name" className="flex-1">
                    <InputText
                        value={name}
                        onChange={(value) => setValue("name", value, { shouldDirty: true })}
                        placeholder=""
                        className="w-full"
                        autoFocus
                    />
                </FormInputBox>

                <FormInputBox label="Key" className="shrink-0">
                    <InputText
                        value={key}
                        onChange={(value) => setValue("key", value, { shouldDirty: true })}
                        placeholder=""
                        className="w-28"
                    />
                </FormInputBox>
            </div>

            {/* Description */}
            <FormInputBox label="Description">
                <textarea
                    {...register("description")}
                    rows={2}
                    placeholder=""
                    className="bg-surface rounded-md border border-lines-hairline focus:outline-0 px-2 py-1.5 text-ink placeholder:text-ink-fades-placeholders text-type-body-sm w-full resize-none"
                />
            </FormInputBox>

            {/* Cycle Selection and Configuration */}
            <FormInputBox label="Cycle length">
                <div className="flex items-center gap-3">
                    <RadioButton
                        value={cycleLength}
                        onChange={(value) => setValue("cycleLength", value, { shouldDirty: true })}
                        options={[
                            { label: "7 Days", value: "default" },
                            { label: "Custom", value: "custom" },
                            { label: "No Cycle", value: "nocycle" },
                        ]}
                    />

                    {cycleLength === "custom" && (
                        <>
                            <InputText
                                value={customCycleDays}
                                onChange={(value) => setValue("customCycleDays", value, { shouldDirty: true })}
                                placeholder="5"
                                className="w-14 text-center"
                            />
                            <Text variant="body-sm" className="text-ink-2 whitespace-nowrap">days, starting</Text>
                            <InputText
                                value={startingDay}
                                onChange={(value) => setValue("startingDay", value, { shouldDirty: true })}
                                placeholder="Monday"
                                className="w-32"
                            />
                        </>
                    )}

                </div>
            </FormInputBox>

            <Text variant="caption" className="text-ink-3">
                This is the project's default length. Any single cycle's dates stay editable afterwards, so a short week or a holiday needs no new setting.
            </Text>

            {/* Toggle for Auto Creation of Cycle */}
            <ToggleButtonBox checked={autoCycle} onChange={(value) => setValue("autoCycle", value, { shouldDirty: true })}>
                <Text variant="body-sm" className="text-ink-2 font-medium">Open the next cycle automatically</Text>
                <Text variant="caption" className="text-ink-3">
                    When Aug 21 ends, <Text variant="caption" className="font-medium text-ink-2" as="span">Aug 24-28</Text> opens by itself at the default length — empty, active, tabs already in place. Unfinished work stays in the cycle it was in until someone moves it.
                </Text>
            </ToggleButtonBox>

            {/* Default view */}
            <FormInputBox label="Default view for the team">
                <RadioButton
                    value={defaultView}
                    onChange={(value) => setValue("defaultView", value, { shouldDirty: true })}
                    options={[
                        { label: "Table", value: "table" },
                        { label: "Cards", value: "cards" },
                    ]}
                />
            </FormInputBox>

        </section>
    );
};

export default BasicsStep;