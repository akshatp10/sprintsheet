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
    primary: "bg-red-200 text-red-400",
    //Outline Button
    secondary: "bg-transparent text-red-400 border border-red-400",
    //Default Gray Button
    tertiary: "bg-transparent text-int-2 border border-lines-control",
}

const Button = ({ handleClick, children, disabled, variant, className, ...props }: ButtonProps) => {

    return (
        <button
            type="button"
            className={`cursor-pointer text-center px-2 text-type-body rounded-md + ${cn(variantClasses[variant], className)}`}
            onClick={handleClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
