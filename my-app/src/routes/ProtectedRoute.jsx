import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
import { BASE_URL } from "../config/index.js";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  // đang check login (gọi /me)
  if (loading) {
    return <div>Loading...</div>;
  }

  // không có user → chưa login
  if (!user) {
    return <Navigate to={`${BASE_URL}/login`} replace />;
  }

  // đã login
  return children;
};
