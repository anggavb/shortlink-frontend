import { Route, Routes } from "react-router";
import LandingPage from "@/pages/LandingPage.jsx";
import LoginPage from "@/pages/auth/LoginPage.jsx";
import RegisterPage from "@/pages/auth/RegisterPage.jsx";
import ProtectedRoute from "@/components/auth/ProtectedRoute.jsx";
import DashboardPage from "@/pages/admin/DashboardPage.jsx";
import ProfilePage from "@/pages/admin/ProfilePage.jsx";
import CreateLinkPage from "@/pages/admin/CreateLinkPage.jsx";
import NotFoundPage from "@/pages/NotFoundPage.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="auth" element={<ProtectedRoute guestOnly />}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="admin" element={<ProtectedRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="create" element={<CreateLinkPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
