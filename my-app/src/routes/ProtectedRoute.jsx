import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
export const ProtectedRoute = ({ children }) => {
  const { user, state } = useAuthContext();
  if (state === "pending") {
    return <div>pending...</div>;
  }
  if (state === "error") {
    return <div>Có lỗi xác thực</div>;
  }
  if (!user) {
    return <Navigate to="/student-portal/login" replace />;
  }
  return children;
};
