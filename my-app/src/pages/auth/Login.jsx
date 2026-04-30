import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx";

import Input from "../../components/Input";
import Button from "../../components/Button";
import "./Login.css";

export const LoginPage = () => {
  const { login, state, error, user } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    await login({ email, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <div className="login-form">
          <div className="form-group">
            <label>Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button onClick={handleLogin} disabled={state === "pending"}>
            {state === "pending" ? "Logging in..." : "Login"}
          </Button>

          {state === "fail" && <p className="login-error">{error}</p>}
        </div>
      </div>
    </div>
  );
};
