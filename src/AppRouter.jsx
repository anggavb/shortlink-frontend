import { Route, Routes } from "react-router";
import LandingPage from "@/pages/LandingPage.jsx";
import LoginPage from "@/pages/auth/LoginPage.jsx";
import RegisterPage from "@/pages/auth/RegisterPage.jsx";
import ProfilePage from "@/pages/admin/ProfilePage.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="auth">
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="admin">
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
