import { ClubContext } from "./ClubContext.jsx";
import { useClub } from "../hooks/useClub.js";

export const ClubProvider = ({ children }) => {
  const data = useClub();

  return <ClubContext.Provider value={data}>{children}</ClubContext.Provider>;
};
