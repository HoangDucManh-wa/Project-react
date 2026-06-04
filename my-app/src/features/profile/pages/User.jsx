import { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import "./User.css";

const initialForm = {
  name: "",
  email: "",
  password: "",
  studentId: "",
  age: "",
  gender: "other",
  relationshipStatus: "single",
  university: "",
  major: "",
  academicYear: "",
};

export const User = () => {
  const {
    user,
    currentUserLoading,
    updateUserLoading,
    error,
    getCurrentUser,
    updateUser,
  } = useUserContext();
  const [form, setForm] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");

  const userId = user?._id || user?.id;
  const initials = useMemo(() => {
    const words = (user?.name || form.name || "User").trim().split(/\s+/);
    return words
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("");
  }, [form.name, user?.name]);

  useEffect(() => {
    getCurrentUser().catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      studentId: user.studentId || "",
      age: user.age || "",
      gender: user.gender || "other",
      relationshipStatus: user.relationshipStatus || "single",
      university: user.university || "",
      major: user.major || "",
      academicYear: user.academicYear || "",
    });
  }, [user]);

  const handleChange = (field) => (event) => {
    setSuccessMessage("");
    setForm((currentForm) => ({
      ...currentForm,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId) return;

    const userData = {
      name: form.name.trim(),
      email: form.email.trim(),
      studentId: form.studentId.trim(),
      age: form.age === "" ? undefined : Number(form.age),
      gender: form.gender,
      relationshipStatus: form.relationshipStatus,
      university: form.university.trim(),
      major: form.major.trim(),
      academicYear:
        form.academicYear === "" ? undefined : Number(form.academicYear),
    };

    if (form.password.trim()) {
      userData.password = form.password;
    }

    try {
      await updateUser({ id: userId, userData });
      setSuccessMessage("Profile updated successfully.");
      setForm((currentForm) => ({ ...currentForm, password: "" }));
    } catch {
      setSuccessMessage("");
    }
  };

  const handleReset = () => {
    if (!user) return;

    setSuccessMessage("");
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      studentId: user.studentId || "",
      age: user.age || "",
      gender: user.gender || "other",
      relationshipStatus: user.relationshipStatus || "single",
      university: user.university || "",
      major: user.major || "",
      academicYear: user.academicYear || "",
    });
  };

  return (
    <div className="profile-page">
      <section className="profile-summary" aria-label="Profile summary">
        <div className="profile-avatar">{initials || "U"}</div>
        <div className="profile-summary__content">
          <p className="profile-kicker">My profile</p>
          <h2>{user?.name || "User profile"}</h2>
          <p>{user?.email || "Update your account and student information."}</p>
        </div>
      </section>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-form__header">
          <div>
            <p className="profile-kicker">Account details</p>
            <h3>Update information</h3>
          </div>
          {currentUserLoading && (
            <span className="profile-status">Loading profile...</span>
          )}
        </div>

        <div className="profile-grid">
          <div className="profile-field">
            <label>Name</label>
            <Input
              value={form.name}
              variant="primary"
              placeholder="Your full name"
              onChange={handleChange("name")}
            />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <Input
              type="email"
              value={form.email}
              variant="primary"
              placeholder="you@example.com"
              onChange={handleChange("email")}
            />
          </div>

          <div className="profile-field">
            <label>Password</label>
            <Input
              type="password"
              value={form.password}
              variant="primary"
              placeholder="Leave blank to keep current password"
              onChange={handleChange("password")}
            />
          </div>

          <div className="profile-field">
            <label>Student ID</label>
            <Input
              value={form.studentId}
              variant="primary"
              placeholder="Student number"
              onChange={handleChange("studentId")}
            />
          </div>

          <div className="profile-field">
            <label>Age</label>
            <Input
              type="number"
              value={form.age}
              variant="primary"
              placeholder="Age"
              onChange={handleChange("age")}
            />
          </div>

          <div className="profile-field">
            <label>Gender</label>
            <select
              className="profile-select"
              value={form.gender}
              onChange={handleChange("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="profile-field">
            <label>Relationship status</label>
            <select
              className="profile-select"
              value={form.relationshipStatus}
              onChange={handleChange("relationshipStatus")}
            >
              <option value="single">Single</option>
              <option value="in_relationship">In relationship</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="profile-field">
            <label>University</label>
            <Input
              value={form.university}
              variant="primary"
              placeholder="University name"
              onChange={handleChange("university")}
            />
          </div>

          <div className="profile-field">
            <label>Major</label>
            <Input
              value={form.major}
              variant="primary"
              placeholder="Your major"
              onChange={handleChange("major")}
            />
          </div>

          <div className="profile-field">
            <label>Academic year</label>
            <Input
              type="number"
              value={form.academicYear}
              variant="primary"
              placeholder="Example: 1 (not 2026)"
              onChange={handleChange("academicYear")}
            />
          </div>
        </div>

        {(error || successMessage) && (
          <p className={error ? "profile-error" : "profile-success"}>
            {error || successMessage}
          </p>
        )}

        <div className="profile-actions">
          <button
            className="profile-reset"
            type="button"
            onClick={handleReset}
            disabled={!user || updateUserLoading}
          >
            Reset
          </button>
          <Button
            type="submit"
            size="large"
            disabled={!userId || currentUserLoading}
            loading={updateUserLoading}
          >
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};
