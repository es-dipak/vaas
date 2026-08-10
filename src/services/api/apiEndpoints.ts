export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },

  // Assets
  ASSETS: {
    LIST: '/assets',
    CREATE: '/assets',
    GET: (id: string) => `/assets/${id}`,
    UPDATE: (id: string) => `/assets/${id}`,
    DELETE: (id: string) => `/assets/${id}`,
  },

  // Assessments
  ASSESSMENTS: {
    LIST: '/assessments',
    CREATE: '/assessments',
    GET: (id: string) => `/assessments/${id}`,
    UPDATE: (id: string) => `/assessments/${id}`,
    DELETE: (id: string) => `/assessments/${id}`,
    START: (id: string) => `/assessments/${id}/start`,
    STOP: (id: string) => `/assessments/${id}/stop`,
  },

  // Findings
  FINDINGS: {
    LIST: '/findings',
    CREATE: '/findings',
    GET: (id: string) => `/findings/${id}`,
    UPDATE: (id: string) => `/findings/${id}`,
    DELETE: (id: string) => `/findings/${id}`,
  },

  // Remediation
  REMEDIATION: {
    LIST: '/remediation',
    GET: (id: string) => `/remediation/${id}`,
    UPDATE: (id: string) => `/remediation/${id}`,
  },

  // Reports
  REPORTS: {
    LIST: '/reports',
    CREATE: '/reports',
    GET: (id: string) => `/reports/${id}`,
    DOWNLOAD: (id: string) => `/reports/${id}/download`,
  },

  // Users
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // Organization
  ORGANIZATION: {
    GET: '/organization',
    UPDATE: '/organization',
  },

  // Dashboard
  DASHBOARD: {
    SUMMARY: '/dashboard/summary',
    STATS: '/dashboard/stats',
  },
} as const;
