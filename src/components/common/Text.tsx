import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type TextVariant =
    | "display"
    | "h1"
    | "h2"
    | "body"
    | "body-sm"
    | "label"
    | "caption"
    | "micro"
    | "mono";

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

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
    /**
     * Typography variant:
     *
     * - `display` — 1.375rem (22px) / 1.2 (26.4px) / 500 / -0.01em
     * - `h1` — 1.125rem (18px) / 1.25 (22.5px) / 500 / -0.01em
     * - `h2` — 0.9375rem (15px) / 1.3 (19.5px) / 500
     * - `body` — 0.8125rem (13px) / 1.45 (18.85px) / 400
     * - `body-sm` — 0.78125rem (12.5px) / 1.6 (20px) / 400
     * - `label` — 0.75rem (12px) / 1.4 (16.8px) / 400
     * - `caption` — 0.6875rem (11px) / 1.35 (14.85px) / 400
     * - `micro` — 0.625rem (10px) / 1.2 (12px) / 500 / 0.06em
     * - `mono` — 0.8125rem (13px) / 1.4 (18.2px) / 400 / monospace
     *
     * Format: size / line-height / weight / letter-spacing
     */
    variant?: TextVariant;

    /** HTML element used to render the text. Defaults to `p`. */
    as?: "p" | "span";

    /**
 * Truncates overflowing text after the specified number of lines.
 * When omitted, text is not truncated.
 */
    maxLines?: number;
}

const Text = ({
    variant = "body",
    as = "p",
    maxLines,
    className,
    children,
    ...props
}: TextProps) => {
    const Component = as;

    return (
        <Component
            className={cn(
                variantClasses[variant],
                !!maxLines && "overflow-hidden",
                className,
            )}
            style={
                !!maxLines
                    ? {
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: maxLines,
                    }
                    : undefined
            }
            {...props}
        >
            {children}
        </Component>
    );
};
export default Text;