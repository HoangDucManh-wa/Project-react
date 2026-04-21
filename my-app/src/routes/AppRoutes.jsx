import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth/Login.jsx";
import Home from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student-portal/login" element={<LoginPage />} />

        {/* redirect */}
        <Route path="/" element={<Navigate to="/student-portal" />} />

        <Route
          path="/student-portal"
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
