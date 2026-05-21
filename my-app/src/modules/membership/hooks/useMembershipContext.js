import { useContext } from "react";
import { MembershipContext } from "../context/MembershipContext.jsx";

export const useMembershipContext = () => {
  const data = useContext(MembershipContext);

  if (!data) {
    throw new Error(
      "useMembershipContext must be used within MembershipContextProvider",
    );
  }

  return data;
};
