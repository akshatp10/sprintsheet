import Button from "../button/Button";
import Text from "../common/Text";
import PopupModal from "./PopupModal";

interface ExitAlertProps {
    /** Closes the confirmation modal without performing the exit action, typically used when the user rejects or dismisses the alert. */
    onClose: () => void;

    /** Performs the confirmed exit action, such as closing the parent drawer or discarding the current changes. */
    exitPopup: () => void;

    /** Heading displayed at the top of the confirmation modal to describe the action being confirmed. */
    alertLabel: string;

    /** Main explanatory message displayed in the modal, informing the user what will happen if they confirm the exit. */
    alertContent: string;

    /** Text displayed on the confirmation button that performs the exit action. Defaults to `Yes`. */
    acceptText?: string;

    /** Text displayed on the rejection button that closes the alert without exiting. Defaults to `No`. */
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
                    <Button type="button" variant="tertiary" onClick={onClose} autoFocus>
                        {rejectText}
                    </Button>
                    <Button type="button" variant="secondary" onClick={exitPopup}>
                        {acceptText}
                    </Button>
                </div>

            </div>
        </PopupModal>
    );
};

export default ExitAlert;