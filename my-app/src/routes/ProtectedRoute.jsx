import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
import { BASE_URL } from "../config/index.js";
export const ProtectedRoute = ({ children }) => {
  const { user, state } = useAuthContext();
  console.log("ProtectedRoute:", { user, state, url: window.location.href });

  if (state === "pending") {
    return <div>pending...</div>;
  }
  if (state === "fail") {
    return <div>Có lỗi xác thực</div>;
  }
  if (!user) {
    return <Navigate to={`${BASE_URL}/login`} replace />;
  }
  return children;
};
