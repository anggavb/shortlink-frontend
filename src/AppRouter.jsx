import { Route, Routes } from "react-router";
import LandingPage from "@/pages/LandingPage.jsx";
import RegisterPage from "@/pages/auth/RegisterPage.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default AppRouter;
