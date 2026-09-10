// components/inputs/InputText.tsx
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/cn";

type BaseProps = {
    className?: string;
    type?: string;
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "className" | "type" | "name"
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

type InputProps = ControlledProps | RHFProps;

export default function Input({
    className,
    type = "text",
    register,
    value,
    onChange,
    ...props
}: InputProps) {
    const sharedClassName = cn(
        "bg-surface rounded-md border border-lines-hairline focus:outline-0 px-2 py-1.5 text-ink placeholder:text-ink-fades-placeholders h-full text-type-body-sm flex-0",
        className,
    );

    if (register) {
        return (
            <input
                {...props}
                {...register}
                type={type}
                className={sharedClassName}
            />
        );
    }

    return (
        <input
            {...props}
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={sharedClassName}
        />
    );
}
