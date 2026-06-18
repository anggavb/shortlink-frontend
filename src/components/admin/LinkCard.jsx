import {
  FiBarChart2,
  FiCalendar,
  FiCopy,
  FiLink,
  FiTrash2,
} from "react-icons/fi";
import IconButton from "@/components/ui/IconButton.jsx";

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatClicks(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value || 0);
}

function LinkCard({ link, onCopy, onDelete }) {
  const shortUrl = link.short_url || "";
  const originalUrl = link.original_url || "";

  return (
    <article className="flex min-h-28 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-4">
      <div className="min-w-0">
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex max-w-full items-center gap-2 text-base font-extrabold text-blue-700 transition hover:text-blue-800 hover:underline"
        >
          <FiLink className="shrink-0 text-base" aria-hidden="true" />
          <span className="truncate">{shortUrl}</span>
        </a>
        <p className="mt-2 truncate text-sm font-medium text-slate-600">
          {originalUrl}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-extrabold tracking-[0.12em] text-slate-400 uppercase">
          <span className="inline-flex items-center gap-1">
            <FiCalendar className="text-sm" aria-hidden="true" />
            {formatDate(link.created_at)}
          </span>
          <span className="inline-flex items-center gap-1">
            <FiBarChart2 className="text-sm" aria-hidden="true" />
            {formatClicks(link.click_count)} Clicks
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <IconButton label={`Copy ${shortUrl}`} onClick={() => onCopy(shortUrl)}>
          <FiCopy aria-hidden="true" />
        </IconButton>
        <IconButton
          label={`Delete ${shortUrl}`}
          variant="plain"
          onClick={() => onDelete(link.id)}
        >
          <FiTrash2 aria-hidden="true" />
        </IconButton>
      </div>
    </article>
  );
}

export default LinkCard;
