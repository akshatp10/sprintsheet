import React from 'react'

interface CircleLayoutProps {
    children: React.ReactNode
    variant: "purple" | "blue" | "amber" | "rose" | "chip"
    isSideBar?: boolean
    overlap?: boolean
}

const variantClasses = {
    purple: "bg-identity-avatar-purple text-identity-avatar-text",
    blue: "bg-identity-avatar-blue text-identity-avatar-text",
    amber: "bg-identity-avatar-amber text-identity-avatar-text",
    rose: "bg-identity-avatar-rose text-identity-avatar-text",
    chip: "bg-identity-overflow-chip text-identity-overflow-text text-type-mono",
};

const CircleLayout = ({ children, variant, isSideBar, overlap = false }: CircleLayoutProps) => {

    return (
        <div className={`rounded-full flex items-center justify-center 
        ${variantClasses[variant]} 
        ${isSideBar ? "w-8 h-8 text-type-body" : "w-6 h-6 text-type-body-sm"} 
        ${overlap ? "-ml-1.5 border border-white" : ""}`}
        >
            {children}
        </div>
    )
}

export default CircleLayout
