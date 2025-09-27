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
      <div className="flex flex-col gap-3">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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