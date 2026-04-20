// import { useState } from "react";
// import { useAuthContext } from "../context/AuthContext";

// export default function Login() {
//   const { login, loading } = useAuthContext();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     await login(email, password);
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
//       <input
//         placeholder="password"
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin} disabled={loading}>
//         Login
//       </button>
//     </div>
//   );
// }
