import { UserConnectionContext } from "@providers/UserConnectionProvider";
import { useContext } from "react";

export const useUserProvider = () => {
  const data = useContext(UserConnectionContext);
  return data;
};
