import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import { X } from "lucide-react";

interface SlideOverHeaderProps {
    onClose: () => void;
    label?: string;
}

const SlideOverHeader = ({
    onClose,
    label = "",
}: SlideOverHeaderProps) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-lines-hairline">
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

export default SlideOverHeader;