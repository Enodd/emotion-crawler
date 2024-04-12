import { DungeonProviderContext } from "@providers/DungeonProvider";
import { useContext } from "react";

export const useDungeonProvider = () => {
  const data = useContext(DungeonProviderContext);
  return data;
};
