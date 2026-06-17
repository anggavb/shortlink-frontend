function FormField({
  error,
  helper,
  id,
  label,
  registration,
  type = "text",
  ...props
}) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helper ? `${id}-helper` : undefined;
  const describedBy =
    [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      <label
        className="block text-sm leading-5 font-medium text-slate-700"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="h-11 w-full rounded-lg border border-slate-400 bg-slate-50/40 px-4 text-base text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        {...registration}
        {...props}
      />
      {helper && !error && (
        <p
          id={helperId}
          className="text-[0.6875rem] font-medium tracking-[0.09em] text-slate-500 uppercase"
        >
          {helper}
        </p>
      )}
      {error && (
        <p id={errorId} className="form-error">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default FormField;
