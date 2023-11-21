import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("you whould consume the user Provider");

  return context;
};
