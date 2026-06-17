import { FiBarChart2, FiCheckCircle } from "react-icons/fi";
import heroAsset from "@/assets/hero.png";

const insightItems = [
  "Geographic Distribution Maps",
  "Device & Browser Breakdown",
  "UTM Parameter Tracking",
];

function InsightSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-7 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-32">
        <div className="relative overflow-hidden rounded-lg bg-slate-950 p-6 shadow-[0_26px_65px_rgba(15,23,42,0.18)]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.2),transparent_45%,rgba(249,115,22,0.12))]" />
          <div className="relative rounded-lg border border-white/10 bg-white/95 p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold tracking-[0.18em] text-slate-400 uppercase">
                  Click Flow
                </p>
                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  48.2K
                </p>
              </div>
              <div className="grid size-14 place-items-center rounded-lg bg-blue-100 text-blue-700">
                <FiBarChart2 className="text-2xl" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-10 grid h-44 grid-cols-8 items-end gap-3 rounded-lg bg-slate-100 px-4 py-5">
              {[36, 58, 44, 78, 52, 88, 65, 96].map((height, index) => (
                <span
                  key={height + index}
                  className="rounded-t-md bg-blue-700"
                  style={{ height: `${height}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["US", "ID", "SG"].map((region) => (
                <div
                  key={region}
                  className="rounded-lg border border-slate-100 bg-white px-4 py-3"
                >
                  <p className="text-xs font-bold text-slate-400">{region}</p>
                  <p className="mt-1 text-sm font-extrabold text-slate-900">
                    Active
                  </p>
                </div>
              ))}
            </div>
          </div>

          <img
            className="absolute -right-8 -bottom-6 w-36 opacity-70 sm:w-44"
            src={heroAsset}
            alt=""
            aria-hidden="true"
          />
        </div>

        <div>
          <p className="text-sm font-extrabold tracking-[0.18em] text-slate-500 uppercase">
            Data Driven Insights
          </p>
          <h2 className="mt-6 max-w-xl text-3xl leading-tight font-extrabold tracking-normal text-[#1c1f24] sm:text-4xl">
            Observe your link architecture in real-time.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600">
            Every click is a data point. Our dashboard provides surgical
            precision into where your traffic originates, who is engaging, and
            how your team communications are performing across the globe.
          </p>

          <ul className="mt-8 space-y-4">
            {insightItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 text-base font-bold text-slate-700"
              >
                <FiCheckCircle
                  className="shrink-0 text-xl text-blue-700"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default InsightSection;
