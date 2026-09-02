import { cn } from '@/lib/cn';
import React from 'react'

interface CircleLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    variant?: "purple" | "blue" | "amber" | "rose" | "chip" | "default"
    isSideBar?: boolean
}

const variantClasses = {
    purple: "bg-identity-avatar-purple text-identity-avatar-text",
    blue: "bg-identity-avatar-blue text-identity-avatar-text",
    amber: "bg-identity-avatar-amber text-identity-avatar-text",
    rose: "bg-identity-avatar-rose text-identity-avatar-text",
    chip: "bg-identity-overflow-chip text-identity-overflow-text font-mono text-type-mono",
    default: "bg-surface border border-ink-fades-ghost-rows",
};

const CircleLayout = ({ children, variant = "default", isSideBar, ...props }: CircleLayoutProps) => {

    return (
        <div className={cn("rounded-full flex shrink-0 items-center justify-center tabular-nums",
            variantClasses[variant],
            isSideBar ? "w-8 h-8 text-type-body" : "w-6 h-6 text-type-body-sm")}
            {...props}
        >
            {children}
        </div>
    )
}

export default CircleLayout
