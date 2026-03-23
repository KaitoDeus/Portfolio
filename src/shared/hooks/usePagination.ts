import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  // Adjust current page if it's out of bounds (e.g., after data filtering)
  // This is a standard React pattern for adjusting state based on props during render
  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }, [data, currentPage, itemsPerPage]);

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, totalPages));
  };

  return { next, prev, jump, currentData, currentPage, totalPages, setCurrentPage };
}
