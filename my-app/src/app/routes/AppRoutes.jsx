import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../../modules/auth/pages/Login.jsx";
import { RegisterPage } from "../../modules/auth/pages/Register.jsx";
import { ClubPage } from "../../modules/club/pages/Club.jsx";
import Home from "../../modules/home/pages/Home";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import { BASE_URL } from "../../shared/config/index.js";
export default function AppRoute() {
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected + Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/club" element={<ClubPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
