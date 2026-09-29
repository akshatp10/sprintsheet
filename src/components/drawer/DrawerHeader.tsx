import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import { X } from "lucide-react";

interface DrawerHeaderProps {
    /** Callback triggered when the user clicks the close (`X`) button, allowing the parent drawer to handle closing or exit confirmation. */
    onClose: () => void;

    /** Text displayed as the drawer header title, identifying the content or purpose of the drawer. Defaults to an empty string. */
    label?: React.ReactNode;
}

const DrawerHeader = ({
    onClose,
    label = "",
}: DrawerHeaderProps) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-lines-hairline">
            <Text variant="h1">
                {label}
            </Text>

            <Button
                type="button"
                onClick={onClose}
                className="border-none"
                variant="tertiary"
            >
                <X strokeWidth={1.5} />
            </Button>
        </div>
    );
};

export default DrawerHeader;