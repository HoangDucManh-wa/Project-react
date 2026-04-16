import { useState } from "react";
import { login, logout } from "../services/authService";
import { validateEmail, validatePassword } from "../utils/validator";

export function useAuth() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password }) => {
    setError("");

    try {
      validateEmail(email);
      validatePassword(password);
      setLoading(true);

      const userId = await login({ email, password });

      // backend trả về { userId }
      setUserId(userId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // gọi backend để clear cookie
      setUserId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    userId,
    loading,
    error,
    handleLogin,
    handleLogout,
  };
}
