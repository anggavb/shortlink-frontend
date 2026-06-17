function AppFooter() {
  const links = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "API Documentation", href: "#" },
    { label: "Support", href: "#" },
  ];
  return (
    <footer className="flex w-full flex-col gap-5 bg-slate-100 px-8 py-12 text-xs font-bold tracking-[0.22em] text-slate-500 uppercase sm:flex-row sm:items-center sm:justify-between">
      <p>&copy; 2026 Shortlink. The Digital Architect.</p>
      {links.length > 0 && (
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 sm:justify-end">
            {links.map((link) => (
              <li key={link.label}>
                <a className="hover:text-slate-800" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </footer>
  );
}

export default AppFooter;
