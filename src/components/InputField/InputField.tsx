import React from 'react';
import clsx from 'clsx';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const variantClasses = {
  filled: 'bg-gray-100 border border-gray-300',
  outlined: 'border border-gray-400',
  ghost: 'border border-transparent',
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
}) => {
  const inputStyles = clsx(
    'w-full rounded-md focus:outline-none focus:ring-2',
    sizeClasses[size],
    variantClasses[variant],
    {
      'border-red-500 ring-red-200': invalid,
      'bg-gray-200 cursor-not-allowed': disabled,
    }
  );

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid  ? "true" : "false"}
        className={inputStyles}
      />
      {invalid && errorMessage ? (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      ) : (
        helperText && <span className="text-gray-500 text-xs">{helperText}</span>
      )}
    </div>
  );
};
