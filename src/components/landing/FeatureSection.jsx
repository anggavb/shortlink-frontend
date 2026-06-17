import { FiEdit3, FiUsers, FiZap } from "react-icons/fi";

const features = [
  {
    title: "Easy Create",
    description:
      "Instantly generate high-performance short links with a single click or through precise API endpoints.",
    icon: FiZap,
    accent: "bg-blue-100 text-blue-700",
    line: "bg-blue-200",
  },
  {
    title: "Custom Slugs",
    description:
      "Maintain brand authority with readable, custom link endings that resonate with your digital audience.",
    icon: FiEdit3,
    accent: "bg-indigo-100 text-indigo-700",
    line: "bg-indigo-200",
  },
  {
    title: "Team Ready",
    description:
      "Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards.",
    icon: FiUsers,
    accent: "bg-orange-100 text-orange-700",
    line: "bg-orange-200",
  },
];

function FeatureSection() {
  return (
    <section id="features" className="bg-slate-100 px-5 py-20 sm:px-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-extrabold tracking-[0.18em] text-blue-700 uppercase">
          Architectural Features
        </p>
        <h2 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-normal text-[#1c1f24] sm:text-4xl">
          Built for Enterprise Precision
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-lg bg-white px-8 py-8 shadow-sm ring-1 ring-slate-100"
              >
                <div
                  className={`grid size-12 place-items-center rounded-lg ${feature.accent}`}
                >
                  <Icon className="text-xl" aria-hidden="true" />
                </div>
                <h3 className="mt-7 text-xl font-extrabold text-[#1c1f24]">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {feature.description}
                </p>
                <span
                  className={`mt-7 block h-1 w-12 rounded-full ${feature.line}`}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
