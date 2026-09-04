import { cn } from "@/lib/cn";
import React, { useState } from "react";

import PopupHeader from "./PopupHeader";
import ExitAlert from "./ExitAlert";

interface PopupModalProps {
    className?: string;
    children: React.ReactNode;
    label?: string;
    onClose: () => void;
    alert?: boolean;
    alertLabel?: string;
    alertContent?: string;
}

const PopupModal = ({
    className,
    children,
    onClose,
    label = "",
    alert = false,
    alertContent = "All your progress will be lost. Are you sure you want to discard your changes?",
    alertLabel = "Discard Changes?"
}: PopupModalProps) => {
    const [exitConfirm, setExitConfirm] = useState(false);

    const handleClose = () => {
        if (alert) {
            setExitConfirm(true);
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
            <div
                className={cn(
                    "flex w-full max-w-2xl min-h-[30dvh] flex-col rounded-xl bg-surface px-6 shadow-xl overflow-hidden",
                    className
                )}
            >
                <PopupHeader
                    label={label}
                    onClose={handleClose}
                />

                {children}
            </div>

            {exitConfirm && alert && (
                <ExitAlert
                    onClose={() => setExitConfirm(false)}
                    exitPopup={onClose}
                    alertLabel={alertLabel}
                    alertContent={alertContent}
                />
            )}
        </div>
    );
};

export default PopupModal;