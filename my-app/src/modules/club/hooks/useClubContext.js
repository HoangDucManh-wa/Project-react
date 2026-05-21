import { useContext } from "react";
import { ClubContext } from "../context/ClubContext.jsx";

export const useClubContext = () => {
  const data = useContext(ClubContext);

  if (!data) {
    throw new Error("useClubContext must be within ClubProvider");
  }

  return data;
};
