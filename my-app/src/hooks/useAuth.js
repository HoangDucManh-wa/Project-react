import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validator.js";
import { login } from "../services/authServices.js";
export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [state, setState] = useState(null);
  const [error, setError] = useState("");
  const handleLogin = async ({ email, password }) => {
    setState("pending");
    setError("");
    try {
      validateEmail(email);
      validatePassword(password);
      const id = await login({ email, password });
      setUserId(id);
      setState("success");
    } catch (err) {
      setError(err.message);
      setState("fail");
    }
  };
  const handleLogout = async () => {};
};
