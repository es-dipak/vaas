import { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import type { PaginationParams } from '@/types/common.types';

interface UsePaginationReturn extends PaginationParams {
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

export function usePagination(initialPageSize = DEFAULT_PAGE_SIZE): UsePaginationReturn {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const reset = () => {
    setPage(1);
    setPageSize(initialPageSize);
  };

  const handleSetPageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  return {
    page,
    pageSize,
    setPage,
    setPageSize: handleSetPageSize,
    reset,
  };
}
