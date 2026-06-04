import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../../features/auth/pages/Login.jsx";
import { RegisterPage } from "../../features/auth/pages/Register.jsx";
import { ClubPage } from "../../features/club/pages/Club.jsx";
import { User } from "../../features/profile/pages/User.jsx";
import Home from "../../features/home/pages/Home";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import MainLayout from "../../shared/layouts/MainLayout.jsx";
import { BASE_URL } from "../../shared/config/index.js";
export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={`${BASE_URL}/login`} element={<LoginPage />} />
        <Route path={`${BASE_URL}/register`} element={<RegisterPage />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to={BASE_URL} replace />} />

        {/* Protected + Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={`${BASE_URL}`} element={<Home />} />
          <Route path={`${BASE_URL}/club`} element={<ClubPage />} />
          <Route path={`${BASE_URL}/profile`} element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
