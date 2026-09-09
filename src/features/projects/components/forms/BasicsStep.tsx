import {
    type FieldErrors,
    type UseFormRegister,
    type UseFormSetValue,
    type UseFormWatch,
} from "react-hook-form";
import type { ProjectFormData } from "../../types/projectFormData";
import Text from "@/components/common/Text";
import { InputText } from "@/components/inputs/InputText";
import ToggleButtonBox from "@/components/common/ToggleButtonBox";
import FormInputBox from "@/components/inputs/FormInputBox";
import { useState } from "react";
import { Tabs } from "@/components/inputs/Tabs";
interface BasicsStepProps {
    register: UseFormRegister<ProjectFormData>;
    watch: UseFormWatch<ProjectFormData>;
    setValue: UseFormSetValue<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
}
const BasicsStep = ({ register, watch, setValue, errors }: BasicsStepProps) => {
    const formValues = watch();

    const [isKeyManuallyEdited, setIsKeyManuallyEdited] = useState(false);
    const generateKeyName = (data: string) => {
        const initials = data
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((word) => word[0]?.toUpperCase())
            .join("");
        return initials ?? "";
    };

    const handleProjectNameChange = (value: string) => {
        setValue("name", value, { shouldDirty: true, shouldValidate: true });
        if (!isKeyManuallyEdited) {
            setValue("key", generateKeyName(value), {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    };

    const handleKeyChange = (value: string) => {
        setIsKeyManuallyEdited(true);
        setValue("key", value.toUpperCase(), {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    return (
        <section className="flex flex-col gap-2">
            <div className="flex gap-4">
                <FormInputBox
                    label="Project name"
                    error={errors.name?.message}
                    className="flex-1"
                >
                    <InputText
                        value={formValues.name}
                        onChange={handleProjectNameChange}
                        placeholder=""
                        className="w-full"
                        autoFocus
                    />
                </FormInputBox>
                <FormInputBox
                    label="Key"
                    error={errors.key?.message}
                    className="shrink-0"
                >
                    <InputText
                        value={formValues.key}
                        onChange={handleKeyChange}
                        placeholder=""
                        className="w-28"
                    />
                </FormInputBox>
            </div>

            {/* Description */}
            <FormInputBox
                label="Description"
                error={errors.description?.message}
            >
                <textarea
                    {...register("description")}
                    rows={2}
                    placeholder=""
                    className="bg-surface rounded-md border border-lines-hairline focus:outline-0 px-2 py-1.5 text-ink placeholder:text-ink-fades-placeholders text-type-body-sm w-full resize-none"
                />
            </FormInputBox>

            {/* Cycle Selection and Configuration */}
            <FormInputBox
                label="Cycle length"
                error={errors.customCycleDays?.message}
            >
                <div className="flex items-center gap-3">
                    <Tabs
                        activeTab={formValues.cycleLength}
                        onChange={(value) =>
                            setValue("cycleLength", value, {
                                shouldDirty: true,
                                shouldValidate: true,
                            })
                        }
                        tabs={[
                            { label: "7 Days", value: "default" },
                            { label: "Custom", value: "custom" },
                            { label: "No Cycle", value: "nocycle" },
                        ]}
                    />
                    {formValues.cycleLength === "custom" && (
                        <>
                            <InputText
                                type="number"
                                value={formValues.customCycleDays ?? ""}
                                onChange={(value) =>
                                    setValue("customCycleDays", value, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    })
                                }
                                placeholder="5"
                                className="w-14 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <Text
                                variant="body-sm"
                                className="text-ink-2 whitespace-nowrap"
                            >
                                days, starting
                            </Text>
                            <select
                                value={formValues.startingDay ?? ""}
                                onChange={(e) =>
                                    setValue("startingDay", e.target.value, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    })
                                }
                                className="bg-surface rounded-md border border-lines-hairline focus:outline-0 px-2 text-ink text-type-body-sm cursor-pointer"
                            >
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                            </select>
                        </>
                    )}
                </div>
            </FormInputBox>
            <Text variant="caption" className="text-ink-3">
                This is the project's default length. Any single cycle's dates
                stay editable afterwards, so a short week or a holiday needs no
                new setting.
            </Text>
            {/* Toggle for Auto Creation of Cycle */}
            <ToggleButtonBox
                checked={formValues.autoCycle}
                onChange={(value) =>
                    setValue("autoCycle", value, { shouldDirty: true })
                }
            >
                <Text variant="body-sm" className="text-ink-2 font-medium">
                    Open the next cycle automatically
                </Text>
                <Text variant="caption" className="text-ink-3">
                    When Aug 21 ends,
                    <Text
                        variant="caption"
                        className="font-medium text-ink-2"
                        as="span"
                    >
                        Aug 24-28
                    </Text>
                    opens by itself at the default length — empty, active, tabs
                    already in place. Unfinished work stays in the cycle it was
                    in until someone moves it.
                </Text>
            </ToggleButtonBox>
            {/* Default view */}
            <FormInputBox label="Default view for the team">
                <Tabs
                    activeTab={formValues.defaultView}
                    onChange={(value) =>
                        setValue("defaultView", value, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                    tabs={[
                        { label: "Table", value: "table" },
                        { label: "Cards", value: "cards" },
                    ]}
                />
            </FormInputBox>
        </section>
    );
};
export default BasicsStep;