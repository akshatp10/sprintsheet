import { useState } from "react";
import { type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue, type UseFormWatch, useFieldArray } from "react-hook-form";
import { Lock, X } from "lucide-react";
import type { ProjectFormData, ProjectPerson } from "../../types/projectFormData";
import Text from "@/components/common/Text";
import Button from "@/components/button/Button";
import { InputText } from "@/components/inputs/InputText";
import ToggleButtonBox from "@/components/common/ToggleButtonBox";
import UserPanel from "@/components/sidebar/UserPanel";
import GlobalChip from "@/components/chips/GlobalChip";

interface PeopleStepProps {
    register: UseFormRegister<ProjectFormData>;
    control: Control<ProjectFormData>;
    watch: UseFormWatch<ProjectFormData>;
    setValue: UseFormSetValue<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
}

const currentUser = {
    name: "Akshat",
};

const PeopleStep = ({ register, control, watch, setValue }: PeopleStepProps) => {
    const { fields, append, remove } = useFieldArray({ control, name: "people" });
    const startFirstCycle = watch("startFirstCycle");

    const [inviteInput, setInviteInput] = useState("");
    const [inviteRole, setInviteRole] = useState<ProjectPerson["role"]>("member");

    const handleAdd = () => {
        const emails = inviteInput
            .split(",")
            .map((email) => email.trim())
            .filter(Boolean);

        if (emails.length === 0) return;

        emails.forEach((email) => append({ email, role: inviteRole }));
        setInviteInput("");
    };

    return (
        <section className="flex flex-col gap-4">

            {/* Invite */}
            <div className="flex flex-col gap-1.5">
                <Text variant="body-sm" className="text-ink-2">Invite by email</Text>
                <div className="flex gap-2">
                    <InputText
                        value={inviteInput}
                        onChange={setInviteInput}
                        placeholder="name@company.com, comma separated"
                        className="flex-1"
                    />
                    <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value as ProjectPerson["role"])}
                        className="bg-surface rounded-md border border-lines-hairline focus:outline-0 px-2 text-ink text-type-body-sm cursor-pointer"
                    >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>
                    <Button type="button" handleClick={handleAdd} variant="secondary">
                        <Text variant="body-sm" className="font-medium">Add</Text>
                    </Button>
                </div>
            </div>

            {/* People list */}
            <div className="flex flex-col gap-2">

                {/* Owner — fixed, not part of the field array */}
                <div className="flex items-center justify-between rounded-md border border-lines-hairline px-3 py-2">
                    <div className="flex items-center gap-2">
                        <UserPanel userName={currentUser.name} variant="blue" textVariant="body-sm" textColor="text-ink" />
                        <Text variant="body-sm" className="text-ink-3">· you</Text>
                    </div>
                    <div className="flex items-center gap-2">
                        <GlobalChip text="Admin" variant="primary" bgColor="bg-accent-wash-active" borderColor="border border-accent-deep" textColor="text-accent-deep" textType="text-type-caption" />
                        <Lock className="w-3.5 h-3.5 text-ink-3" />
                    </div>
                </div>

                {/* Invited people — bound to people[index] via useFieldArray */}
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="flex items-center justify-between rounded-md border border-lines-hairline px-3 py-2"
                    >
                        <div className="flex items-center gap-2">
                            <UserPanel userName={field.email} variant="rose" />
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                {...register(`people.${index}.role`)}
                                className="bg-surface rounded-md border border-lines-hairline focus:outline-0 px-2 py-1 text-ink text-type-body-sm"
                            >
                                <option value="member">Member</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button type="button" onClick={() => remove(index)}>
                                <X className="w-3.5 h-3.5 text-ink-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Start first cycle */}
            <ToggleButtonBox
                checked={startFirstCycle}
                onChange={(value) => setValue("startFirstCycle", value)}
                classname="flex-row items-center justify-between w-full"
            >
                <div className="flex justify-between items-center w-full">
                    <Text variant="body-sm" className="text-ink-2 font-medium">Start the first cycle today</Text>
                    <Text variant="caption" className="text-ink-3 ml-auto">Aug 17-21</Text>
                </div>
            </ToggleButtonBox>

            <Text variant="caption" className="text-ink-3">
                Tasks created before a cycle exists — or with the first cycle off — land in the <Text variant="caption" className="font-medium text-ink-2" as="span">backlog</Text>. Nothing is lost waiting for a cycle to start.
            </Text>

        </section>
    );
};

export default PeopleStep;