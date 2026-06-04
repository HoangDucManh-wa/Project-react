import { useMembershipContext } from "../context/MembershipContext";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
export const Membership = () => {
  const {
    membership,
    isLoading,
    error,
    members,
    clubs,

    joinClub,
    leaveClub,
    getClubMembers,
    getUserClubs,
  } = useMembershipContext();
};
