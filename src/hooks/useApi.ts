/**
 * src/hooks/useApi.ts
 *
 * Thin, typed wrappers around useQuery and useMutation that use the
 * shared apiClient (axios) as the fetcher.
 *
 * Usage:
 *   const { data } = useApiQuery(['users'], '/api/users')
 *   const mutation = useApiMutation<User, NewUser>('/api/users', 'POST')
 */
'use client'

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { apiClient } from '@/lib/axios'
import type { AxiosRequestConfig } from 'axios'

// ── Generic GET wrapper ──────────────────────────────────────────────────────

/**
 * @param queryKey  - React Query cache key (array)
 * @param url       - API endpoint (relative to baseURL)
 * @param config    - Optional AxiosRequestConfig (params, headers, etc.)
 * @param options   - Optional useQuery overrides
 */
export function useApiQuery<TData = unknown>(
  queryKey: unknown[],
  url: string,
  config?: AxiosRequestConfig,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TData>({
    queryKey,
    queryFn: async () => {
      const { data } = await apiClient.get<TData>(url, config)
      return data
    },
    ...options,
  })
}

// ── Generic mutation wrapper ─────────────────────────────────────────────────

/**
 * @param url     - API endpoint (relative to baseURL)
 * @param method  - HTTP verb (default: 'POST')
 * @param options - Optional useMutation overrides (onSuccess, onError, etc.)
 *
 * TData  – shape of the response body
 * TBody  – shape of the request body you pass to `mutate(body)`
 */
export function useApiMutation<TData = unknown, TBody = unknown>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: UseMutationOptions<TData, Error, TBody>,
) {
  const qc = useQueryClient()

  return useMutation<TData, Error, TBody>({
    mutationFn: async (body: TBody) => {
      const { data } = await apiClient.request<TData>({
        url,
        method,
        data: body,
      })
      return data
    },
    ...options,
    // Merge caller's onSuccess with any cache-invalidation logic you add here.
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
  })
}

export { useQueryClient }
