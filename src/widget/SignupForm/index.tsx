import { useState } from "react";
import { Link } from "react-router-dom";
import { EmailInput } from "../../shared/components/input/EmailInput";
import { PasswordInput } from "../../shared/components/input/PasswordInput";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!termsAccepted) {
      setTermsError("Please accept the terms of use to continue.");
      return;
    }

    setTermsError(null);
    setIsLoading(true);

    // TODO: заменить на реальную логику регистрации
    console.log("Signup attempt:", { email, password });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-[420px]">
        <div className="bg-card border border-border rounded-[var(--radius-lg)] px-6 py-8 sm:px-8 sm:py-10 shadow-sm">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <EmailInput
              value={email}
              setValue={setEmail}
              label="Email"
              required
              placeholder="m@example.com"
            />

            <PasswordInput
              value={password}
              setValue={setPassword}
              label="Password"
              required
              placeholder="Password"
              minLength={8}
            />

            <div>
              <label className="flex items-start gap-3 text-sm leading-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) => {
                    setTermsAccepted(event.target.checked);
                    if (termsError) {
                      setTermsError(null);
                    }
                  }}
                  className="mt-1 h-4 w-4 rounded border border-border text-primary focus-visible:outline-none focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background"
                />
                <span>
                  I accept the{" "}
                  <a
                    href="/terms"
                    className="underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background"
                  >
                    Terms of Use
                  </a>
                </span>
              </label>
              <div className="min-h-[1.25rem] mt-1">
                {termsError && (
                  <p className="text-xs text-destructive" role="alert">
                    {termsError}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 inline-flex items-center justify-center rounded-[var(--radius-lg)] border border-border bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 text-sm font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-foreground underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background"
            >
              Sign in
            </Link>
          </div>
         </div>
       </div>
  )
}