import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import "./MainLayout.css";
import { BASE_URL } from "../config/index";

export default function MainLayout() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const [openActivity, setOpenActivity] = useState(false);

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
        {/* Logo */}
        <div className="logo-section">
          <img src="/logo.png" alt="school logo" className="logo-img" />
          <h3>Student Portal</h3>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <p onClick={() => navigate(`${BASE_URL}`)}>Dashboard</p>

          <p onClick={() => navigate(`${BASE_URL}/club`)}>Clubs</p>

          {/* Activity */}
          <div>
            <p onClick={() => setOpenActivity(!openActivity)}>
              Activity {openActivity ? "▲" : "▼"}
            </p>

            {openActivity && (
              <div className="submenu">
                <p onClick={() => navigate(`${BASE_URL}/activity/event`)}>
                  Event
                </p>
                <p onClick={() => navigate(`${BASE_URL}/activity/competition`)}>
                  Competition
                </p>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="main">
        <header className="header">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
