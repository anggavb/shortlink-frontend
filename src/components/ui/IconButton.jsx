function IconButton({ children, label, variant = "filled" }) {
  return (
    <button
      type="button"
      className={[
        "grid size-10 place-items-center rounded-lg text-xl transition focus:ring-4 focus:ring-blue-100 focus:outline-none",
        variant === "filled"
          ? "bg-blue-50 text-slate-700 hover:bg-blue-100"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
      ].join(" ")}
      aria-label={label}
    >
      {children}
    </button>
  );
}

export default IconButton;
