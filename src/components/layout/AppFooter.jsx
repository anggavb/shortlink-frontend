function AppFooter({ links = [] }) {
  return (
    <footer className="flex w-full flex-col gap-4 border-t border-slate-200/70 bg-gray-200 px-6 py-8 text-[0.6875rem] font-semibold tracking-[0.24em] text-slate-500 uppercase sm:flex-row sm:items-center sm:justify-between">
      <p>&copy; 2024 Shortlink. The Digital Architect.</p>
      {links.length > 0 && (
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
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
