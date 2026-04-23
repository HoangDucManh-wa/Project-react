import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth/Login.jsx";
import { RegisterPage } from "../pages/auth/Register.jsx";
import Home from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

export default function AppRoute() {
  const baseURL = "/student-portal";
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${baseURL}/login`} element={<LoginPage />} />
        <Route path="/" element={<Navigate to={`${baseURL}`} replace />} />
        <Route path={`${baseURL}/register`} element={<RegisterPage />} />
        <Route
          path={`${baseURL}`}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
