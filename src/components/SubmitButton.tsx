import React from 'react';

interface SubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  disabled = false,
  children,
  className = '',
  variant = 'primary',
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`submit-button ${variant} ${isLoading ? 'loading' : ''} ${className}`}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
    >
      {isLoading ? (
        <>
          <span className="spinner" aria-hidden="true"></span>
          <span className="button-text">Przetwarzanie...</span>
        </>
      ) : (
        <span className="button-text">{children}</span>
      )}
    </button>
  );
};
