import { forwardRef, useId } from "react";

export interface BaseInputProps {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  id?: string;
  minLength?: number;
  maxLength?: number;
  hint?: string;
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      value,
      setValue,
      label,
      type = "text",
      disabled = false,
      placeholder,
      autoComplete,
      required = false,
      id,
      minLength,
      maxLength,
      hint,
    },
    ref
  ) => {

    const generatedId = useId();
    // Generate a unique ID if not provided and label exists
    const inputId = id || (label ? `input-${generatedId}` : undefined);

    return (
      <div>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          className="w-full h-10 px-3 rounded-[var(--radius-lg)] border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
        {hint && (
          <p className="text-xs text-muted-foreground mt-1">
            {hint}
          </p>
        )}
      </div>
    );
  }
);