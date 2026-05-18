import { useState, useEffect } from "react";
import {
  validateEmail,
  validatePassword,
  validateStudentId,
  validateUserName,
  validateRole,
} from "../utils/validator.js";

import { login, logout, register, getMe } from "../services/authServices.js";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getMe()
      .then((user) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    setError("");

    try {
      validateEmail(email);

      validatePassword(password);

      const user = await login({
        email,
        password,
      });

      setUser(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    setError("");

    try {
      await logout();

      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data) => {
    setLoading(true);

    setError("");

    try {
      const { email, password, studentId, name, role } = data;

      validateEmail(email);

      validatePassword(password);

      if (studentId) {
        validateStudentId(studentId);
      }
      if (role) {
        validateRole(role);
      }
      validateUserName(name);

      const user = await register(data);

      setUser(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    error,
    loading,

    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
};
