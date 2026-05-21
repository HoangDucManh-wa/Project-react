import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL_SERVICE } from "../../../shared/config";
import "./Home.css";

export default function Home() {
  const [clubs, setClubs] = useState([]);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubsRes = await fetch(`${API_URL_SERVICE}/club?page=1&limit=3`);
        const clubsData = await clubsRes.json();

        const actRes = await fetch(`${API_URL_SERVICE}/activity`);
        const actData = await actRes.json();

        setClubs(clubsData?.data?.clubs || clubsData?.clubs || []);
        setActivities(actData?.data?.activities || actData?.activities || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="welcome">
        <h2>Welcome back 👋</h2>
        <p>Here’s what’s happening today</p>
      </div>

      {/* Activities */}
      <section className="section">
        <div className="section-header">
          <h3>🔥 Upcoming Activities</h3>
          <span onClick={() => navigate("/activity/event")}>
            View all →
          </span>
        </div>

        <div className="card-grid">
          {activities.slice(0, 3).map((a) => (
            <div
              key={a.id}
              className="card"
              onClick={() => navigate(`/activity/${a.id}`)}
            >
              <h4>{a.name}</h4>
              <p>{a.description}</p>
              <span className="tag">{a.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Clubs */}
      <section className="section">
        <div className="section-header">
          <h3>🏫 Clubs</h3>
          <span onClick={() => navigate("/club")}>View all →</span>
        </div>

        <div className="card-grid">
          {clubs.slice(0, 3).map((c) => (
            <div
              key={c.id}
              className="card"
              onClick={() => navigate(`/club/${c.id}`)}
            >
              <h4>{c.name}</h4>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
