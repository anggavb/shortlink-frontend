import { useEffect, useState } from "react";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/layout/Navbar.jsx";
import LinkCard from "@/components/admin/LinkCard.jsx";
import Pagination from "@/components/admin/Pagination.jsx";
import AppFooter from "@/components/layout/AppFooter.jsx";
import {
  deleteLink,
  fetchLinks,
  selectLinks,
  selectLinksDeleteStatus,
  selectLinksFetchError,
  selectLinksFetchStatus,
  selectLinksMeta,
} from "@/redux/links/linksSlice";
import { alertDialog } from "@/utils/sweetAlert";
import { notify } from "@/utils/toast";

const PAGE_LIMIT = 10;
const SEARCH_DEBOUNCE_MS = 400;

function DashboardPage() {
  const dispatch = useDispatch();
  const links = useSelector(selectLinks);
  const meta = useSelector(selectLinksMeta);
  const fetchStatus = useSelector(selectLinksFetchStatus);
  const fetchError = useSelector(selectLinksFetchError);
  const deleteStatus = useSelector(selectLinksDeleteStatus);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const isLoading = fetchStatus === "loading";

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    dispatch(
      fetchLinks({
        page,
        limit: PAGE_LIMIT,
        search: debouncedSearch,
      }),
    );
  }, [debouncedSearch, dispatch, page]);

  function handleRetry() {
    dispatch(
      fetchLinks({
        page,
        limit: PAGE_LIMIT,
        search: debouncedSearch,
      }),
    );
  }

  async function handleCopy(shortUrl) {
    try {
      await navigator.clipboard.writeText(shortUrl);
      notify.success("Short link copied.");
    } catch {
      notify.error("Unable to copy short link.");
    }
  }

  async function handleDelete(id) {
    const result = await alertDialog.confirm({
      title: "Delete this link?",
      text: "This action will remove the short link from your dashboard.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    const action = await dispatch(deleteLink(id));

    if (deleteLink.fulfilled.match(action)) {
      notify.success("Link deleted.");
      const nextPage = links.length === 1 && page > 1 ? page - 1 : page;
      setPage(nextPage);
      dispatch(
        fetchLinks({
          page: nextPage,
          limit: PAGE_LIMIT,
          search: debouncedSearch,
        }),
      );
      return;
    }

    notify.error(action.payload?.message || "Unable to delete link.");
  }

  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 px-5 py-9 sm:px-7 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#20242a]">My Links</h1>
              <p className="mt-1 text-sm text-slate-600">
                Manage and track your shortened digital assets.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-base font-extrabold tracking-[0.18em] text-slate-500 uppercase">
                Total Active
              </p>
              <p className="mt-1 text-2xl leading-none font-extrabold text-blue-700">
                {meta.total}
              </p>
            </div>
          </section>

          <div className="mt-7 flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm">
            <FiSearch className="shrink-0 text-xl text-slate-500" />
            <input
              type="search"
              aria-label="Search links"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by slug or URL..."
              className="min-w-0 flex-1 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="mt-10 space-y-4">
            {isLoading && links.length === 0 ? (
              <DashboardNotice title="Loading links" />
            ) : null}

            {fetchStatus === "failed" ? (
              <DashboardNotice title={fetchError || "Unable to load links"}>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="mt-3 inline-flex h-10 items-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-bold text-white transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                >
                  Retry
                  <FiRefreshCw aria-hidden="true" />
                </button>
              </DashboardNotice>
            ) : null}

            {fetchStatus !== "failed" && !isLoading && links.length === 0 ? (
              <DashboardNotice
                title={
                  debouncedSearch
                    ? "No links match your search."
                    : "No links created yet."
                }
              />
            ) : null}

            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onCopy={handleCopy}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <Pagination
            disabled={isLoading || deleteStatus === "loading"}
            meta={meta}
            onPageChange={setPage}
          />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

function DashboardNotice({ children, title }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-5 py-8 text-center shadow-sm">
      <p className="text-sm font-semibold text-slate-600">{title}</p>
      {children}
    </div>
  );
}

export default DashboardPage;
