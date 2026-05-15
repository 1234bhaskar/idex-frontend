'use client'

/**
 * ReactQueryProvider
 *
 * Must be a Client Component because QueryClientProvider uses React context.
 * Import this into the root layout to make React Query available everywhere.
 *
 * The ReactQueryDevtools panel is included here so it is tree-shaken out in
 * production builds automatically.
 */
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/query-client'

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
