import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/index.js";
const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div>
      <h2>Home</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
export default Home;
