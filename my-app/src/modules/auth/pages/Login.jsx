import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import "./Login.css";

export const LoginPage = () => {
  const { login, loading, error, user } = useAuthContext();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    await login({
      email,
      password,
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      <div className="login-shell">
        <section className="login-hero" aria-label="Welcome">
          <p className="login-kicker">Welcome back</p>
          <h1>Connect with student communities.</h1>
          <p>
            Join clubs, participate in events and competitions, and stay active
            in one platform.
          </p>
        </section>

        <div className="login-box">
          <div className="login-header">
            <p className="login-kicker">Account</p>
            <h2 className="login-title">Login</h2>
            <p className="login-subtitle">
              Enter your credentials to continue.
            </p>
          </div>

          <div className="login-form">
            <div className="form-group">
              <label>Email</label>

              <Input
                type="email"
                value={email}
                variant="primary"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <Input
                type="password"
                value={password}
                variant="primary"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button size="large" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            {error && <p className="login-error">{error}</p>}

            <div className="auth-switch">
              <span>You don't have an account yet?</span>
              <button
                type="button"
                className="auth-switch__button"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
