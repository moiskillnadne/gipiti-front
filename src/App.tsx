import { Router } from './router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/utils/query-client'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}

export default App
