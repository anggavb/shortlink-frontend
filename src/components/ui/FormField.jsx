import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function FormField({
  error,
  helper,
  id,
  label,
  registration,
  type = "text",
  ...props
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helper ? `${id}-helper` : undefined;
  const describedBy =
    [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      {label && (
        <label
          className="block text-sm leading-5 font-medium text-slate-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-900 transition outline-none placeholder:text-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 ${isPassword ? "pr-12" : ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy}
          {...registration}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-100"
            onClick={() => setIsPasswordVisible((value) => !value)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            aria-pressed={isPasswordVisible}
          >
            {isPasswordVisible ? (
              <FiEyeOff aria-hidden="true" />
            ) : (
              <FiEye aria-hidden="true" />
            )}
          </button>
        )}
      </div>
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
