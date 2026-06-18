import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({ disabled = false, meta, onPageChange }) {
  const currentPage = meta?.page || 1;
  const totalPages = meta?.total_pages || 0;
  const canGoPrev = currentPage > 1 && !disabled;
  const canGoNext = currentPage < totalPages && !disabled;

  function handlePrev() {
    if (canGoPrev) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="mt-12 flex items-center justify-between gap-4 text-sm font-bold text-slate-500"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={!canGoPrev}
        onClick={handlePrev}
        className="inline-flex h-10 items-center gap-2 rounded-md px-2 transition hover:text-blue-700 focus:ring-4 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:text-slate-300"
      >
        <FiChevronLeft aria-hidden="true" />
        Prev Page
      </button>

      <div className="flex items-center gap-4">
        <span className="grid size-8 place-items-center rounded-md bg-blue-100 font-extrabold text-blue-700">
          {currentPage}
        </span>
        <span className="font-medium text-slate-400">of</span>
        <span className="font-semibold text-slate-900">{totalPages}</span>
      </div>

      <button
        type="button"
        disabled={!canGoNext}
        onClick={handleNext}
        className="inline-flex h-10 items-center gap-2 rounded-md px-2 transition hover:text-blue-700 focus:ring-4 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:text-slate-300"
      >
        Next
        <FiChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}

export default Pagination;
