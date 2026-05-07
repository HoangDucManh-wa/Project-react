import { useEffect, useState } from "react";
import { useClubContext } from "../../context/ClubContext";
import { useAuthContext } from "../../context/AuthContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./Club.css";

export const ClubPage = () => {
  const {
    clubs,
    club,
    loading,
    error,
    getClubs,
    getClubsByName,
    getClubsByCategory,
    createClub,
    updateClub,
    deleteClub,
  } = useClubContext();

  const { user } = useAuthContext();

  const isAdmin = user?.role === "admin";
  const clubList = clubs?.clubs || [];
  const currentPage = clubs?.page || 1;
  const currentLimit = clubs?.limit || 10;
  const pageNumber = clubs?.pageNumber || 1;
  const total = clubs?.total || clubList.length;

  const [searchName, setSearchName] = useState("");
  const [category, setCategory] = useState("");

  const [form, setForm] = useState({
    clubName: "",
    description: "",
    category: "",
    leaderId: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getClubs({ page: 1, limit: 10 });
  }, []);

  const handleChangePage = (page) => {
    if (page < 1 || page > pageNumber) return;
    getClubs({ page, limit: currentLimit });
  };

  const handleSearchByName = async () => {
    if (!searchName.trim()) {
      getClubs({ page: 1, limit: 10 });
      return;
    }

    await getClubsByName({ name: searchName });
  };

  const handleSearchByCategory = async () => {
    if (!category.trim()) {
      getClubs({ page: 1, limit: 10 });
      return;
    }

    await getClubsByCategory({ category });
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitClub = async () => {
    if (!isAdmin) return;
    console.log(JSON.stringify(form));
    if (editingId) {
      await updateClub({
        id: editingId,
        clubData: form,
      });
      setEditingId(null);
    } else {
      await createClub(form);
    }

    setForm({
      clubName: "",
      description: "",
      category: "",
      leaderId: "",
    });

    getClubs({ page: 1, limit: 10 });
  };

  const handleEditClub = (club) => {
    setEditingId(club._id || club.id);
    setForm({
      clubName: club.clubName || "",
      description: club.description || "",
      category: club.category || "",
    });
  };

  const handleDeleteClub = async (id) => {
    if (!isAdmin) return;

    await deleteClub({ id });
    getClubs({ page: 1, limit: 10 });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      clubName: "",
      description: "",
      category: "",
    });
  };
  return (
    <div className="club-page">
      <div className="club-header">
        <div>
          <h2>Clubs</h2>
          <p>Explore student clubs and activities.</p>
        </div>
      </div>

      <div className="club-toolbar">
        <div className="club-search">
          <label>Name:</label>
          <Input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button size="small" onClick={handleSearchByName}>
            Search
          </Button>
        </div>

        <div className="club-search">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="academic">academic</option>
            <option value="sports">sports</option>
            <option value="volunteer">volunteer</option>
            <option value="other">other</option>
          </select>
          <Button size="small" onClick={handleSearchByCategory}>
            Filter
          </Button>
        </div>
      </div>

      {isAdmin && (
        <div className="club-form">
          <h3>{editingId ? "Update Club" : "Create Club"}</h3>

          <Input
            type="text"
            name="clubName"
            placeholder="Club name"
            value={form.clubName}
            onChange={handleChangeForm}
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChangeForm}
          >
            <option value="">Select category</option>
            <option value="academic">academic</option>
            <option value="sports">sports</option>
            <option value="volunteer">volunteer</option>
            <option value="other">other</option>
          </select>

          <Input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChangeForm}
          />
          {!editingId && (
            <Input
              type="text"
              name="leaderId"
              placeholder="Leader Id"
              value={form.leaderId}
              onChange={handleChangeForm}
            />
          )}
          <div className="club-form-actions">
            <Button size="small" onClick={handleSubmitClub}>
              {editingId ? "Update" : "Create"}
            </Button>

            {editingId && (
              <Button
                size="small"
                variant="secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}

      {loading && <p>Loading clubs...</p>}

      {error && <p className="club-error">{error}</p>}

      {!loading && clubList.length === 0 && <p>No clubs found.</p>}

      {!loading && clubList.length > 0 && (
        <div className="club-pagination">
          <span>
            Page {currentPage} / {pageNumber}
          </span>
          <span>Total: {total}</span>
          <Button
            size="small"
            variant="secondary"
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage >= pageNumber}
          >
            Next
          </Button>
        </div>
      )}

      <div className="club-list">
        {clubList.map((club) => {
          const clubId = club._id || club.id;

          return (
            <div className="club-card" key={clubId}>
              <div>
                <h3>{club.clubName}</h3>
                <p>{club.description}</p>
                <span>{club.category}</span>
              </div>

              {isAdmin && (
                <div className="club-actions">
                  <Button
                    size="small"
                    variant="secondary"
                    onClick={() => handleEditClub(club)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => handleDeleteClub(clubId)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
