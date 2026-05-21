import { MembershipContext } from "./MembershipContext.jsx";
import { useMembership } from "../hooks/useMembership";

export const MembershipProvider = ({ children }) => {
  const data = useMembership();

  return (
    <MembershipContext.Provider value={data}>
      {children}
    </MembershipContext.Provider>
  );
};
