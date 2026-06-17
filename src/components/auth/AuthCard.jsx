function AuthCard({ children }) {
  return (
    <section className="mt-8 w-full rounded-lg border border-slate-200 bg-white px-8 py-9 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:px-8">
      {children}
    </section>
  );
}

export default AuthCard;
