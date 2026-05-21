import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../modules/auth/hooks/useAuthContext.js";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  // đang check login (gọi /me)
  if (loading) {
    return <div>Loading...</div>;
  }

  // không có user → chưa login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // đã login
  return children;
};
