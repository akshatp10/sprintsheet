// components/inputs/InputText.tsx
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/cn";

type BaseProps = {
    /** Additional CSS classes applied to the input, allowing its dimensions, spacing, borders, colors, or other styles to be customized. */
    className?: string;

    /** HTML input type that determines the input's behavior and browser controls, such as `text`, `email`, or `password`. Defaults to `text`. */
    type?: string;
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "className" | "type" | "name"
>;

type ControlledProps = BaseProps & {
    /** Current value displayed in the input when using controlled component mode. */
    value: string;

    /** Handles controlled input changes and receives the updated string value from the input. */
    onChange: (value: string) => void;

    /** Prevents React Hook Form registration from being used with controlled input mode. */
    register?: never;
};

type RHFProps = BaseProps & {
    /** React Hook Form registration object that connects the input to a form field and manages its value, events, and ref. */
    register: UseFormRegisterReturn;

    /** Prevents a manually controlled value from being used when the input is registered with React Hook Form. */
    value?: never;

    /** Prevents a manually controlled change handler from being used when the input is registered with React Hook Form. */
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
