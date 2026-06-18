import { useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  FiActivity,
  FiArrowLeft,
  FiEye,
  FiGrid,
  FiLink,
  FiZap,
} from "react-icons/fi";
import Navbar from "@/components/layout/Navbar.jsx";
import AppFooter from "@/components/layout/AppFooter.jsx";
import {
  clearCreateLinkState,
  createLink,
  selectCreateLinkStatus,
} from "@/redux/links/linksSlice";
import { notify } from "@/utils/toast";

const slugPattern = /^[A-Za-z0-9-]+$/;

function CreateLinkPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector(selectCreateLinkStatus);
  const isCreating = createStatus === "loading";
  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
    setError,
  } = useForm({
    defaultValues: {
      originalUrl: "",
      slug: "",
    },
  });

  const slug = useWatch({
    control,
    name: "slug",
  });

  const previewSlug = useMemo(() => {
    return slug.trim() || "my-custom-slug";
  }, [slug]);

  const onSubmit = async ({ originalUrl, slug }) => {
    const trimmedSlug = slug.trim();
    const payload = {
      original_url: originalUrl.trim(),
    };

    if (trimmedSlug) {
      payload.slug = trimmedSlug;
    }

    try {
      const response = await dispatch(createLink(payload)).unwrap();
      notify.success(response?.message || "Link created successfully.");
      dispatch(clearCreateLinkState());
      navigate("/admin");
    } catch (error) {
      if (error?.errors?.OriginalURL || error?.errors?.original_url) {
        setError("originalUrl", {
          type: "server",
          message: error.errors.OriginalURL || error.errors.original_url,
        });
      }

      if (error?.errors?.Slug || error?.errors?.slug) {
        setError("slug", {
          type: "server",
          message: error.errors.Slug || error.errors.slug,
        });
      }

      if (error?.message === "Slug Already Used") {
        setError("slug", {
          type: "server",
          message: "Slug already used.",
        });
      }

      if (error?.message === "Original URL Already Used") {
        setError("originalUrl", {
          type: "server",
          message: "Original URL already used.",
        });
      }

      notify.error(error?.message || "Unable to create link.");
    }
  };

  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-base font-semibold text-blue-700 transition hover:text-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to Dashboard
          </Link>

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-[#20242a]">
              Create New Short Link
            </h1>
            <p className="mt-2 text-base leading-6 text-slate-600">
              Transform your long URLs into clean, manageable assets.
            </p>
          </div>

          <form
            className="mt-8 rounded-lg border border-slate-200 bg-white px-6 py-9 shadow-sm sm:px-8"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label
                className="block text-sm font-extrabold tracking-[0.06em] text-[#20242a] uppercase"
                htmlFor="destination-url"
              >
                Destination URL <span className="text-red-600">*</span>
              </label>
              <div className="mt-3 flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                <FiLink
                  className="shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="destination-url"
                  type="url"
                  placeholder="https://example.com/your-long-url-here"
                  aria-invalid={errors.originalUrl ? "true" : "false"}
                  aria-describedby={
                    errors.originalUrl
                      ? "destination-url-error"
                      : "destination-url-helper"
                  }
                  className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
                  {...register("originalUrl", {
                    required: "Destination URL is required.",
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "URL must start with http:// or https://.",
                    },
                  })}
                />
              </div>
              {errors.originalUrl ? (
                <p id="destination-url-error" className="form-error mt-2">
                  {errors.originalUrl.message}
                </p>
              ) : (
                <p
                  id="destination-url-helper"
                  className="mt-2 text-[0.6875rem] leading-5 font-medium text-slate-500 italic"
                >
                  Ensure your URL starts with http:// or https://
                </p>
              )}
            </div>

            <div className="mt-7">
              <label
                className="block text-sm font-extrabold tracking-[0.06em] text-[#20242a] uppercase"
                htmlFor="custom-slug"
              >
                Custom Slug (Optional)
              </label>
              <div className="mt-3 flex h-12 overflow-hidden rounded-lg border border-slate-200 bg-white transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                <span className="inline-flex shrink-0 items-center border-r border-slate-200 bg-slate-100 px-4 text-sm font-medium text-slate-700">
                  short.link/
                </span>
                <input
                  id="custom-slug"
                  type="text"
                  placeholder="my-custom-slug"
                  aria-invalid={errors.slug ? "true" : "false"}
                  aria-describedby={
                    errors.slug ? "custom-slug-error" : "custom-slug-helper"
                  }
                  className="min-w-0 flex-1 px-4 text-base text-slate-900 outline-none placeholder:text-slate-400"
                  {...register("slug", {
                    minLength: {
                      value: 3,
                      message: "Slug must be at least 3 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Slug must be at most 50 characters.",
                    },
                    pattern: {
                      value: slugPattern,
                      message:
                        "Slug can only contain letters, numbers, and hyphens.",
                    },
                  })}
                />
              </div>
              {errors.slug ? (
                <p id="custom-slug-error" className="form-error mt-2">
                  {errors.slug.message}
                </p>
              ) : (
                <p
                  id="custom-slug-helper"
                  className="mt-2 text-[0.6875rem] leading-5 font-medium text-slate-500 italic"
                >
                  Leave blank to generate a random unique identifier.
                </p>
              )}
            </div>

            <div className="mt-7 rounded-lg border border-blue-200 bg-blue-50 px-4 py-4">
              <div className="flex items-center gap-3 text-sm font-extrabold tracking-[0.12em] text-blue-700 uppercase">
                <FiEye className="text-lg" aria-hidden="true" />
                Live Preview
              </div>
              <p className="mt-2 pl-8 text-base leading-6 text-slate-900">
                Your short link will be:{" "}
                <span className="font-semibold text-blue-700">
                  https://short.link/{previewSlug}
                </span>
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
              <button
                type="submit"
                disabled={isCreating}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-7 text-base font-bold text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none sm:w-auto"
              >
                {isCreating ? "Creating..." : "Create Link"}
                <FiZap aria-hidden="true" />
              </button>
              <Link
                to="/admin"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg px-5 text-base font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:w-auto"
              >
                Cancel
              </Link>
            </div>
          </form>

          <section
            className="mt-12 grid gap-8 sm:grid-cols-2"
            aria-label="Create link benefits"
          >
            <FeatureNote
              icon={<FiActivity aria-hidden="true" />}
              iconClassName="bg-orange-100 text-orange-700"
              title="Real-time Analytics"
              description="Track every click, geographical location, and referral source instantly."
            />
            <FeatureNote
              icon={<FiGrid aria-hidden="true" />}
              iconClassName="bg-indigo-100 text-indigo-700"
              title="Auto-generated QR"
              description="Every link automatically creates a high-resolution QR code for print."
            />
          </section>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

function FeatureNote({ description, icon, iconClassName, title }) {
  return (
    <div className="flex items-start gap-4">
      <span
        className={[
          "grid size-10 shrink-0 place-items-center rounded-full text-xl",
          iconClassName,
        ].join(" ")}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <h2 className="text-sm font-extrabold text-[#20242a]">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export default CreateLinkPage;
