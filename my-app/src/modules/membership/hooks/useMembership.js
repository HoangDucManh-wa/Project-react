import {
  joinClubService,
  leaveClubService,
  getClubMembersService,
  getUserClubsService,
  updateMemberRoleByAdminService,
  deleteMemberByAdminService,
} from "../services/membershipService";
import { useCallback, useState } from "react";
export const useMembership = () => {
  const [membership, setMembership] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const handleService = useCallback(async (callback, data) => {
    setMembership(null);
    setIsLoading(true);
    setError("");
    try {
      const callbackData = await callback(data);
      return callbackData;
    } catch (err) {
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const joinClub = useCallback(
    async ({ clubId }) => {
      const membership = await handleService(joinClubService, { clubId });
      if (membership) {
        setMembership(membership);
      }
      return membership;
    },
    [handleService],
  );
  const leaveClub = useCallback(
    async ({ clubId }) => {
      const membership = await handleService(leaveClubService, { clubId });
      if (membership) {
        setMembership(membership);
      }
      return membership;
    },
    [handleService],
  );
  const getClubMembers = useCallback(
    async ({ clubId }) => {
      const members = await handleService(getClubMembersService, { clubId });
      setMembers(members || []);
      return members;
    },
    [handleService],
  );
  const getUserClubs = useCallback(async () => {
    const clubs = await handleService(getUserClubsService);
    setClubs(clubs || []);
    return clubs;
  }, [handleService]);
  const updateMemberRoleByAdmin = useCallback(
    async ({ clubId, memberId, roleInClub }) => {
      const membership = await handleService(updateMemberRoleByAdminService, {
        clubId,
        memberId,
        roleInClub,
      });
      if (membership) {
        setMembership(membership);
      }
      return membership;
    },
    [handleService],
  );
  const deleteMemberByAdmin = useCallback(
    async ({ clubId, memberId }) => {
      const membership = await handleService(deleteMemberByAdminService, {
        clubId,
        memberId,
      });
      if (membership) {
        setMembership(membership);
      }
      return membership;
    },
    [handleService],
  );
  return {
    membership,
    isLoading,
    error,
    members,
    clubs,

    joinClub,
    leaveClub,
    getClubMembers,
    getUserClubs,
    updateMemberRoleByAdmin,
    deleteMemberByAdmin,
  };
};
