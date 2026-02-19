import { AppRouter } from '@core/router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './core/components/shared/ErrorBoundary'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}