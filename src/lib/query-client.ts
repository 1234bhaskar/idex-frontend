import { QueryClient } from '@tanstack/react-query'

// Single shared QueryClient for the whole app.
// Created once and re-used via the ReactQueryProvider.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep data fresh for 60 s before it's considered stale.
      staleTime: 60 * 1000,
      // Keep unused data in cache for 5 min (default is 5 min, stated for clarity).
      gcTime: 5 * 60 * 1000,
      // Retry once on failure before surfacing the error.
      retry: 1,
      // Disable automatic background refetch when the window regains focus
      // (set to true if your data changes frequently).
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Show errors from mutations immediately.
      throwOnError: false,
    },
  },
})
