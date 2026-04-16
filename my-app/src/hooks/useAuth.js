import { useState } from "react";
import { login } from "../services/authService";
const validateEmail = async (email) => {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new Error("Password is required");
  }
  if (typeof password !== "string") {
    throw new Error("Password must be a string");
  }

  let lengthPassword = password.length;

  if (lengthPassword < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  if (lengthPassword > 32) {
    throw new Error("Password must not exceed 32 characters");
  }

  let a = 0,
    b = 0,
    c = 0,
    d = 0;

  for (let i = 0; i < lengthPassword; i++) {
    if (password[i] >= "a" && password[i] <= "z") {
      a++;
    } else if (password[i] >= "0" && password[i] <= "9") {
      b++;
    } else if (password[i] >= "A" && password[i] <= "Z") {
      c++;
    } else {
      d++;
    }
  }

  if (!(a && b && c && d)) {
    throw new Error(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    );
  }

  for (let i = 0; i < lengthPassword; i++) {
    if (password[i] === " ") {
      throw new Error("Password must not contain spaces");
    }
  }
};
export function useAuth() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password }) => {
    // reset error
    setError("");

    try {
      // validate frontend
      validateEmail(email);
      validatePassword(password);
      setLoading(true);

      const data = await login({ email, password });

      // giả sử backend trả về { user, token }
      setUserId(data.userId);

      // lưu token (tạm thời localStorage)
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem("token");
  };

  return {
    userId,
    loading,
    error,
    handleLogin,
    handleLogout,
  };
}
