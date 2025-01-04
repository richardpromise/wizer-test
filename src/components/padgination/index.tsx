import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 20, 50, 100],
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-between px-4 py-2 border-t space-y-4 md:space-y-0">
      {/* Rows per page section */}
      <div className="flex items-center w-full md:w-auto space-x-2">
        <span className="text-sm">Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange?.(parseInt(e.target.value))}
          className="border rounded px-2 py-1 text-sm w-24"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination buttons section */}
      <div className="flex items-center w-full md:w-auto justify-center space-x-1">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 text-sm border-[#E5E5E5] w-10"
        >
          {"|<"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 text-sm border-[#E5E5E5] w-10"
        >
          {"<"}
        </button>
        {renderPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border border-[#E5E5E5] rounded ${
                page === currentPage ? "bg-[#8158F3] text-white" : ""
              } text-sm w-10`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-1 text-sm w-10">
              {page}
            </span>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 text-sm border-[#E5E5E5] w-10"
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 text-sm border-[#E5E5E5] w-10"
        >
          {">|"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
