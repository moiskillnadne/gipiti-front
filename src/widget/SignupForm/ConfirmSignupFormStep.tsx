import { useEffect, useState } from "react"
import { BaseInput } from "../../shared/components/input/BaseInput"
import { useConfirmSignupMutation } from "../../entity/user/hooks/useConfirmSignupMutation"
import { Link } from "react-router-dom"
import { useResendConfirmationCodeMutation } from "../../entity/user/hooks/useResendConfirmationCodeMutation"


type Props = {
  email: string
  onConfirmSignupSuccess?: () => void
}

export const ConfirmSignupFormStep = (props: Props) => {
  const [confirmationCode, setConfirmationCode] = useState('')

  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (resendCooldown <= 0) {
      return
    }

    const timerId = window.setInterval(() => {
      setResendCooldown((prev) => Math.max(prev - 1, 0))
    }, 1000)

    return () => {
      window.clearInterval(timerId)
    }
  }, [resendCooldown])

  const { mutate: confirmSignup, isPending } = useConfirmSignupMutation({
    onSuccess() {
      props.onConfirmSignupSuccess?.()
    },
  })

  const { mutate: resendConfirmationCode, isPending: isResendConfirmationCodePending } = useResendConfirmationCodeMutation({
    onSuccess() {
      setResendCooldown(60)
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    confirmSignup({ email: props.email, confirmationCode })
  }

  return (
    <div className="bg-card border border-border rounded-[var(--radius-lg)] px-6 py-8 sm:px-8 sm:py-10 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the confirmation code sent to your email: {props.email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <BaseInput
            value={confirmationCode}
            setValue={setConfirmationCode}
            label="Confirmation Code"
            required
            placeholder="123456"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-12 inline-flex items-center justify-center rounded-[var(--radius-lg)] border border-border bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 text-sm font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background disabled:opacity-50 disabled:pointer-events-none"
          >
            {isPending ? 'Confirming account...' : 'Confirm account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          {resendCooldown > 0 ? (
            <span className="text-sm text-muted-foreground cursor-not-allowed">
              {resendCooldown} seconds
            </span>
          ) : (
            <button type="button" disabled={isResendConfirmationCodePending} onClick={() => resendConfirmationCode({ email: props.email })} className="text-sm underline-offset-4 hover:cursor-pointer hover:underline">
              {isResendConfirmationCodePending ? 'Resending confirmation code...' : 'Resend confirmation code'}
            </button>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Do you want to change your email?{' '}
          <Link
            to="/signup"
            className="text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background"
          >
            Change email
          </Link>
        </div>
      </div>
  )
}