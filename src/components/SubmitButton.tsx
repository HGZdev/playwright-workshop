import React from 'react';
import { Button, ButtonProps } from './Button';

interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  isLoading?: boolean;
  loadingText?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  loadingText = 'Przetwarzanie...',
  disabled = false,
  children,
  variant = 'primary',
  buttonStyle = 'filled',
  className = '',
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      variant={variant}
      buttonStyle={buttonStyle}
      className={`submit-button ${isLoading ? 'loading' : ''} ${className}`.trim()}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner" aria-hidden="true"></span>
          <span className="button-text">{loadingText}</span>
        </>
      ) : (
        <span className="button-text">{children}</span>
      )}
    </Button>
  );
};
