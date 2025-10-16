import { useMutation } from "@tanstack/react-query"
import { api } from "../../../shared/api"


type Options = {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export const useSignupMutation = (options?: Options) => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async ({ email, password }: { email: string, password: string }) => api.post('/api/auth/signup', { email, password }),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}
