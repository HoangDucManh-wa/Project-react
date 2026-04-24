// layouts/MainLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import "./MainLayout.css";
import { BASE_URL } from "../config/index";
export default function MainLayout() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="logo">Student Portal</h3>

        <nav className="nav">
          <p onClick={() => navigate(`${BASE_URL}`)}>Dashboard</p>
        </nav>
      </aside>

      {/* Main */}
      <div className="main">
        {/* Header */}
        <header className="header">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </header>

        {/* Content */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
