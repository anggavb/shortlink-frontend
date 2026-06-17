import { NavLink, useLocation } from "react-router";
import { FiPlus, FiUser } from "react-icons/fi";
import BrandLogo from "@/components/ui/BrandLogo.jsx";

const navigationItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Analytics", to: "#" },
  { label: "Links", to: "#" },
];

function Navbar({ isLoggedIn }) {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/+$/, "") || "/";
  const showCreateLink = isLoggedIn && currentPath === "/admin";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 w-full items-center justify-between gap-5 px-5 sm:px-7 lg:px-8">
        <div className="flex min-w-0 items-center gap-7">
          <BrandLogo className="shrink-0 text-xl sm:text-2xl" />
          {isLoggedIn && (
            <nav className="hidden items-center gap-7 text-sm font-medium text-slate-500 sm:flex">
              <NavLink
                to={navigationItems[0].to}
                end
                className={({ isActive }) =>
                  [
                    "flex min-h-16 items-center border-b-2 pt-0.5 transition",
                    isActive
                      ? "border-blue-700 text-blue-700"
                      : "border-transparent hover:text-blue-700",
                  ].join(" ")
                }
              >
                {navigationItems[0].label}
              </NavLink>
              {navigationItems.slice(1).map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  className="transition hover:text-blue-700"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {isLoggedIn ? (
            <>
              {showCreateLink && (
                <NavLink
                  to="/admin/create"
                  className="hidden h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(37,99,235,0.24)] transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:inline-flex"
                >
                  <FiPlus className="text-lg" aria-hidden="true" />
                  Create New Link
                </NavLink>
              )}
              <NavLink
                to="/admin/profile"
                className="grid size-9 place-items-center rounded-full border border-slate-200 bg-teal-700 text-white shadow-sm transition hover:bg-teal-800 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                aria-label="Open profile"
              >
                <FiUser className="text-lg" aria-hidden="true" />
              </NavLink>
              <a
                href="#"
                className="hidden text-sm font-medium text-slate-500 transition hover:text-slate-900 sm:inline-flex"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <NavLink
                to="/auth"
                className="inline-flex h-10 items-center justify-center rounded-lg px-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:px-3"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(37,99,235,0.24)] transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:px-5"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
