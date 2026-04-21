import { useAuthContext } from "../context/AuthContext";
const Home = () => {
  const { user, logout } = useAuthContext();
  return (
    <div>
      <h2>Home</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
};
export default Home;
