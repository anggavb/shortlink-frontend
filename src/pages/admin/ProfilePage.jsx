import {
  FiBell,
  FiEdit2,
  FiExternalLink,
  FiLink,
  FiLogOut,
  FiShield,
  FiUser,
} from "react-icons/fi";
import Navbar from "@/components/layout/Navbar.jsx";
import AppFooter from "@/components/layout/AppFooter.jsx";

function ProfilePage() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <Navbar isLoggedIn={true} />

      <main className="flex-1 px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto w-full max-w-168">
          <p className="mb-7 text-[0.6875rem] font-bold tracking-[0.24em] text-slate-500 uppercase">
            Account Management
          </p>

          <section className="rounded-lg border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8 lg:px-8">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-semibold tracking-normal text-[#20242a]">
                Profile
              </h1>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-[0.6875rem] font-extrabold tracking-[0.08em] text-blue-700 uppercase">
                Pro Member
              </span>
            </div>

            <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative size-24 shrink-0 rounded-lg bg-slate-900 shadow-[0_14px_24px_rgba(15,23,42,0.18)]">
                <div className="grid size-full place-items-center rounded-lg bg-[radial-gradient(circle_at_50%_18%,#f0b493_0_18%,#d9856d_19%_25%,#1f2937_26%_100%)]">
                  <FiUser
                    className="mt-5 text-5xl text-slate-100"
                    aria-hidden="true"
                  />
                </div>
                <button
                  type="button"
                  className="absolute -right-2 -bottom-2 grid size-8 place-items-center rounded-lg border border-slate-200 bg-white text-blue-700 shadow-md transition hover:bg-blue-50 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                  aria-label="Edit profile picture"
                >
                  <FiEdit2 aria-hidden="true" />
                </button>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#20242a]">
                  Alex Thompson
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Product Architect at Digital Flow
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoPanel label="Email Address" value="user@example.com" />
              <InfoPanel
                label="Account Tenure"
                value="Member since: January 1, 2026"
              />
            </div>

            <div className="mt-8 flex flex-col gap-5 rounded-lg bg-blue-700 px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10">
                  <FiLink className="text-lg" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-extrabold tracking-[0.18em] text-blue-100 uppercase">
                    Active Assets
                  </p>
                  <p className="mt-1 text-2xl leading-none font-extrabold">
                    12
                  </p>
                </div>
              </div>
              <a
                href="#"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 text-xs font-extrabold tracking-[0.14em] text-white uppercase transition hover:bg-white/15 focus:ring-4 focus:ring-white/20 focus:outline-none sm:w-auto"
              >
                View Links
                <FiExternalLink aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10 space-y-6">
              <SettingRow
                icon={<FiBell aria-hidden="true" />}
                label="Email Notifications"
                control={<Toggle enabled />}
              />
              <SettingRow
                icon={<FiShield aria-hidden="true" />}
                label="Two-Factor Authentication"
                control={
                  <span className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-red-600 uppercase">
                    Disabled
                  </span>
                }
              />
            </div>

            <div className="mt-8 border-t border-slate-100 pt-8">
              <button
                type="button"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-slate-900 focus:ring-4 focus:ring-blue-100 focus:outline-none"
              >
                <FiLogOut aria-hidden="true" />
                Logout Session
              </button>
            </div>
          </section>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            Your data is encrypted using AES-256 standards.{" "}
            <a className="font-medium text-blue-700 hover:underline" href="#">
              Privacy Policy
            </a>
          </p>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

function InfoPanel({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-100 px-5 py-6">
      <p className="text-base font-extrabold tracking-[0.18em] text-slate-400 uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

function SettingRow({ control, icon, label }) {
  return (
    <div className="flex min-h-7 items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <span className="text-xl text-slate-400">{icon}</span>
        <span className="text-sm font-medium text-slate-900">{label}</span>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

function Toggle({ enabled = false }) {
  return (
    <button
      type="button"
      className={[
        "flex h-5 w-10 items-center rounded-full p-0.5 transition focus:ring-4 focus:ring-blue-100 focus:outline-none",
        enabled ? "justify-end bg-blue-700" : "justify-start bg-slate-300",
      ].join(" ")}
      aria-pressed={enabled}
      aria-label="Email notifications"
    >
      <span className="size-4 rounded-full bg-white shadow-sm" />
    </button>
  );
}

export default ProfilePage;
