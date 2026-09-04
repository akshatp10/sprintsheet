import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import { X } from "lucide-react";

interface PopupHeaderProps {
    onClose: () => void;
    label?: string
}

const PopupHeader = ({
    onClose,
    label = ""
}: PopupHeaderProps) => {
    return (
        <div className="flex items-center justify-between py-4">
            <Text variant="h1">
                {label}
            </Text>

            <Button
                type="button"
                handleClick={onClose}
                className="border-none"
                variant="tertiary"
            >
                <X strokeWidth={1.5} />
            </Button>
        </div>
    );
};

export default PopupHeader;