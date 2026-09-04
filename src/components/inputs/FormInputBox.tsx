import { cn } from "@/lib/cn";
import Text from "../common/Text";

interface FormInputBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
}

const FormInputBox = ({
    label,
    error,
    children,
    className,
    ...props
}: FormInputBoxProps) => {
    return (
        <div className={cn("flex flex-col gap-0.5", className)} {...props}>
            <Text
                variant="body-sm"
                className="text-ink-2"
            >
                {label}
            </Text>

            {children}

            {error && (
                <Text
                    variant="caption"
                    className="text-stage-blocked-text"
                >
                    {error}
                </Text>
            )}
        </div>
    );
};

export default FormInputBox;