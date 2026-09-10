import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/cn";

type BaseProps = {
    className?: string;
} & Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "className" | "name"
>;

type ControlledProps = BaseProps & {
    value: string;
    onChange: (value: string) => void;
    register?: never;
};

type RHFProps = BaseProps & {
    register: UseFormRegisterReturn;
    value?: never;
    onChange?: never;
};

type TextAreaProps = ControlledProps | RHFProps;

export default function TextArea({
    className,
    register,
    value,
    onChange,
    ...props
}: TextAreaProps) {
    const sharedClassName = cn(
        "bg-surface rounded-md border border-lines-hairline px-2 py-1.5 text-ink placeholder:text-ink-fades-placeholders h-full text-type-body-sm focus:outline-0",
        className,
    );

    if (register) {
        return (
            <textarea {...props} {...register} className={sharedClassName} />
        );
    }

    return (
        <textarea
            {...props}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={sharedClassName}
        />
    );
}
