import { FiFilter, FiSearch } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar.jsx";
import LinkCard from "@/components/admin/LinkCard.jsx";
import Pagination from "@/components/admin/Pagination.jsx";
import AppFooter from "@/components/layout/AppFooter.jsx";

const links = [
  {
    id: "aB3x9",
    shortUrl: "shrt.lnk/aB3x9",
    url: "https://www.architecturaldigest.com/story/modern-mini...",
    date: "Oct 24, 2023",
    clicks: "1.2K",
  },
  {
    id: "v9Pq2",
    shortUrl: "shrt.lnk/v9Pq2",
    url: "https://medium.com/design-ethics/the-future-of-headle...",
    date: "Oct 21, 2023",
    clicks: "842",
  },
  {
    id: "zR4t1",
    shortUrl: "shrt.lnk/zR4t1",
    url: "https://github.com/frameworks/modern-stack-documen...",
    date: "Oct 19, 2023",
    clicks: "2.4K",
  },
  {
    id: "mL5k8",
    shortUrl: "shrt.lnk/mL5k8",
    url: "https://dribbble.com/shots/21435678-Fintech-Dashboar...",
    date: "Oct 15, 2023",
    clicks: "341",
  },
];

function DashboardPage() {
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
                124
              </p>
            </div>
          </section>

          <div className="mt-7 flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm">
            <FiSearch className="shrink-0 text-xl text-slate-500" />
            <input
              type="search"
              aria-label="Search links"
              placeholder="Search by name or URL..."
              className="min-w-0 flex-1 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              className="grid size-9 shrink-0 place-items-center rounded-md text-slate-700 transition hover:bg-slate-100 focus:ring-4 focus:ring-blue-100 focus:outline-none"
              aria-label="Filter links"
            >
              <FiFilter className="text-lg" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 space-y-4">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>

          <Pagination />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

export default DashboardPage;
