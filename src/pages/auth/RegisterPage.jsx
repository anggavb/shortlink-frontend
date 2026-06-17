import { Link } from "react-router";
import { useForm } from "react-hook-form";
import AuthCard from "../../components/auth/AuthCard.jsx";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import FormField from "../../components/ui/FormField.jsx";
import Button from "../../components/ui/Button.jsx";

function RegisterPage() {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Register payload", values);
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the elite architects of the web."
    >
      <AuthCard>
        <form
          className="space-y-6"
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

          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            error={errors.password}
            registration={register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
            })}
          />

          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            error={errors.confirmPassword}
            registration={register("confirmPassword", {
              required: "Confirm your password.",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match.",
            })}
          />

          <Button type="submit">
            Sign Up <span aria-hidden="true">&rarr;</span>
          </Button>
        </form>

        <p className="mx-auto mt-5 max-w-88 text-center text-xs leading-5 text-slate-600">
          By signing up, you agree to our{" "}
          <a className="text-link" href="#">
            Terms of Service
          </a>
          {" and "}
          <a className="text-link" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </AuthCard>

      <p className="mt-9 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link className="text-link" to="/auth/login">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
