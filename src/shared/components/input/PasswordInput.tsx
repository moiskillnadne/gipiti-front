import { useCallback, useEffect, useState } from "react";

import { BaseInput, type BaseInputProps } from "./BaseInput";

const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /\d/;
const SPECIAL_CHAR_REGEX = /[^A-Za-z0-9]/;

export interface PasswordInputProps extends Omit<BaseInputProps, "type"> {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSpecialChar?: boolean;
  requiredMessage?: string;
  invalidLengthMessage?: string;
  missingUppercaseMessage?: string;
  missingLowercaseMessage?: string;
  missingNumberMessage?: string;
  missingSpecialCharMessage?: string;
}

export const PasswordInput = ({
  value,
  setValue,
  hint,
  required = false,
  autoComplete = "current-password",
  placeholder = "Enter your password",
  minLength = 8,
  requireUppercase = false,
  requireLowercase = false,
  requireNumber = false,
  requireSpecialChar = false,
  requiredMessage = "Password is required",
  invalidLengthMessage = `Password must be at least ${minLength} characters`,
  missingUppercaseMessage = "Add at least one uppercase letter",
  missingLowercaseMessage = "Add at least one lowercase letter",
  missingNumberMessage = "Add at least one number",
  missingSpecialCharMessage = "Add at least one special character",
  ...rest
}: PasswordInputProps) => {
  const computeError = useCallback(
    (currentValue: string): string | null => {
      if (!currentValue.trim()) {
        return required ? requiredMessage : null;
      }

      if (currentValue.length < minLength) {
        return invalidLengthMessage;
      }

      if (requireUppercase && !UPPERCASE_REGEX.test(currentValue)) {
        return missingUppercaseMessage;
      }

      if (requireLowercase && !LOWERCASE_REGEX.test(currentValue)) {
        return missingLowercaseMessage;
      }

      if (requireNumber && !NUMBER_REGEX.test(currentValue)) {
        return missingNumberMessage;
      }

      if (requireSpecialChar && !SPECIAL_CHAR_REGEX.test(currentValue)) {
        return missingSpecialCharMessage;
      }

      return null;
    },
    [
      invalidLengthMessage,
      minLength,
      missingLowercaseMessage,
      missingNumberMessage,
      missingSpecialCharMessage,
      missingUppercaseMessage,
      requireLowercase,
      requireNumber,
      requireSpecialChar,
      requireUppercase,
      required,
      requiredMessage,
    ]
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
        type="password"
        hint={!error ? hint : undefined}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        placeholder={placeholder}
        {...rest}
      />
      {error && (
        <p className="text-xs text-destructive mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};