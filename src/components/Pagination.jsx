import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    const result = [];

    if (currentPage - delta > 2) {
      result.push(1, 'left-ellipsis');
    } else {
      result.push(1);
    }

    result.push(...range);

    if (currentPage + delta < totalPages - 1) {
      result.push('right-ellipsis', totalPages);
    } else if (totalPages > 1) {
      result.push(totalPages);
    }

    return [...new Set(result)];
  };

  return (
    <nav className="pagination" aria-label="Paginação">
      <button
        type="button"
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Anterior"
      >
        <ChevronLeft size={16} />
      </button>

      {getPages().map((page) => {
        if (typeof page === 'string') {
          return <span key={page} className="page-ellipsis">…</span>;
        }
        return (
          <button
            key={page}
            type="button"
            className={`page-btn ${page === currentPage ? 'current' : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
