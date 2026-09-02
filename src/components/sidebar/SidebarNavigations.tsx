import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";
import Text from "../common/Text";

interface SidebarNavigationsProps {
    label: string;
    to: string;
    icon?: React.ReactNode;
}

const SidebarNavigations = ({
    label,
    to,
    icon,
}: SidebarNavigationsProps) => {

    return (
        <NavLink
            to={to}
            end
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md border border-transparent",
                    isActive
                        ? "bg-accent-tint text-accent-deep border border-accent"
                        : "text-ink-2 hover:bg-surface-raised hover:border hover:border-lines-control"
                )
            }
        >
            {icon}

            <Text variant="h2">
                {label}
            </Text>
        </NavLink>
    );
};

export default SidebarNavigations;