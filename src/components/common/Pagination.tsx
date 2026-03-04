import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onJump: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onJump
}: PaginationProps) {
  const { t } = useLanguage();
  
  // Array of page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    // Show max 5 pages at a time
    const maxVisiblePages = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onJump(1)}
        disabled={currentPage === 1}
        aria-label={t('pagination.first')}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onPrev}
        disabled={currentPage === 1}
        aria-label={t('pagination.prev')}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex space-x-1">
        {getPageNumbers().map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onJump(page)}
            className="w-10"
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label={t('pagination.next')}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onJump(totalPages)}
        disabled={currentPage === totalPages}
        aria-label={t('pagination.last')}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
