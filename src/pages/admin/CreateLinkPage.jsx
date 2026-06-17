import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FiActivity,
  FiArrowLeft,
  FiEye,
  FiGrid,
  FiLink,
  FiZap,
} from "react-icons/fi";
import Navbar from "@/components/layout/Navbar.jsx";
import AppFooter from "@/components/layout/AppFooter.jsx";

function CreateLinkPage() {
  const [slug, setSlug] = useState("");

  const previewSlug = useMemo(() => {
    return slug.trim() || "my-custom-slug";
  }, [slug]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <Navbar isLoggedIn={true} />

      <main className="flex-1 px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-base font-semibold text-blue-700 transition hover:text-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to Dashboard
          </Link>

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-[#20242a]">
              Create New Short Link
            </h1>
            <p className="mt-2 text-base leading-6 text-slate-600">
              Transform your long URLs into clean, manageable assets.
            </p>
          </div>

          <form
            className="mt-8 rounded-lg border border-slate-200 bg-white px-6 py-9 shadow-sm sm:px-8"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                className="block text-sm font-extrabold tracking-[0.06em] text-[#20242a] uppercase"
                htmlFor="destination-url"
              >
                Destination URL <span className="text-red-600">*</span>
              </label>
              <div className="mt-3 flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                <FiLink
                  className="shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="destination-url"
                  type="url"
                  required
                  placeholder="https://example.com/your-long-url-here"
                  className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <p className="mt-2 text-[0.6875rem] leading-5 font-medium text-slate-500 italic">
                Ensure your URL starts with http:// or https://
              </p>
            </div>

            <div className="mt-7">
              <label
                className="block text-sm font-extrabold tracking-[0.06em] text-[#20242a] uppercase"
                htmlFor="custom-slug"
              >
                Custom Slug (Optional)
              </label>
              <div className="mt-3 flex h-12 overflow-hidden rounded-lg border border-slate-200 bg-white transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                <span className="inline-flex shrink-0 items-center border-r border-slate-200 bg-slate-100 px-4 text-sm font-medium text-slate-700">
                  short.link/
                </span>
                <input
                  id="custom-slug"
                  type="text"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  placeholder="my-custom-slug"
                  className="min-w-0 flex-1 px-4 text-base text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <p className="mt-2 text-[0.6875rem] leading-5 font-medium text-slate-500 italic">
                Leave blank to generate a random unique identifier.
              </p>
            </div>

            <div className="mt-7 rounded-lg border border-blue-200 bg-blue-50 px-4 py-4">
              <div className="flex items-center gap-3 text-sm font-extrabold tracking-[0.12em] text-blue-700 uppercase">
                <FiEye className="text-lg" aria-hidden="true" />
                Live Preview
              </div>
              <p className="mt-2 pl-8 text-base leading-6 text-slate-900">
                Your short link will be:{" "}
                <span className="font-semibold text-blue-700">
                  https://short.link/{previewSlug}
                </span>
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-7 text-base font-bold text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:w-auto"
              >
                Create Link
                <FiZap aria-hidden="true" />
              </button>
              <Link
                to="/admin"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg px-5 text-base font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:w-auto"
              >
                Cancel
              </Link>
            </div>
          </form>

          <section
            className="mt-12 grid gap-8 sm:grid-cols-2"
            aria-label="Create link benefits"
          >
            <FeatureNote
              icon={<FiActivity aria-hidden="true" />}
              iconClassName="bg-orange-100 text-orange-700"
              title="Real-time Analytics"
              description="Track every click, geographical location, and referral source instantly."
            />
            <FeatureNote
              icon={<FiGrid aria-hidden="true" />}
              iconClassName="bg-indigo-100 text-indigo-700"
              title="Auto-generated QR"
              description="Every link automatically creates a high-resolution QR code for print."
            />
          </section>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

function FeatureNote({ description, icon, iconClassName, title }) {
  return (
    <div className="flex items-start gap-4">
      <span
        className={[
          "grid size-10 shrink-0 place-items-center rounded-full text-xl",
          iconClassName,
        ].join(" ")}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <h2 className="text-sm font-extrabold text-[#20242a]">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export default CreateLinkPage;
