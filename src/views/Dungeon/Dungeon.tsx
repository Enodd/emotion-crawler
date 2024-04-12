import { Box, Button, Grid, GridItem, VStack, Image } from "@chakra-ui/react";
import { useDungeon } from "@hooks/useDungeon";
import Player from "@assets/player.png";
import Enemy from "@assets/enemy.gif";
import React, { useState } from "react";
import { EncounterModal } from "@components/EncounterModal";

const fieldSize = "60px";
const ButtonContent: React.FC<{ fieldId: number; isEnemy: boolean }> = ({
  fieldId,
  isEnemy,
}) => {
  if (isEnemy) {
    return (
      <>
        <Image src={Enemy} width={fieldSize} />
      </>
    );
  }
  if (fieldId == 7) {
    return (
      <>
        <Image src={Player} width={fieldSize} />
      </>
    );
  }
  return <></>;
};
export const Dungeon: React.FC = () => {
  const { room, background, fieldAction, canPerformAction, playerPosition } =
    useDungeon();
  const [isEncounterModalOpen, setIsEncounterModalOpen] =
    useState<boolean>(false);
  const handleOnFieldAction = (fieldVal: number, index: string) => {
    const [x, y]: string[] = index.split("-");
    const newX = parseInt(x);
    const newY = parseInt(y);
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - newX, 2) +
        Math.pow(playerPosition.y - newY, 2),
    );
    if (distance > 1.5) return;
    if (fieldVal === 5) {
      setIsEncounterModalOpen(true);
    }
    fieldAction(fieldVal, index);
  };
  return (
    <>
      <EncounterModal
        isOpen={isEncounterModalOpen}
        onClose={() => setIsEncounterModalOpen(false)}
      />
      <VStack width={"100%"} height={"100vh"} justifyContent={"center"}>
        <Grid templateColumns={`repeat(${room[0].length}, ${fieldSize})`}>
          {room.map((row, indexR) => {
            return row.map((col, indexC) => {
              return (
                <GridItem
                  key={`${indexR}-${indexC}`}
                  bgImage={background[indexR][indexC]}
                  width={fieldSize}
                  height={fieldSize}
                  cursor={canPerformAction(col) ? "pointer" : "default"}
                >
                  {col === 0 ? (
                    <></>
                  ) : (
                    <Button
                      width={"100%"}
                      height={"100%"}
                      p={0}
                      onClick={() =>
                        handleOnFieldAction(col, `${indexR}-${indexC}`)
                      }
                    >
                      <ButtonContent isEnemy={col === 5} fieldId={col} />
                    </Button>
                  )}
                </GridItem>
              );
            });
          })}
        </Grid>
      </VStack>
    </>
  );
};
