import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config";
import "./MainLayout.css";
const MainLayout = () => {
  const navigate = useNavigate();

  const { logout, error, user, loading } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="main-layout">
      <aside className="main-layout__sidebar">
        <div className="logo-box">
          <img
            className="logo"
            src="../../public/Logo-DH-Cong-Nghe-UET.webp"
            alt="UET"
          />
        </div>

        <span onClick={() => navigate(`${BASE_URL}`)}>Home</span>
        <span onClick={() => navigate(`${BASE_URL}/club`)}>Club</span>
      </aside>

      <main className="main-layout__content">
        <header className="main-layout__header">
          <span className="main-layout__welcome">Welcome, {user?.name}</span>

          {error && <span>{error}</span>}

          <span className="main-layout__logout" onClick={handleLogout}>
            {loading ? "loading" : "logout"}
          </span>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
