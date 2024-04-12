import dayjs, { Dayjs } from "dayjs";
import { createContext, useState } from "react";

export const DungeonProviderContext = createContext<{
  emotions: Set<number>;
  player: Player;
  setPlayer: (value: Player) => void;
  setEmotion: (value: Set<number>) => void;
}>({
  emotions: new Set<number>(),
  player: {
    playerHp: 0,
    playerId: 4,
    runType: false,
    encounters: [],
  },
  setPlayer: () => {},
  setEmotion: () => {},
});

export interface Player {
  playerId: number;
  playerHp: number;
  runType: boolean;
  encounters: Array<{
    encounterStart: Dayjs;
    encounterEnd: Dayjs;
    expectedEmotion: string;
    answered: string;
    isCorrect: boolean;
  }>;
}

export const DungeonProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [emotions, setEmotion] = useState<Set<number>>(new Set());
  const [player, setPlayer] = useState<Player>({
    playerHp: 0,
    playerId: 0,
    encounters: [],
    runType: false,
  });
  return (
    <DungeonProviderContext.Provider
      value={{
        player,
        setPlayer,
        emotions,
        setEmotion,
      }}
    >
      {children}
    </DungeonProviderContext.Provider>
  );
};
