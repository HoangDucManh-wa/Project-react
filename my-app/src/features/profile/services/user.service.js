import { useState } from "react";
import { API_URL_SERVICE } from "../../../shared/config";

export const useUserService = () => {
  const url = `${API_URL_SERVICE}/user`;
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUserLoading, setCurrentUserLoading] = useState(false);
  const [nameUserLoading, setNameUserLoading] = useState(false);
  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const [error, setError] = useState("");
  const getCurrentUser = async () => {
    setError("");
    setCurrentUserLoading(true);
    setUser(null);
    try {
      const response = await fetch(`${url}/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "get current user failed");
      }
      const user = data.data;
      setUser(user);
      return user;
    } catch (err) {
      const message = err.message || "get current user failed";
      setError(message);
      throw new Error(message);
    } finally {
      setCurrentUserLoading(false);
    }
  };
  const getUserByName = async (name) => {
    setError("");
    setNameUserLoading(true);
    setUsers([]);

    try {
      const response = await fetch(`${url}/search?name=${name}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "get user by name failed");
      }
      const users = data.data;
      setUsers(users);
      return users;
    } catch (err) {
      const message = err.message || "get user by name failed";
      setError(message);
      throw new Error(message);
    } finally {
      setNameUserLoading(false);
    }
  };
  const updateUser = async ({ id, userData }) => {
    setError("");
    setUpdateUserLoading(true);

    try {
      const response = await fetch(`${url}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "update user failed");
      }
      const user = data.data;
      setUser(user);
      return user;
    } catch (err) {
      const message = err.message || "update user failed";
      setError(message);
      throw new Error(message);
    } finally {
      setUpdateUserLoading(false);
    }
  };
  return {
    user,
    setUser,
    users,
    setUsers,
    currentUserLoading,
    nameUserLoading,
    updateUserLoading,
    error,
    getCurrentUser,
    getUserByName,
    updateUser,
  };
};
