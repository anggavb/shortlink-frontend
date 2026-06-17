import { FiBarChart2, FiCheckCircle } from "react-icons/fi";
import heroAsset from "@/assets/image.png";

const insightItems = [
  "Geographic Distribution Maps",
  "Device & Browser Breakdown",
  "UTM Parameter Tracking",
];

function InsightSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-7 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-32">
        <img src={heroAsset} alt="Graphic illustrating data insights" />

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
