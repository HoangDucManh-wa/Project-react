import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth/Login.jsx";
import { RegisterPage } from "../pages/auth/Register.jsx";
import Home from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

export default function AppRoute() {
  const baseURL = "/student-portal";

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={`${baseURL}/login`} element={<LoginPage />} />
        <Route path={`${baseURL}/register`} element={<RegisterPage />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to={baseURL} replace />} />

        {/* Protected + Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={`${baseURL}`} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
