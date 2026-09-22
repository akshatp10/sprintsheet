import { cn } from "@/lib/cn";

import Text from "../common/Text";

interface FormInputBoxProps
    extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    error?: string;
    optionalText?: string;
    children: React.ReactNode;
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
                    className="absolute left-0 top-full whitespace-nowrap text-stage-blocked-text"
                >
                    {error}
                </Text>
            )}
        </div>
    );
};

export default FormInputBox;