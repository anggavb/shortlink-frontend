import { Link } from "react-router";
import { FiLink } from "react-icons/fi";

function HeroSection() {
  return (
    <section className="bg-slate-50 px-5 pt-24 pb-24 sm:px-7 sm:pt-32 sm:pb-30 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="mx-auto max-w-4xl text-4xl leading-tight font-extrabold tracking-normal text-[#1c1f24] sm:text-5xl lg:text-6xl">
          Shorten URLs. <span className="text-blue-700">Share Easily.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          Create short, memorable links for your team communications. Transform
          long, cumbersome URLs into powerful digital assets that drive
          engagement.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/auth/register"
            className="inline-flex h-14 w-full items-center justify-center rounded-lg bg-blue-700 px-8 text-base font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.26)] transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:w-auto"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="inline-flex h-14 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-base font-bold text-blue-700 transition hover:border-slate-300 hover:bg-slate-50 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:w-auto"
          >
            Learn More
          </a>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl bg-white p-2 shadow-[0_22px_60px_rgba(37,99,235,0.12)] ring-1 ring-slate-100">
          <form
            className="flex flex-col gap-3 sm:flex-row"
            aria-label="URL shortener preview"
          >
            <label className="sr-only" htmlFor="landing-url">
              Long URL
            </label>
            <div className="flex min-h-14 flex-1 items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 text-left">
              <FiLink
                className="shrink-0 text-xl text-slate-300"
                aria-hidden="true"
              />
              <input
                id="landing-url"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-500 outline-none placeholder:text-slate-300 sm:text-base"
                placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
                type="url"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-blue-700 px-8 text-base font-bold text-white transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none"
            >
              Shorten
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
