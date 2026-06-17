import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination() {
  return (
    <nav
      className="mt-12 flex items-center justify-between gap-4 text-sm font-bold text-slate-500"
      aria-label="Pagination"
    >
      <a
        href="#"
        className="inline-flex h-10 items-center gap-2 rounded-md px-2 transition hover:text-blue-700 focus:ring-4 focus:ring-blue-100 focus:outline-none"
      >
        <FiChevronLeft aria-hidden="true" />
        Prev Page
      </a>

      <div className="flex items-center gap-4">
        <span className="grid size-8 place-items-center rounded-md bg-blue-100 font-extrabold text-blue-700">
          1
        </span>
        <span className="font-medium text-slate-400">of</span>
        <span className="font-semibold text-slate-900">5</span>
      </div>

      <a
        href="#"
        className="inline-flex h-10 items-center gap-2 rounded-md px-2 transition hover:text-blue-700 focus:ring-4 focus:ring-blue-100 focus:outline-none"
      >
        Next
        <FiChevronRight aria-hidden="true" />
      </a>
    </nav>
  );
}

export default Pagination;
