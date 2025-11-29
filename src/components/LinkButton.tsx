import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ButtonVariant, ButtonStyle } from './Button';

export interface LinkButtonProps extends Omit<LinkProps, 'className'> {
  variant?: ButtonVariant;
  buttonStyle?: ButtonStyle;
  className?: string;
  children: React.ReactNode;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = 'primary',
  buttonStyle = 'filled',
  className = '',
  children,
  ...props
}) => {
  const buttonClass = `btn-${variant}-${buttonStyle} ${className}`.trim();

  return (
    <Link className={buttonClass} {...props}>
      {children}
    </Link>
  );
};
