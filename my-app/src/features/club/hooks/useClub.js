import {
  getClubsByCategoryService,
  getClubByIdService,
  getClubsByKeywordsService,
  getClubsService,
  createClubService,
  updateClubService,
  deleteClubService,
} from "../services/clubService";

import { useCallback, useState } from "react";

export const useClub = () => {
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handle = useCallback(async (callback, data) => {
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
  }, []);

  const handle_getClubs = useCallback(
    async ({ page, limit }) => {
      const result = await handle(getClubsService, { page, limit });
      const { clubs } = result;
      setClubs(clubs);
      return result;
    },
    [handle],
  );

  const handle_getClubsByKeywords = useCallback(
    async ({ name }) => {
      const result = await handle(getClubsByKeywordsService, {
        field,
        name,
        page,
        limit,
      });
      const { clubs } = result;
      setClubs(clubs);
      return result;
    },
    [handle],
  );

  const handle_getClubsByCategory = useCallback(
    async ({ category }) => {
      const result = await handle(getClubsByCategoryService, { category });
      const { clubs } = result;
      setClubs(clubs);
      return result;
    },
    [handle],
  );

  const handle_getClubById = useCallback(
    async ({ id }) => {
      const club = await handle(getClubByIdService, { id });
      setClub(club);
      return club;
    },
    [handle],
  );

  const handle_createClub = useCallback(
    async (clubData) => {
      const club = await handle(createClubService, clubData);
      setClub(club);
      return club;
    },
    [handle],
  );

  const handle_updateClub = useCallback(
    async ({ id, clubData }) => {
      const club = await handle(updateClubService, { id, clubData });
      setClub(club);
      return club;
    },
    [handle],
  );

  const handle_deleteClub = useCallback(
    async ({ id }) => {
      const message = await handle(deleteClubService, { id });
      return message;
    },
    [handle],
  );

  return {
    clubs,
    setClubs,
    club,
    pending,
    error,
    getClubs: handle_getClubs,
    getClubsByKeywords: handle_getClubsByKeywords,
    getClubsByCategory: handle_getClubsByCategory,
    getClubById: handle_getClubById,
    createClub: handle_createClub,
    updateClub: handle_updateClub,
    deleteClub: handle_deleteClub,
  };
};
