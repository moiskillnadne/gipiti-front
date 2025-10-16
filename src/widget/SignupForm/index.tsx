import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../entity/user'
import { SignupFormStep } from './SignupFormStep'
import { ConfirmSignupFormStep } from './ConfirmSignupFormStep'

export const SignupForm = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<"signup" | "confirmSignup">("signup")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutate: login } = useLoginMutation({
    onSuccess() {
      setTimeout(() => {
        return navigate('/protected/profile')
      }, 100)
    },
  })
  

  const handleSignupSuccess = useCallback(() => {
    setStep("confirmSignup")
  }, [setStep])

  const handleConfirmSignupSuccess = useCallback(() => {
    login({ email, password })
  }, [email, login, password])


  return (
    <div className="w-full max-w-[420px]">
      {step === "signup" ? (
        <SignupFormStep onSignupSuccess={handleSignupSuccess} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
      ) : (
        <ConfirmSignupFormStep email={email} setStep={setStep} onConfirmSignupSuccess={handleConfirmSignupSuccess} />
      )}
    </div>
  )
}
