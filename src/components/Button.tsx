import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'neutral';
export type ButtonStyle = 'filled' | 'outline' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  buttonStyle?: ButtonStyle;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', buttonStyle = 'filled', className = '', children, ...props }, ref) => {
    const buttonClass = `btn-${variant}-${buttonStyle} ${className}`.trim();

    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
