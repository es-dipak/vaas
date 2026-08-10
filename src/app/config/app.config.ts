import { env } from '@/config/environment';

export const appConfig = {
  name: env.appName,
  version: env.appVersion,
  description: 'Vulnerability Assessment as a Service',
  company: 'VaaS Security',

  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },

  dateFormat: {
    display: 'MMM dd, yyyy',
    input: 'yyyy-MM-dd',
    datetime: 'MMM dd, yyyy HH:mm',
    iso: "yyyy-MM-dd'T'HH:mm:ss",
  },

  severity: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    INFO: 'info',
  },
} as const;
