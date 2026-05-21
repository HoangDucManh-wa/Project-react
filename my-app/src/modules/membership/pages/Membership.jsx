import { useMembershipContext } from "../hooks/useMembershipContext";
import { useNavigate } from "react-router-dom";

export const Membership = () => {
  useMembershipContext();
  useNavigate();

  return null;
};
