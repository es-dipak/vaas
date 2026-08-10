export const ROUTES = {
  // Public
  HOME: '/',

  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // App
  APP: {
    DASHBOARD: '/app/dashboard',
    ASSETS: '/app/assets',
    SCANS: '/app/scans',
    FINDINGS: '/app/findings',
    REPORTS: '/app/reports',
    REMEDIATION: '/app/remediation',
    MONITORING: '/app/monitoring',
    CLIENTS: '/app/clients',
    INTEGRATIONS: '/app/integrations',
    SETTINGS: '/app/settings',
  },

  // Error
  NOT_FOUND: '/404',
  ERROR: '/error',
} as const;
