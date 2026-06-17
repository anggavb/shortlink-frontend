import {
  FiBarChart2,
  FiCalendar,
  FiCopy,
  FiLink,
  FiTrash2,
} from "react-icons/fi";
import IconButton from "@/components/ui/IconButton.jsx";

function LinkCard({ link }) {
  return (
    <article className="flex min-h-28 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-4">
      <div className="min-w-0">
        <a
          href="#"
          className="inline-flex max-w-full items-center gap-2 text-base font-extrabold text-blue-700 transition hover:text-blue-800 hover:underline"
        >
          <FiLink className="shrink-0 text-base" aria-hidden="true" />
          <span className="truncate">{link.shortUrl}</span>
        </a>
        <p className="mt-2 truncate text-sm font-medium text-slate-600">
          {link.url}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-extrabold tracking-[0.12em] text-slate-400 uppercase">
          <span className="inline-flex items-center gap-1">
            <FiCalendar className="text-sm" aria-hidden="true" />
            {link.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <FiBarChart2 className="text-sm" aria-hidden="true" />
            {link.clicks} Clicks
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <IconButton label={`Copy ${link.shortUrl}`}>
          <FiCopy aria-hidden="true" />
        </IconButton>
        <IconButton label={`Delete ${link.shortUrl}`} variant="plain">
          <FiTrash2 aria-hidden="true" />
        </IconButton>
      </div>
    </article>
  );
}

export default LinkCard;
