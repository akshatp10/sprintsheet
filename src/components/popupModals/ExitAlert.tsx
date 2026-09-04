import Button from "../button/Button";
import Text from "../common/Text";
import PopupModal from "./PopupModal";

interface ExitAlertProps {
    onClose: () => void;
    exitPopup: () => void;
    alertLabel: string;
    alertContent: string;
    acceptText?: string;
    rejectText?: string;
}

const ExitAlert = ({
    onClose,
    exitPopup,
    alertContent,
    alertLabel,
    acceptText = "Yes",
    rejectText = "No",
}: ExitAlertProps) => {

    return (
        <PopupModal onClose={onClose} label={alertLabel} className="min-h-0 max-w-md pb-4">
            <div className="flex flex-col gap-6">
                <Text variant="body" className="text-ink-2">
                    {alertContent}
                </Text>
                <div className="flex justify-center gap-2">
                    <Button type="button" variant="tertiary" handleClick={onClose}>
                        {rejectText}
                    </Button>
                    <Button type="button" variant="secondary" handleClick={exitPopup}>
                        {acceptText}
                    </Button>
                </div>

            </div>
        </PopupModal>
    );
};

export default ExitAlert;