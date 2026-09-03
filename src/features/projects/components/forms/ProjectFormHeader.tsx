import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import { X } from "lucide-react";

interface ProjectFormHeaderProps {
    onClose: () => void;
}

const ProjectFormHeader = ({
    onClose,
}: ProjectFormHeaderProps) => {
    return (
        <div className="flex items-center justify-between py-4">
            <Text variant="h1">
                New Project
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

export default ProjectFormHeader;