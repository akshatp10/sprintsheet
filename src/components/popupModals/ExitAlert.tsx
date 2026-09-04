import Button from "../button/Button";

import Text from "../common/Text";

import PopupModal from "./PopupModal";

interface ExitAlertProps {
    onClose: () => void;
    exitPopup: () => void;
    alertLabel: string;
    alertContent: string;
}

const ExitAlert = ({
    onClose,
    exitPopup,
    alertContent,
    alertLabel,
}: ExitAlertProps) => {

    return (
        <PopupModal onClose={onClose} label={alertLabel} className="min-h-0 max-w-md pb-4">
            <div className="flex flex-col gap-6">
                <Text variant="body" className="text-ink-2">
                    {alertContent}
                </Text>
                <div className="flex justify-center gap-2">
                    <Button type="button" variant="tertiary" handleClick={onClose}>
                        No
                    </Button>
                    <Button type="button" variant="secondary" handleClick={exitPopup}>
                        Yes
                    </Button>
                </div>

            </div>
        </PopupModal>
    );
};

export default ExitAlert;