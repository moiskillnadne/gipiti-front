import { useCallback, useEffect, useState } from "react";

import { BaseInput, type BaseInputProps } from "./BaseInput";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface EmailInputProps extends Omit<BaseInputProps, "type"> {
  invalidEmailMessage?: string;
  requiredMessage?: string;
}

export const EmailInput = ({
  value,
  setValue,
  hint,
  required = false,
  autoComplete = "email",
  invalidEmailMessage = "Invalid email address",
  requiredMessage = "Email is required",
  placeholder = "name@example.com",
  ...rest
}: EmailInputProps) => {
  const computeError = useCallback(
    (currentValue: string): string | null => {
      const trimmed = currentValue.trim();

      if (!trimmed) {
        return required ? requiredMessage : null;
      }

      return EMAIL_REGEX.test(trimmed) ? null : invalidEmailMessage;
    },
    [invalidEmailMessage, required, requiredMessage]
  );

  const [touched, setTouched] = useState(() => Boolean(value));
  const [error, setError] = useState<string | null>(() =>
    value ? computeError(value) : null
  );

  useEffect(() => {
    if (value && !touched) {
      setTouched(true);
    }

    if (!touched && value === "") {
      return;
    }

    const nextError = computeError(value);

    setError((prev) => (prev === nextError ? prev : nextError));
  }, [value, touched, computeError]);

  const handleChange = (nextValue: string) => {
    if (!touched) {
      setTouched(true);
    }

    setValue(nextValue);

    setError(computeError(nextValue));
  };

  return (
    <div>
      <BaseInput
        value={value}
        setValue={handleChange}
        type="email"
        hint={!error ? hint : undefined}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...rest}
      />
      <div className="min-h-[1.25rem] mt-1">
        {error && (
          <p className="text-xs text-destructive mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};