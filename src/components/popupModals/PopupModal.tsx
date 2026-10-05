import { cn } from '@/lib/cn';
import React, { useState, useImperativeHandle, useEffect, useCallback } from 'react';

import PopupHeader from './PopupHeader';
import ExitAlert from './ExitAlert';

interface PopupModalProps {
  /** Additional CSS classes applied to the modal content container, allowing its size, spacing, layout, or other visual styles to be customized. */
  className?: string;

  /** Main content rendered inside the popup below the header. */
  children: React.ReactNode;

  /** Text displayed in the popup header to identify the popup's content or purpose. Defaults to an empty string. */
  label?: string;

  /** Callback invoked when the popup is closed directly or when the user confirms the exit through the confirmation alert. */
  onClose: () => void;

  /** Enables an exit confirmation before closing the popup, preventing accidental loss of unsaved changes. Defaults to `false`. */
  alert?: boolean;

  /** Heading displayed in the exit confirmation alert when `alert` is enabled. Defaults to `Discard Changes?`. */
  alertLabel?: string;

  /** Explanatory message displayed in the exit confirmation alert, describing what will happen if the user confirms the exit. */
  alertContent?: string;

  /** Ref exposing the popup's imperative close handler through `requestClose`, allowing a parent component to trigger the same close/confirmation behavior programmatically. */
  ref?: React.Ref<PopupModalHandle>;
}

export interface PopupModalHandle {
  /** Triggers the popup's close behavior, including the exit confirmation when `alert` is enabled. */
  requestClose: () => void;
}

const PopupModal = ({
  className,
  children,
  onClose,
  label = '',
  alert = false,
  alertContent = 'All your progress will be lost. Are you sure you want to discard your changes?',
  alertLabel = 'Discard Changes?',
  ref,
}: PopupModalProps) => {
  const [exitConfirm, setExitConfirm] = useState(false);

  const handleClose = useCallback(() => {
    if (alert) {
      setExitConfirm(true);
    } else {
      onClose();
    }
  }, [alert, onClose]);

  useImperativeHandle(ref, () => ({ requestClose: handleClose }));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
      <div
        className={cn(
          'relative flex w-full max-w-2xl min-h-[30dvh] flex-col rounded-xl bg-surface px-6 shadow-xl',
          className,
        )}
      >
        <PopupHeader label={label} onClose={handleClose} />
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
