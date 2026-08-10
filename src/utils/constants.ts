export const APP_NAME = 'VaaS';

export const SEVERITY_COLORS: Record<string, string> = {
  critical: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
  high: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30',
  medium: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
  low: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
  info: 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-700',
};

export const SEVERITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
  info: 4,
};

export const STATUS_COLORS: Record<string, string> = {
  active: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
  inactive: 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-700',
  pending: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
  archived: 'text-slate-400 bg-slate-100 dark:text-slate-500 dark:bg-slate-800',
};

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm';

export const DEBOUNCE_DELAY = 300;
