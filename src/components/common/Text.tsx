import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type TextVariant =
    | "display"
    | "h1"
    | "h2"
    | "body"
    | "body-sm"
    | "label"
    | "caption"
    | "micro"
    | "mono";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: TextVariant;
    truncate?: boolean;
}

const variantClasses: Record<TextVariant, string> = {
    display: "text-type-display hyphens-none",
    h1: "text-type-h1 hyphens-none",
    h2: "text-type-h2 hyphens-none",
    body: "text-type-body text-pretty",
    "body-sm": "text-type-body-sm text-pretty",
    label: "text-type-label",
    caption: "text-type-caption",
    micro: "text-type-micro",
    mono: "text-type-mono font-mono tabular-nums",
};

const Text = ({
    variant = "body",
    truncate = false,
    className,
    children,
    ...props
}: TextProps) => {
    return (
        <span
            className={cn(
                variantClasses[variant],
                truncate && "truncate",
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export default Text;