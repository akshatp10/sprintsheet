import React, { useState } from "react";

import ExitAlert from "../popupModals/ExitAlert";
import DrawerHeader from "./DrawerHeader";

export type DrawerSide = "left" | "right";

interface DrawerProps {
    children: React.ReactNode;
    onClose: () => void;
    label?: string;
    side?: DrawerSide;
    width?: string;
    alert?: boolean;
    alertLabel?: string;
    alertContent?: string;
    className?: string;
}

const Drawer = ({
    children,
    onClose,
    label = "",
    side = "right",
    width = "50dvw",
    alert = false,
    alertLabel = "Discard Changes?",
    alertContent = "All your progress will be lost. Are you sure you want to discard your changes?",
    className = "",
}: DrawerProps) => {
    const [showExitAlert, setShowExitAlert] = useState(false);

    const handleClose = () => {
        if (alert) {
            setShowExitAlert(true);
            return;
        }

        onClose();
    };

    const sideClass = side === "right" ? "right-0" : "left-0";

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-surface/60" />

            {/* Slide-over */}
            <div
                className={`absolute top-0 ${sideClass} h-dvh bg-surface-sunken ${className}`}
                style={{ width }}
            >
                <DrawerHeader label={label} onClose={handleClose} />

                <div className="flex flex-1 flex-col">{children}</div>

                {showExitAlert && (
                    <ExitAlert
                        onClose={() => setShowExitAlert(false)}
                        exitPopup={onClose}
                        alertLabel={alertLabel}
                        alertContent={alertContent}
                    />
                )}
            </div>
        </div>
    );
};

export default Drawer;
