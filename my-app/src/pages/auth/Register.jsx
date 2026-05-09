import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [name, setName] = useState("");

  const [studentId, setStudentId] = useState("");

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
    };

    await register(data);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <div>
        <label>Name:</label>

        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div>
        <label>Email:</label>

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div>
        <label>Password:</label>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div>
        <label>StudentId:</label>

        <input
          type="text"
          value={studentId}
          onChange={(e) => {
            setStudentId(e.target.value);
          }}
        />
      </div>

      <div>
        <label>University:</label>

        <input
          type="text"
          value={university}
          onChange={(e) => {
            setUniversity(e.target.value);
          }}
        />
      </div>

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
