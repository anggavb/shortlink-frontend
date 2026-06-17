import Navbar from "@/components/layout/Navbar.jsx";
import HeroSection from "@/components/landing/HeroSection.jsx";
import FeatureSection from "@/components/landing/FeatureSection.jsx";
import InsightSection from "@/components/landing/InsightSection.jsx";
import AppFooter from "@/components/layout/AppFooter.jsx";

function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-white text-slate-900">
      <Navbar isLoggedIn={false} />

      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <InsightSection />
      </main>

      <AppFooter />
    </div>
  );
}

export default LandingPage;
