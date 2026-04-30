import {
  getClubsByCategoryService,
  getClubByIdService,
  getClubsByNameService,
  getClubsService,
  createClubService,
  updateClubService,
  deleteClubService,
} from "../services/clubService";

import { useState } from "react";

export const useClub = () => {
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState(null); // dùng cho get by id
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 wrapper xử lý async chung
  const handleAsync = async (callback) => {
    setError(null);
    setLoading(true);
    try {
      const result = await callback();
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // GET ALL
  const handle_getClubs = async ({ page, limit }) => {
    const result = await handleAsync(() => getClubsService({ page, limit }));
    if (result) setClubs(result);
  };

  // SEARCH NAME
  const handle_getClubsByName = async ({ name }) => {
    const result = await handleAsync(() => getClubsByNameService({ name }));
    if (result) setClubs(result);
  };

  // SEARCH CATEGORY
  const handle_getClubsByCategory = async ({ category }) => {
    const result = await handleAsync(() =>
      getClubsByCategoryService({ category }),
    );
    if (result) setClubs(result);
  };

  // GET BY ID
  const handle_getClubById = async ({ id }) => {
    const result = await handleAsync(() => getClubByIdService({ id }));
    if (result) setClub(result);
  };

  // CREATE
  const handle_createClub = async (clubData) => {
    const result = await handleAsync(() => createClubService(clubData));
    return result;
  };

  // UPDATE
  const handle_updateClub = async ({ id, clubData }) => {
    const result = await handleAsync(() => updateClubService({ id, clubData }));
    return result;
  };

  // DELETE
  const handle_deleteClub = async ({ id }) => {
    const result = await handleAsync(() => deleteClubService({ id }));
    return result;
  };

  return {
    clubs,
    club,
    loading,
    error,

    getClubs: handle_getClubs,
    getClubsByName: handle_getClubsByName,
    getClubsByCategory: handle_getClubsByCategory,
    getClubById: handle_getClubById,

    createClub: handle_createClub,
    updateClub: handle_updateClub,
    deleteClub: handle_deleteClub,
  };
};
