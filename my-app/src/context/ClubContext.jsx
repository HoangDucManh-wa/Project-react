import { createContext, useContext } from "react";
import { useClub } from "../hooks/useClub";
const ClubContext = createContext(null);
export const ClubProvider = ({ children }) => {
  const clubData = useClub();
  return (
    <ClubContext.Provider value={clubData}>{children}</ClubContext.Provider>
  );
};
export const useClubContext = () => {
  const clubData = useContext(ClubContext);
  if (!clubData) {
    throw new Error("useClubContext must be within ClubProvider");
  }
  return clubData;
};
