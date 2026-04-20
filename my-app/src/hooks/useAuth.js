import { useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateStudentId,
  validateUserName,
} from "../utils/validator.js";
import { login, logout, register } from "../services/authServices.js";
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [state, setState] = useState(null);
  const [error, setError] = useState("");
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
      const message = await logout();
      setState("success");
      setUser(null);
    } catch (err) {
      setError(err.message);
      setState("fail");
    }
  };
  const handleRegister = async (data) => {
    setState("pending");
    setError("");
    try {
      const { email, password, studentId, userName } = data;
      validateEmail(email);
      validatePassword(password);
      if (studentId) {
        validateStudentId(studentId);
      }
      validateUserName(userName);
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
    handleLogin,
    handleLogout,
    handleRegister,
  };
};
