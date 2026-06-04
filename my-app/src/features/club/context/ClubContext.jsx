import { useClub } from "../hooks/useClub.js";
import { createContext, useContext } from "react";
const ClubContext = createContext(null);
export const ClubProvider = ({ children }) => {
  const data = useClub();
  return <ClubContext.Provider value={data}>{children}</ClubContext.Provider>;
};
export const useClubContext = () => {
  const data = useContext(ClubContext);
  if (!data) {
    throw new Error("useClubContext must be within ClubProvider");
  }
  return data;
};
