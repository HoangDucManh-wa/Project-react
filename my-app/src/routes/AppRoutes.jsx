import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/auth/Login.jsx";
import Home from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
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
