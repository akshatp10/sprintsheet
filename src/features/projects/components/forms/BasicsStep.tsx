import { useState } from "react";
import { type FieldErrors, type UseFormRegister, type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import type { ProjectFormData } from "../../types/projectFormData";
import Text from "@/components/common/Text";
import { InputText } from "@/components/inputs/InputText";
import { RadioButton } from "@/components/inputs/RadioButton";
import ToggleButtonBox from "@/components/common/ToggleButtonBox";

interface BasicsStepProps {
    register: UseFormRegister<ProjectFormData>;
    watch: UseFormWatch<ProjectFormData>;
    setValue: UseFormSetValue<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
}

const BasicsStep = ({ watch, setValue }: BasicsStepProps) => {
    const name = watch("name");
    const description = watch("description");
    const cycleLength = watch("cycleLength");
    const startingDay = watch("startingDay");
    const autoCycle = watch("autoCycle");

    const [key, setKey] = useState("");
    const [customDays, setCustomDays] = useState("5");
    const [defaultView, setDefaultView] = useState("table");

    return (
        <section className="flex flex-col gap-5">

            {/* Top section inputs */}
            <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-1.5">
                    <Text variant="body-sm" className="text-ink-2">Project name</Text>
                    <InputText
                        value={name}
                        onChange={(value) => setValue("name", value)}
                        placeholder=""
                        className="w-full"
                    />
                </div>
                <div className="flex shrink-0 flex-col gap-1.5">
                    <Text variant="body-sm" className="text-ink-2">Key</Text>
                    <InputText
                        value={key}
                        onChange={setKey}
                        placeholder=""
                        className="w-28"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
                <Text variant="body-sm" className="text-ink-2">Description</Text>
                <textarea
                    value={description}
                    onChange={(e) => setValue("description", e.target.value)}
                    rows={2}
                    placeholder=""
                    className="bg-surface rounded-md border border-lines-hairline focus:outline-0 px-2 py-1.5 text-ink placeholder:text-ink-fades-placeholders text-type-body-sm w-full resize-none"
                />
            </div>

            {/* Cycle Selection and Configuration */}
            <div className="flex flex-col gap-1.5">
                <Text variant="body-sm" className="text-ink-2">Cycle length</Text>

                <div className="flex items-center gap-3">
                    <RadioButton
                        value={cycleLength}
                        onChange={(value) => setValue("cycleLength", value)}
                        options={[
                            { label: "7 Days", value: "default" },
                            { label: "Custom", value: "custom" },
                            { label: "No Cycle", value: "nocycle" },
                        ]}
                    />

                    {cycleLength === "custom" && (
                        <>
                            <InputText
                                value={customDays}
                                onChange={setCustomDays}
                                placeholder="5"
                                className="w-14 text-center"
                            />
                            <Text variant="body-sm" className="text-ink-2 whitespace-nowrap">days, starting</Text>
                            <InputText
                                value={startingDay}
                                onChange={(value) => setValue("startingDay", value)}
                                placeholder="Monday"
                                className="w-32"
                            />
                        </>
                    )}
                </div>

                <Text variant="caption" className="text-ink-3">
                    This is the project's default length. Any single cycle's dates stay editable afterwards, so a short week or a holiday needs no new setting.
                </Text>
            </div>

            {/* Toggle for Auto Creation of Cycle */}
            <ToggleButtonBox checked={autoCycle} onChange={(value) => setValue("autoCycle", value)}>
                <Text variant="body-sm" className="text-ink-2 font-medium">Open the next cycle automatically</Text>
                <Text variant="caption" className="text-ink-3">
                    When Aug 21 ends, <Text variant="caption" className="font-medium text-ink-2" as="span">Aug 24-28</Text> opens by itself at the default length — empty, active, tabs already in place. Unfinished work stays in the cycle it was in until someone moves it.
                </Text>
            </ToggleButtonBox>

            {/* Default view */}
            <div className="flex flex-col gap-1.5">
                <Text variant="body-sm" className="text-ink-2">Default view for the team</Text>
                <RadioButton
                    value={defaultView}
                    onChange={setDefaultView}
                    options={[
                        { label: "Table", value: "table" },
                        { label: "Cards", value: "cards" },
                    ]}
                />
            </div>

        </section>
    );
};

export default BasicsStep;