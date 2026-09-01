import { cn } from "@/lib/cn";

interface ButtonProps {
    children: React.ReactNode;
    handleClick: () => void;
    variant: "primary" | "secondary" | "tertiary"
    disabled?: boolean
    className?: string
}

console.log(
    cn(
        "bg-red-200 text-red-400",
        "bg-accent-deep text-accent-tint text-type-micro"
    )
)

const variantClasses = {
    //Filled Button
    primary: "bg-red-200 text-red-400",
    //Outline Button
    secondary: "bg-transparent text-red-400 border border-red-400",
    //Default Gray Button
    tertiary: "bg-transparent text-int-2 border border-lines-control",
}

const Button = ({ handleClick, children, disabled, variant, className }: ButtonProps) => {

    return (
        <button
            type="button"
            className={`cursor-pointer text-center px-2 text-type-body rounded-md + ${cn(variantClasses[variant], className)}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
