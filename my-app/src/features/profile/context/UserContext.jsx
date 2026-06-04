import { useUserService } from "../services/user.service";
import { createContext, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const data = useUserService();
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const data = useContext(UserContext);
  if (!data) {
    throw new Error("useUserContext must be in UserProvider");
  }
  return data;
};
