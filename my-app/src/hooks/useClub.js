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
  const [club, setClub] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handle = async (callback, data) => {
    setError("");
    setPending(true);

    try {
      const result = await callback(data);
      return result;
    } catch (err) {
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setPending(false);
    }
  };

  const handle_getClubs = async ({ page, limit }) => {
    const result = await handle(getClubsService, { page, limit });
    const { clubs } = result;
    setClubs(clubs);
    return result;
  };

  const handle_getClubsByName = async ({ name }) => {
    const result = await handle(getClubsByNameService, { name });
    const { clubs } = result;
    setClubs(clubs);
    return result;
  };

  const handle_getClubsByCategory = async ({ category }) => {
    const result = await handle(getClubsByCategoryService, { category });
    const { clubs } = result;
    setClubs(clubs);
    return result;
  };

  const handle_getClubById = async ({ id }) => {
    const club = await handle(getClubByIdService, { id });
    setClub(club);
    return club;
  };

  const handle_createClub = async (clubData) => {
    const club = await handle(createClubService, clubData);
    setClub(club);
    return club;
  };

  const handle_updateClub = async ({ id, clubData }) => {
    const club = await handle(updateClubService, { id, clubData });
    setClub(club);
    return club;
  };

  const handle_deleteClub = async ({ id }) => {
    const message = await handle(deleteClubService, { id });
    return message;
  };

  return {
    clubs,
    club,
    pending,
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
