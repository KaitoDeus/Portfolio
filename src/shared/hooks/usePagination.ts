import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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

  useMemo(() => {
    if (currentPage > Math.max(1, Math.ceil(data.length / itemsPerPage))) {
      setCurrentPage(1);
    }
  }, [data.length, currentPage, itemsPerPage]);

  return { next, prev, jump, currentData, currentPage, totalPages, setCurrentPage };
}
