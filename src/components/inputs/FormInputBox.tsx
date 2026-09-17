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
        <div className={cn("flex flex-col gap-0.5 relative pb-3.5 -mb-3", className)} {...props}>
            <div className="flex gap-1 items-baseline-last">
                <Text
                    variant="body-sm"
                    className="text-ink-2"
                >
                    {label}
                </Text>
                <Text
                    variant="caption"
                    className="text-ink-fades-placeholders"
                >
                    {optionalText}
                </Text>
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