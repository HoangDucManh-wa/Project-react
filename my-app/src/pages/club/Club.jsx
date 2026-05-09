import { useClubContext } from "../../context/ClubContext";
import { useEffect, useState } from "react";
import "./Club.css";

const categories = ["academic", "sports", "volunteer", "other"];

export function ClubPage() {
  const { clubs, pending, getClubs, getClubsByName, getClubsByCategory } =
    useClubContext();

  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { pageNumber } = await getClubs({ page, limit: 10 });
      setPageTotal(pageNumber);
    };
    fetchData();
  }, [page]);

  const handle_getClubsByName = async () => {
    if (!name.trim()) return;
    await getClubsByName({ name });
  };

  const handle_getClubsByCategory = async () => {
    if (!categories.includes(category)) return;
    await getClubsByCategory({ category });
  };

  return (
    <div className="club-page">
      {/* ── Hero ── */}
      <div className="club-hero">
        <h1>
          Explore <span>Clubs</span>
        </h1>
        <p>Find your community</p>
      </div>

      {/* ── Search / Filter bar ── */}
      <div className="club-header">
        {/* Search by name */}
        <div className="search-group">
          <span className="search-label">Name</span>
          <input
            className="search-input"
            placeholder="Search by name…"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handle_getClubsByName()}
          />
          <button className="btn-action" onClick={handle_getClubsByName}>
            Search
          </button>
        </div>

        <div className="search-divider" />

        {/* Filter by category */}
        <div className="search-group">
          <span className="search-label">Category</span>
          <select
            className="search-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((x) => (
              <option key={x} value={x}>
                {x.charAt(0).toUpperCase() + x.slice(1)}
              </option>
            ))}
          </select>
          <button className="btn-action" onClick={handle_getClubsByCategory}>
            Filter
          </button>
        </div>
      </div>

      {/* ── List ── */}
      <div className="clubs-list">
        {/* Pagination bar */}
        <div className="pagination-bar">
          {pending ? (
            <div className="loading-state">
              <div className="loading-dot" />
              <div className="loading-dot" />
              <div className="loading-dot" />
            </div>
          ) : (
            <span className="pagination-info">
              Page <strong>{page}</strong> of <strong>{pageTotal}</strong>
            </span>
          )}

          <div className="pagination-btns">
            <button
              className="btn-page"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              aria-label="Previous page"
            >
              ‹
            </button>
            <button
              className="btn-page"
              disabled={page >= pageTotal}
              onClick={() => setPage(page + 1)}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>

        {/* Cards */}
        {!pending &&
          clubs.map((x) => (
            <div key={x.id} className="club-card">
              <div className="club-top">
                <span className="clubName">{x.clubName}</span>
                <span className="clubCategory">{x.category}</span>
              </div>
              <p className="clubDescription">{x.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
