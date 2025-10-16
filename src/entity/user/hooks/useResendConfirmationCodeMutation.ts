import { useMutation } from "@tanstack/react-query"
import { api } from "../../../shared/api"

type Options = {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export const useResendConfirmationCodeMutation = (options?: Options) => {
  return useMutation({
    mutationKey: ['resendConfirmationCode'],
    mutationFn: async ({ email }: { email: string }) => api.post('/api/auth/resend-confirmation-code', { email }),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}