import React from 'react';
import type { UseFormRegister, FieldError, RegisterOptions } from 'react-hook-form';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  min?: string;
  step?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation?: RegisterOptions<any>;
  error?: FieldError;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  min,
  step,
  register,
  validation,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        step={step}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...register(id, validation)}
      />
      {error && (
        <div id={`${id}-error`} className="error-text" role="alert">
          {error.message}
        </div>
      )}
    </div>
  );
};
