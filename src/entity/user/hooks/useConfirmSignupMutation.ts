import { useMutation } from "@tanstack/react-query"
import { api } from "../../../shared/api"

type Options = {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export const useConfirmSignupMutation = (options?: Options) => {
  return useMutation({
    mutationKey: ['confirmSignup'],
    mutationFn: async ({ email, confirmationCode }: { email: string, confirmationCode: string }) => api.post('/api/auth/confirm-signup', { email, confirmationCode }),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}