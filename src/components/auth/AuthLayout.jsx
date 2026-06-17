import AppFooter from "../layout/AppFooter.jsx";
import BrandLogo from "../ui/BrandLogo.jsx";

const footerLinks = [
  { label: "API Documentation", href: "#" },
  { label: "Support", href: "#" },
];

function AuthLayout({ children, subtitle, title }) {
  return (
    <div className="flex min-h-svh flex-col bg-slate-100 text-slate-900">
      <main className="mx-auto flex w-full max-w-124 flex-1 flex-col items-center justify-center px-5 py-12 sm:py-16">
        <BrandLogo />
        <header>
          <h1 className="mt-11 text-center text-2xl font-semibold tracking-normal text-[#20242a]">
            {title}
          </h1>
          <p className="mt-2 text-center text-[0.9375rem] leading-6 text-slate-600">
            {subtitle}
          </p>
        </header>
        {children}
      </main>
      <AppFooter links={footerLinks} />
    </div>
  );
}

export default AuthLayout;
