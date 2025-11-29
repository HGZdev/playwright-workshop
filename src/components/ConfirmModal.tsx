import React, { useEffect, useRef } from 'react';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonVariant?: 'primary' | 'secondary' | 'danger' | 'neutral';
  confirmButtonStyle?: 'filled' | 'outline';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Potwierdź',
  cancelText = 'Anuluj',
  onConfirm,
  onCancel,
  confirmButtonVariant = 'danger',
  confirmButtonStyle = 'filled',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the confirm button when modal opens
    confirmButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter' && document.activeElement?.tagName !== 'BUTTON') {
        onConfirm();
      } else if (e.key === 'Tab') {
        // Simple focus trap - keep focus within modal
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel} role="presentation" aria-hidden="true">
      <div
        ref={modalRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title">{title}</h2>
        <p id="modal-description">{message}</p>
        <div className="modal-actions">
          <Button
            ref={confirmButtonRef}
            type="button"
            variant={confirmButtonVariant}
            buttonStyle={confirmButtonStyle}
            onClick={onConfirm}
            aria-label={`${confirmText} - ${title}`}
          >
            {confirmText}
          </Button>
          <Button
            type="button"
            variant="neutral"
            buttonStyle="outline"
            onClick={onCancel}
            aria-label={`${cancelText} and close dialog`}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};
