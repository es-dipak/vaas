export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type Status = 'active' | 'inactive' | 'pending' | 'archived';

export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
