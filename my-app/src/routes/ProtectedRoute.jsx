import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, state } = useAuthContext();

  if (state) {
    return <div>{state}</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
