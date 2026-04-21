import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuthContext();

  return (
    <div>
      <h2>Home</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
