import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "@/redux/auth/authSlice";
import { notify } from "@/utils/toast";
import AuthCard from "@/components/auth/AuthCard.jsx";
import AuthLayout from "@/components/auth/AuthLayout.jsx";
import Button from "@/components/ui/Button.jsx";
import FormField from "@/components/ui/FormField.jsx";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggingIn = useSelector((state) => state.auth.loginStatus === "loading");
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await dispatch(loginUser(values)).unwrap();
      notify.success(response?.message || "Login berhasil.");
      navigate("/admin");
    } catch (error) {
      if (error?.errors?.email) {
        setError("email", {
          type: "server",
          message: error.errors.email,
        });
      }

      if (error?.errors?.password) {
        setError("password", {
          type: "server",
          message: error.errors.password,
        });
      }

      notify.error(error?.message || "Login failed. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <header>
          <h1 className="text-2xl font-semibold tracking-normal text-[#20242a]">
            Welcome Back
          </h1>
          <p className="mt-2 text-[0.9375rem] leading-6 text-slate-600">
            Please enter your details to sign in.
          </p>
        </header>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
            error={errors.email}
            registration={register("email", {
              required: "Email address is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label
                className="block text-sm leading-5 font-medium text-slate-700"
                htmlFor="password"
              >
                Password
              </label>
              <a
                className="text-xs font-semibold text-blue-700 hover:underline"
                href="#"
              >
                Forgot password?
              </a>
            </div>
            <FormField
              id="password"
              label=""
              type="password"
              placeholder="********"
              autoComplete="current-password"
              error={errors.password}
              registration={register("password", {
                required: "Password is required.",
              })}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoggingIn}
            className="mt-1 shadow-[0_10px_18px_rgba(37,99,235,0.22)]"
          >
            {isLoggingIn ? "Logging In..." : "Log In"}{" "}
            <span aria-hidden="true">&rarr;</span>
          </Button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-slate-100" />
          <span className="text-xs font-bold tracking-[0.16em] text-slate-300 uppercase">
            Or Continue With
          </span>
          <span className="h-px flex-1 bg-slate-100" />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-base font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:ring-4 focus:ring-blue-100 focus:outline-none"
        >
          <FcGoogle className="text-lg" aria-hidden="true" />
          Sign in with Google
        </button>
      </AuthCard>

      <p className="mt-9 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link className="text-link" to="/auth/register">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
