import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const validPage = currentPage > totalPages ? 1 : currentPage;

  const currentData = useMemo(() => {
    const begin = (validPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }, [data, validPage, itemsPerPage]);

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, totalPages));
  };

  return { next, prev, jump, currentData, currentPage: validPage, totalPages, setCurrentPage };
}
