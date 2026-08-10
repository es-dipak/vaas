export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  appName: (import.meta.env.VITE_APP_NAME as string) ?? 'VaaS',
  appVersion: (import.meta.env.VITE_APP_VERSION as string) ?? '1.0.0',
  isDevelopment: import.meta.env.VITE_ENV === 'development',
  isProduction: import.meta.env.VITE_ENV === 'production',
} as const;
