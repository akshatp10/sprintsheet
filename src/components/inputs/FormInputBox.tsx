import { cn } from "@/lib/cn";

import Text from "../common/Text";

interface FormInputBoxProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /** Label displayed above the input content to identify the field or value being entered. */
    label?: string;

    /** Validation or input error message displayed below the field and positioned independently of the input layout. */
    error?: string;

    /** Additional text displayed beside the label, typically used to indicate that a field is optional or provide a short hint. */
    optionalText?: string;

    /** Form control or other content rendered between the label section and the error message. */
    children: React.ReactNode;

    /** Additional CSS classes applied to the outer form field container, allowing its layout and styling to be customized. */
    className?: string;
}

const FormInputBox = ({
    label,
    optionalText,
    error,
    children,
    className,
    ...props
}: FormInputBoxProps) => {
    return (
        <div
            className={cn(
                "relative flex flex-col gap-0.5",
                className,
            )}
            {...props}
        >
            <div className="flex items-baseline gap-1">
                {label && (
                    <Text variant="body-sm" className="text-ink-2">
                        {label}
                    </Text>
                )}
                {optionalText && (
                    <Text
                        variant="caption"
                        className="text-ink-fades-placeholders"
                    >
                        {optionalText}
                    </Text>
                )}
            </div>

            {children}

            {error && (
                <Text
                    variant="caption"
                    className="absolute left-0 top-full w-full wrap-break-words text-stage-blocked-text"
                >
                    {error}
                </Text>
            )}
        </div>
    );
};

export default FormInputBox;