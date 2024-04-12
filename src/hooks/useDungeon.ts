import { useEffect, useState } from "react";
import { useUserProvider } from "./useUserProvider";
import Wall1 from "@assets/wall1.png";
import Wall2 from "@assets/wall2.png";
import Wall3 from "@assets/wall3.png";
import Wall4 from "@assets/wall4.png";
import NextLevel from "@assets/NextLevel.png";
import OpenLevel from "@assets/OpenLevel.png";
import Floor from "@assets/floor1.png";
import Floor2 from "@assets/floor2.png";
import Floor3 from "@assets/floor3.png";
import axios from "axios";
import tutorielJSON from "@assets/tutoriel.json";
import Rooms from "@assets/tutoriel_rooms.json";
import { useDungeonProvider } from "./useDungeonProvider";
import { Player } from "@providers/DungeonProvider";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// const _level = [1, 2, 3, 2, 3];
// const _room = [
//   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 2, 2, 2, 3, 2, 2, 2, 2, 2, 0],
//   [0, 2, 5, 2, 5, 2, 2, 2, 2, 2, 0],
//   [0, 3, 2, 2, 2, 2, 2, 2, 2, 3, 0],
//   [1, 3, 3, 2, 2, 4, 2, 5, 3, 3, 1],
//   [0, 3, 2, 2, 2, 2, 2, 2, 2, 3, 0],
//   [0, 2, 2, 2, 5, 2, 2, 2, 2, 2, 0],
//   [0, 2, 2, 3, 3, 2, 3, 5, 2, 2, 0],
//   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
// ];
const walls = [Wall1, Wall2, Wall3, Wall4];
const floors = [Floor, Floor2, Floor3];

function getRandom(min: number, max: number) {
  const floatRandom = Math.random();

  const difference = max - min;

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom);

  const randomWithinRange = random + min;

  return randomWithinRange;
}
let backgrounds: Array<any[]> = [
  ["", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", ""],
];

export const useDungeon = () => {
  const { user, setUser } = useUserProvider();
  const { player, setPlayer } = useDungeonProvider();
  const [level, setLevel] = useState<Array<number>>([]);
  const [room, setRoom] = useState<Array<number[]>>([[]]);
  const [background, setBackground] = useState<Array<string[]>>([[]]);
  const [enemies, setEnemies] = useState<number>(5);
  const [playerPosition, setPlayerPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 4, y: 5 });
  const move = (fieldId: string) => {
    const [x, y]: string[] = fieldId.split("-");
    const newX = parseInt(x);
    const newY = parseInt(y);
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - newX, 2) +
        Math.pow(playerPosition.y - newY, 2),
    );
    if (distance > 1.5) return;
    room[playerPosition.x][playerPosition.y] = 2;
    setPlayerPosition({ x: newX, y: newY });
    if (room[newX][newY] === 5) {
      setEnemies((prev) => prev - 1);
      updateDoors();
    }
    room[newX][newY] = 7;
  };
  const canPerformAction = (col: number) => {
    return col !== 0;
  };
  const generateRoom = (_room: number[][]) => {
    for (let i = 0; i < _room.length; i++) {
      for (let j = 0; j < _room[i].length; j++) {
        backgrounds[i][j] = defineField(_room[i][j]);
      }
    }
    setBackground(backgrounds);
  };
  const updateDoors = () => {
    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[i].length; j++) {
        if (enemies === 0 && room[i][j] === 1) {
          backgrounds[i][j] = defineField(room[i][j]);
        }
      }
    }
    setBackground(backgrounds);
  };
  const defineField = (fieldValue: number) => {
    switch (fieldValue) {
      case 0: {
        const wall = floors[getRandom(0, 2)];
        return wall;
      }
      case 1: {
        if (enemies === 0) {
          return OpenLevel;
        }
        return NextLevel;
      }
      default: {
        return walls[getRandom(0, 3)];
      }
    }
  };
  const changeRoom = async () => {
    //send data to db
    try {
      console.log("room change");
      await Promise.all(
        player.encounters.map(async (encounter: any) => {
          console.log(encounter, {
            userId: player.playerId,
            expectedEmotion: encounter.expectedEmotion,
            startedAt: encounter.encounterStart.toLocaleString(),
            endedAt: encounter.encounterEnd.toLocaleString(),
            chosenOptions: encounter.answered,
            reactionTime: encounter.encounterEnd.diff(
              encounter.encounterStart,
              "seconds",
            ),
            trainingType: player.runType,
            fileName: "1.png",
          });
          const { data } = await instance.post("/encounterSummary", {
            userId: player.playerId,
            expectedEmotion: encounter.expectedEmotion,
            startedAt: encounter.encounterStart.toLocaleString(),
            endedAt: encounter.encounterEnd.toLocaleString(),
            chosenOptions: encounter.answered,
            reactionTime: encounter.encounterEnd.diff(
              encounter.encounterStart,
              "seconds",
            ),
            trainingType: player.runType,
            fileName: "1.png",
          });
          console.log(data);
          return {
            data,
          };
        }),
      );
    } catch (err) {
      console.error(err);
    }
  };
  const fieldAction = (fieldId: number, index: string) => {
    switch (fieldId) {
      case 1: {
        if (enemies > 0) {
          return;
        }
        changeRoom();
        return;
      }
      default:
        move(index);
    }
  };
  const initDungeon = () => {
    let enemiesCount = 0;
    const _level = tutorielJSON[getRandom(0, tutorielJSON.length - 1)];
    const field: any = Object.keys(Rooms).find(
      (field) => field === `${_level[0]}`,
    )
      ? _level[0]
      : undefined;
    const _room = Rooms[field as keyof typeof Rooms];
    setPlayer({
      playerHp: 100,
      playerId: user.userId,
      encounters: [],
      runType: false,
    });
    setUser({ ...user, userHp: user.userHp - 1 });
    setLevel(_level);
    for (let i = 0; i < _room.length; i++) {
      for (let j = 0; j < _room[i].length; j++) {
        if (_room[i][j] === 5) enemiesCount++;
      }
    }
    setRoom(_room);
    setEnemies(enemiesCount);
    generateRoom(_room);
  };

  useEffect(() => {
    initDungeon();
  }, []);

  useEffect(() => {
    updateDoors();
  }, [enemies]);

  return {
    initDungeon,
    playerPosition,
    background,
    level,
    room,
    defineField,
    canPerformAction,
    fieldAction,
    move,
  };
};
