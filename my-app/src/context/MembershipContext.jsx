import { useMembership } from "../hooks/useMembership";
import { createContext, useContext } from "react";
const MembershipContext = createContext(null);
export const MembershipProvider = ({ children }) => {
  const data = useMembership();
  return (
    <MembershipContext.Provider value={data}>
      {children}
    </MembershipContext.Provider>
  );
};
export const useMembershipContext = () => {
  const data = useContext(MembershipContext);
  if (!data) {
    throw new Error(
      "useMembershipContext must be used within MembershipContextProvider",
    );
  }
  return data;
};
