import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    handleClick?: () => void;
    variant: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
    className?: string;
}

const variantClasses = {
    //Filled Button
    primary: "bg-accent text-accent-deep border border-transparent",
    //Outline Button
    secondary: "bg-transparent text-accent-deep border border-accent shadow-xs shadow-accent",
    //Default Gray Button
    tertiary: "bg-transparent text-ink-2 border border-lines-control",
}

const Button = ({ handleClick, children, disabled, variant, className, type = "button", ...props }: ButtonProps) => {

    return (
        <button
            className={cn("cursor-pointer text-center py-0.5 px-2 rounded-md font-medium text-type-body-sm", variantClasses[variant], className)}
            onClick={handleClick}
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
