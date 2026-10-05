import React, { useState } from 'react';

import ExitAlert from '../popupModals/ExitAlert';
import DrawerHeader from './DrawerHeader';
import { cn } from '@/lib/cn';

export type DrawerSide = 'left' | 'right';

interface DrawerProps {
  /** Content rendered inside the drawer below the header, typically containing the drawer's main form or interactive content. */
  children: React.ReactNode;

  /** Callback invoked when the drawer is closed directly or when the user confirms discarding changes through the exit alert. */
  onClose: () => void;

  /** Text displayed in the drawer header to identify the drawer's current content or purpose. Defaults to an empty string. */
  label?: React.ReactNode;

  /**
   * Controls which side of the viewport the drawer slides in from:
   *
   * - `left` — positions the drawer against the left edge of the viewport.
   * - `right` — positions the drawer against the right edge of the viewport.
   *
   * Defaults to `right`.
   */
  side?: DrawerSide;

  /** Controls the drawer's width using any valid CSS width value. Defaults to `50dvw`. */
  width?: string;

  /** Enables a confirmation alert before closing, preventing accidental loss of unsaved changes. Defaults to `false`. */
  alert?: boolean;

  /** Text displayed as the title of the exit confirmation alert when `alert` is enabled. Defaults to `Discard Changes?`. */
  alertLabel?: string;

  /** Descriptive message displayed in the exit confirmation alert to explain the consequence of closing the drawer. */
  alertContent?: string;

  /** Additional CSS classes applied to the drawer container, allowing its layout and visual styling to be customized. */
  className?: string;
}

const Drawer = ({
  children,
  onClose,
  label = '',
  side = 'right',
  width = '50dvw',
  alert = false,
  alertLabel = 'Discard Changes?',
  alertContent = 'All your progress will be lost. Are you sure you want to discard your changes?',
  className = '',
}: DrawerProps) => {
  const [showExitAlert, setShowExitAlert] = useState(false);

  const handleClose = () => {
    if (alert) {
      setShowExitAlert(true);
      return;
    }

    onClose();
  };

  const sideClass = side === 'right' ? 'right-0' : 'left-0';

  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 bg-surface-sunken/60" onClick={handleClose} />

      {/* Slide-over */}
      <div
        className={cn(
          `absolute top-0 ${sideClass} h-dvh bg-surface-sunken flex flex-col min-h-0 shadow-2xl`,
          className,
        )}
        style={{ width }}
      >
        <DrawerHeader label={label} onClose={handleClose} />

        <div className="flex flex-1 min-h-0 flex-col">{children}</div>

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
