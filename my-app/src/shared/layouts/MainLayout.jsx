import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../../features/auth/context/AuthContext";
import { BASE_URL } from "../config";
import "./MainLayout.css";

const basePath = BASE_URL || "";
const navItems = [
  { label: "Home", path: basePath },
  { label: "Club", path: `${basePath}/club` },
  { label: "Profile", path: `${basePath}/profile` },
];

const MainLayout = () => {
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
            src="/Logo-DH-Cong-Nghe-UET.webp"
            alt="UET"
          />
          <div>
            <span className="logo-box__title">UET Club</span>
            <span className="logo-box__subtitle">Management</span>
          </div>
        </div>

        <nav className="main-layout__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === basePath}
              className={({ isActive }) =>
                isActive
                  ? "main-layout__nav-link main-layout__nav-link--active"
                  : "main-layout__nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-layout__content">
        <header className="main-layout__header">
          <div>
            <span className="main-layout__eyebrow">Dashboard</span>
            <h1 className="main-layout__welcome">
              Welcome, {user?.name || "User"}
            </h1>
          </div>

          <div className="main-layout__actions">
            {error && <span className="main-layout__error">{error}</span>}

            <button
              className="main-layout__logout"
              type="button"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </header>

        <div className="main-layout__body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
