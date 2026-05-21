import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import "./Register.css";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [name, setName] = useState("");

  const [studentId, setStudentId] = useState("");
  const [role, setRole] = useState("");
  const [university, setUniversity] = useState("");

  const { register, loading, error, user } = useAuthContext();

  const navigate = useNavigate();

  const handleRegister = async () => {
    const data = {
      name,
      email,
      password,
      studentId,
      university,
      role,
    };

    await register(data);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="register-container">
      <div className="register-shell">
        <section className="register-hero" aria-label="Create account">
          <p className="register-kicker">Join the system</p>
          <h1>Create your account.</h1>
          <p>
            Register with your university profile to explore clubs, join
            communities, and manage your activity.
          </p>
        </section>

        <div className="register-box">
          <div className="register-header">
            <p className="register-kicker">New account</p>
            <h2 className="register-title">Register</h2>
            <p className="register-subtitle">
              Fill in your details to get started.
            </p>
          </div>

          <div className="register-form">
            <div className="register-grid">
              <div className="form-group">
                <label>Name</label>

                <Input
                  type="text"
                  value={name}
                  variant="primary"
                  placeholder="Your full name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <Input
                  type="email"
                  value={email}
                  variant="primary"
                  placeholder="you@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <Input
                  type="password"
                  value={password}
                  variant="primary"
                  placeholder="Create a strong password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Student ID</label>

                <Input
                  type="text"
                  value={studentId}
                  variant="primary"
                  placeholder="Student number"
                  onChange={(e) => {
                    setStudentId(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>University</label>

                <Input
                  type="text"
                  value={university}
                  variant="primary"
                  placeholder="University name"
                  onChange={(e) => {
                    setUniversity(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Role</label>

                <select
                  className="register-select"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="">Select role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>

            <Button size="large" onClick={handleRegister} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>

            {error && <p className="register-error">{error}</p>}

            <div className="auth-switch">
              <span>Already have an account?</span>
              <button
                type="button"
                className="auth-switch__button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
