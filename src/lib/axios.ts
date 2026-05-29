import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION

const normalizedBaseUrl = API_VERSION
  ? `${BASE_URL.replace(/\/$/, '')}/api/${API_VERSION}`
  : `${BASE_URL.replace(/\/$/, '')}/api`

export const apiClient = axios.create({
  baseURL: normalizedBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// ── Request interceptor ──────────────────────────────────────────────────────
// Attach the access token (stored in localStorage or a cookie) to every request.
apiClient.interceptors.request.use(
  (config) => {
    // Adjust the key name to match your auth implementation.
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('access_token')
        : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// ── Response interceptor ─────────────────────────────────────────────────────
// Normalise error shape so callers always see `error.message`.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message: string =
      error.response?.data?.message ??
      error.response?.data?.detail ??
      error.message ??
      'An unexpected error occurred'

    // You can also handle 401 (token refresh / redirect) here.
    return Promise.reject(new Error(message))
  },
)
