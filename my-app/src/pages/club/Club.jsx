import { useEffect, useState } from "react";
import { useClubContext } from "../../context/ClubContext";
import { useMembershipContext } from "../../context/MembershipContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./Club.css";

const categories = ["academic", "sports", "volunteer", "other"];

export function ClubPage() {
  const { clubs, pending, getClubs, getClubsByName, getClubsByCategory } =
    useClubContext();

  const {
    isLoading,
    error,
    clubs: joinedClubs,
    joinClub,
    leaveClub,
    getUserClubs,
  } = useMembershipContext();

  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const [name, setName] = useState(""); //This is the name of a club
  const [category, setCategory] = useState("");
  const [buttonId, setButtonId] = useState(null); //Take id of the club when click the button
  const [memberCountOverrides, setMemberCountOverrides] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { pageNumber } = await getClubs({ page, limit: 10 });
      setPageTotal(pageNumber || 0);
    };

    fetchData();
  }, [getClubs, page]);

  useEffect(() => {
    getUserClubs();
  }, [getUserClubs]);

  const getClubId = (club) => club?._id; //If database uses MongoDB

  const getMemberCount = (club) => {
    const clubId = getClubId(club);
    return memberCountOverrides[clubId] ?? club.memberCount;
  };

  const updateMemberCount = (clubId, delta, fallbackCount = 0) => {
    setMemberCountOverrides((prev) => {
      const current = prev[clubId] ?? fallbackCount;

      return {
        ...prev,
        [clubId]: Math.max(0, current + delta),
      };
    });
  };

  const isJoined = (clubId) => {
    if (!clubId || !joinedClubs?.length) return false;

    return joinedClubs.some((item) => {
      const joinedClub = item; //If backend responds that joinedClubs only includes clubs
      const joinedClubId = getClubId(joinedClub);

      return joinedClubId === clubId;
    });
  };

  const handle_getClubsByName = async () => {
    if (!name.trim()) return;
    await getClubsByName({ name: name.trim() });
  };

  const handle_getClubsByCategory = async () => {
    if (!categories.includes(category)) {
      setPage(1);
      const { pageNumber } = await getClubs({ page: 1, limit: 10 });
      setPageTotal(pageNumber || 0);
      return;
    }

    await getClubsByCategory({ category });
  };

  const handle_joinClub = async (club) => {
    const clubId = getClubId(club);
    if (!clubId || isJoined(clubId)) return;

    setButtonId(clubId);

    try {
      await joinClub({ clubId });
      updateMemberCount(clubId, 1, club.memberCount || 0);
      await getUserClubs();
    } finally {
      setButtonId(null);
    }
  };

  const handle_leaveClub = async (club) => {
    const clubId = getClubId(club);
    if (!clubId || !isJoined(clubId)) return;

    setButtonId(clubId);

    try {
      await leaveClub({ clubId });
      updateMemberCount(clubId, -1, club.memberCount || 0);
      await getUserClubs();
    } finally {
      setButtonId(null);
    }
  };

  const handle_reset = async () => {
    setName("");
    setCategory("");
    setPage(1);
    const { pageNumber } = await getClubs({ page: 1, limit: 10 });
    setPageTotal(pageNumber || 0);
  };

  return (
    <div className="club-page">
      <div className="club-hero">
        <h1>
          Explore <span>Clubs</span>
        </h1>
        <p>Find your community</p>
      </div>

      <div className="club-header">
        <div className="search-group">
          <span className="search-label">Name</span>
          <Input
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handle_getClubsByName()}
          />
          <Button
            onClick={handle_getClubsByName}
            children="Search"
            size="small"
          />
        </div>

        <div className="search-divider" />

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
          <Button size="small" onClick={handle_getClubsByCategory}>
            Filter
          </Button>
        </div>

        <div className="search-divider" />

        <Button size="small" onClick={handle_reset}>
          Reset
        </Button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="clubs-list">
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
              onClick={() => setPage((p) => p - 1)}
              aria-label="Previous page"
            >
              &lsaquo;
            </button>
            <button
              className="btn-page"
              disabled={page >= pageTotal}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
            >
              &rsaquo;
            </button>
          </div>
        </div>

        {!pending && clubs.length === 0 && (
          <p className="empty-state">No clubs found.</p>
        )}

        {!pending &&
          clubs.map((x) => {
            const clubId = getClubId(x);
            const joined = isJoined(clubId);

            return (
              <div
                key={clubId}
                className={`club-card ${joined ? "joined" : ""}`}
              >
                <div className="club-top">
                  <span className="clubName">{x.clubName}</span>
                  <span className="clubCategory">{x.category}</span>
                </div>

                <p className="clubDescription">{x.description}</p>

                {x.memberCount !== undefined && (
                  <span className="club-member-count">
                    {getMemberCount(x)} members
                  </span>
                )}

                <div className="club-actions">
                  {joined ? (
                    <button
                      className="btn-leave"
                      disabled={isLoading && buttonId === clubId}
                      onClick={() => handle_leaveClub(x)}
                    >
                      {isLoading && buttonId === clubId
                        ? "Processing"
                        : "Leave"}
                    </button>
                  ) : (
                    <button
                      className="btn-join"
                      disabled={isLoading && buttonId === clubId}
                      onClick={() => handle_joinClub(x)}
                    >
                      {isLoading && buttonId === clubId ? "Processing" : "Join"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
