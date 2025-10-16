import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/api"

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await api.get('/api/profile')

      return response.data
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}