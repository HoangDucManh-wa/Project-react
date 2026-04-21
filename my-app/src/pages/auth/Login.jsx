import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, state, error } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // check rỗng đơn giản
    if (!email || !password) return;

    await login({ email, password });

    // chỉ redirect khi success
    if (state === "success") {
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={state === "pending"}>
        {state === "pending" ? "Logging in..." : "Login"}
      </button>

      {/* hiển thị lỗi */}
      {state === "fail" && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
