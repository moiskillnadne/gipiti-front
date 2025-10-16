import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

type RequestConfig = AxiosRequestConfig<any> & {
  retry?: boolean;
};

let onUnauthorizedCallback: (() => void) | null = null

export const setOnUnauthorizedCallback = (callback: () => void) => {
  onUnauthorizedCallback = callback
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true
})

api.defaults.headers.common['Content-Type'] = 'application/json';

api.interceptors.request.use((config) => {
  console.log('Making request to:', config.url, 'with credentials:', config.withCredentials)
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error?.config as RequestConfig;

    console.log('[Interceptor Response Error]', error.response?.status, config?.retry)

    if (error.response?.status === 401 && !config?.retry) {
      config.retry = true;

      try {
        console.log('[Interceptor Response Error] Unauthorized (401). Going to refresh token.')
        await api.post('/api/auth/refresh')

        console.log('[Interceptor Response Error] Token refreshed. Retrying request.')
        return api(config)
      } catch (refreshError) {
        console.log('[Interceptor Response Error] Error refreshing token. Returning error.')

        if(onUnauthorizedCallback) {
          onUnauthorizedCallback()
        }

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)