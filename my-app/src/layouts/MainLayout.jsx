// layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header style={{ padding: 10, fontWeight: "bold" }}>
        student-portal
      </header>

      <main style={{ padding: 10 }}>
        <Outlet />
      </main>
    </div>
  );
}
