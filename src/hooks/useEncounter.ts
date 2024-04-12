import { useEffect, useState } from "react";
import { useDungeonProvider } from "./useDungeonProvider";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { reactions } from "@models/reactions";
import { Player } from "@providers/DungeonProvider";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

enum Emotions {
  ANGER = "anger",
  CONFUSTION = "confusion",
  CONTEMPT = "contempt",
  DISGUST = "disgust",
  FEAR = "fear",
  HAPPINESS = "happiness",
  SADNESS = "sadness",
  SURPRISE = "suprise",
  TIREDNESS = "tiredness",
}

interface Enemy {
  id: number;
  hp: number;
  image: string;
  name: Emotions;
  actions: string[];
  fightTime: Dayjs;
}
function getRandom(min: number, max: number) {
  const floatRandom = Math.random();
  const difference = max - min;
  const random = Math.round(difference * floatRandom);
  const randomWithinRange = random + min;
  return randomWithinRange;
}
export const useEncounter = () => {
  const { emotions, setEmotion, player, setPlayer } = useDungeonProvider();
  const [entity, setEntity] = useState<Enemy>();
  const [startTime, setStartTime] = useState<Dayjs>(dayjs());
  const getActions = (emotion: string) => {
    let actions: Set<string> = new Set();
    let emotionsAction = reactions.filter((reaction) =>
      reaction.includes(emotion),
    );
    console.log(emotion);
    console.log(emotionsAction);
    if (emotionsAction === undefined) return [];
    actions.add(emotionsAction[getRandom(0, emotionsAction.length)]);
    while (actions.size < 4) {
      const value = reactions[getRandom(0, reactions.length)];
      console.log(value);
      if (value === undefined) continue;
      actions.add(value);
    }
    let array = Array.from(actions);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };
  const fight = (guess: string) => {
    if (entity === undefined) return;
    if (guess.includes(entity.name as string)) {
      setEntity((prev) => ({ ...(prev as Enemy), hp: 0 }));
    }
    let newEncounters = player.encounters;
    newEncounters[newEncounters.length] = {
      encounterStart: startTime,
      encounterEnd: dayjs(),
      expectedEmotion: entity.name,
      answered: guess.split(".")[1],
      isCorrect: guess.includes(entity.name as string),
    };
    console.log(newEncounters);
    setPlayer({
      ...player,
      encounters: newEncounters,
    });
  };
  const initializeEntity = async () => {
    try {
      const currentEmotes = Object.values(Emotions).length - 1;
      const enemyId = getRandom(0, currentEmotes);
      console.log(enemyId, currentEmotes);
      setEmotion(new Set<number>(emotions).add(enemyId));
      const _emotions: string = Object.values(Emotions)[enemyId];
      console.log(`http://127.0.0.1:5000/images/${_emotions}`);
      const enemy: Enemy = {
        id: enemyId,
        image: `http://127.0.0.1:5000/images/${_emotions}`,
        hp: 10,
        name: Object.values(Emotions)[enemyId],
        fightTime: dayjs().add(1, "minute"),
        actions: getActions(_emotions),
      };
      setEntity(enemy);
      console.log(enemy);
      return enemy;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    initializeEntity();
  }, []);
  return { entity, fight, initializeEntity };
};
