import { Link } from "react-router";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiBarChart2,
  FiCode,
  FiLink,
} from "react-icons/fi";

const quickLinks = [
  {
    title: "Check Analytics",
    description: "Track your active links and traffic sources in real-time.",
    icon: FiBarChart2,
  },
  {
    title: "New ShortLink",
    description: "Create a brand new shortened URL in seconds.",
    icon: FiLink,
  },
  {
    title: "Developer API",
    description: "Integrate our link infrastructure into your apps.",
    icon: FiCode,
  },
];

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "API Documentation", href: "#" },
  { label: "Support", href: "mailto:support@shortlink.test" },
];

function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <main className="flex flex-1 items-center justify-center px-6 py-14 sm:px-8">
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <div className="relative mb-12 h-32 w-32">
            <div className="absolute inset-4 grid place-items-center rounded-full bg-slate-100 text-5xl font-extrabold text-slate-300">
              <span className="relative inline-block">
                <FiLink aria-hidden="true" />
                <span className="absolute left-1/2 top-1/2 h-1.5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-slate-300" />
              </span>
            </div>
            <div className="absolute right-2 top-1 grid size-10 -rotate-[-12deg] place-items-center rounded-lg bg-blue-600 text-white shadow-[0_14px_28px_rgba(37,99,235,0.26)]">
              <FiAlertTriangle className="text-lg" aria-hidden="true" />
            </div>
          </div>

          <p className="text-4xl font-extrabold leading-none text-blue-700">
            404
          </p>
          <h1 className="mt-5 text-2xl font-extrabold tracking-normal text-[#20242a]">
            Page Not Found
          </h1>
          <p className="mt-4 max-w-md text-lg leading-7 text-slate-600">
            The page you're looking for doesn't exist. It may have been moved,
            deleted, or the link might be broken.
          </p>

          <div className="mt-11 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/admin"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-7 text-base font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)] transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:w-auto"
            >
              <FiArrowLeft className="text-xl" aria-hidden="true" />
              Go to Dashboard
            </Link>
            <a
              href="mailto:support@shortlink.test"
              className="inline-flex h-14 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-base font-bold text-blue-700 shadow-sm transition hover:border-blue-100 hover:bg-blue-50 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:w-auto"
            >
              Report an Issue
            </a>
          </div>

          <div className="mt-20 grid w-full gap-6 sm:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="min-h-40 rounded-lg border border-slate-100 bg-white px-6 py-7 text-left shadow-sm"
                >
                  <Icon
                    className="text-2xl text-blue-700"
                    aria-hidden="true"
                  />
                  <h2 className="mt-5 text-base font-extrabold text-[#20242a]">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-5 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="flex w-full flex-col gap-5 bg-slate-100 px-8 py-12 text-sm font-bold tracking-[0.22em] text-slate-500 uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2024 ShortLink. The Digital Architect.</p>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 sm:justify-end">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a className="hover:text-slate-800" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  );
}

export default NotFoundPage;
