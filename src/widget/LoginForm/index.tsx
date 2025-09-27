import { useState } from 'react'
import { EmailInput } from '../../shared/components/input/EmailInput'
import { PasswordInput } from '../../shared/components/input/PasswordInput'
import { Link } from 'react-router-dom'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: заменить на реальную логику авторизации
    console.log('Login attempt:', { email, password })

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="w-full max-w-[420px]">
      <div className="bg-card border border-border rounded-[var(--radius-lg)] px-6 py-8 sm:px-8 sm:py-10 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your email below to login</p>
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 inline-flex items-center justify-center rounded-[var(--radius-lg)] border border-border bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 text-sm font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-foreground underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}
