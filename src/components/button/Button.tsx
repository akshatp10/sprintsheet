import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    handleClick: () => void;
    variant: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
    className?: string;
}

const variantClasses = {
    //Filled Button
    primary: "bg-accent text-accent-deep",
    //Outline Button
    secondary: "bg-transparent text-accent-deep border border-accent",
    //Default Gray Button
    tertiary: "bg-transparent text-ink-2 border border-lines-control",
}

const Button = ({ handleClick, children, disabled, variant, className, ...props }: ButtonProps) => {

    return (
        <button
            type="button"
            className={cn("cursor-pointer text-center py-1 px-2 text-type-body rounded-md", variantClasses[variant], className)}
            onClick={handleClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
