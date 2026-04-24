import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx";

export const LoginPage = () => {
  const { login, state, error, user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log("Login Page", { url: window.location.href });
  const handleLogin = async () => {
    await login({ email, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [state, navigate]);

  return (
    <div>
      <h2>Login</h2>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin} disabled={state === "pending"}>
        {state === "pending" ? "Logging in..." : "Login"}
      </button>

      {state === "fail" && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
