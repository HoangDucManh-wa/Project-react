import { useState, useEffect } from "react";
import {
  validateEmail,
  validatePassword,
  validateStudentId,
  validateUserName,
} from "../utils/validator.js";
import { login, logout, register, getMe } from "../services/authServices.js";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [state, setState] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((user) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async ({ email, password }) => {
    setState("pending");
    setError("");
    try {
      validateEmail(email);
      validatePassword(password);
      const user = await login({ email, password });
      setUser(user);
      setState("success");
    } catch (err) {
      setError(err.message);
      setState("fail");
    }
  };

  const handleLogout = async () => {
    setState("pending");
    setError("");
    try {
      await logout();
      setUser(null);
      setState("success");
    } catch (err) {
      setError(err.message);
      setState("fail");
    }
  };

  const handleRegister = async (data) => {
    setState("pending");
    setError("");
    try {
      const { email, password, studentId, name } = data;
      validateEmail(email);
      validatePassword(password);
      if (studentId) validateStudentId(studentId);
      validateUserName(name);

      const user = await register(data);
      setUser(user);
      setState("success");
    } catch (err) {
      setError(err.message);
      setState("fail");
    }
  };

  return {
    user,
    state,
    error,
    loading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
};
