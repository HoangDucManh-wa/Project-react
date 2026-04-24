import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  console.log("Register running");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [university, setUniversity] = useState("");

  const { register, state, error } = useAuthContext();
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const data = { name, email, password, studentId, university };
      await register(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (state === "success") {
      navigate("/");
    }
  }, [state, navigate]);

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

      <button onClick={handleRegister} disabled={state === "pending"}>
        {state === "pending" ? "Registering..." : "Register"}
      </button>

      {state === "fail" && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
