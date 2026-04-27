import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth/Login.jsx";
import { RegisterPage } from "../pages/auth/Register.jsx";
import Home from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import { BASE_URL } from "../config/index.js";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
