import { Button, HStack, Spinner, VStack, Image, Box } from "@chakra-ui/react";
import { useUserProvider } from "@hooks/useUserProvider";
import { MainScreenLayout } from "@layout/MainScreenLayout";
import ShoeIcon from "@assets/shoe.png";
import LostShoe from "@assets/LostShoes.png";
import DungeonDoors from "@assets/DungeonEntrance.png";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const LoggedUserScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useUserProvider();
  const { t } = useTranslation();
  const handleEnterDungeon = () => {
    navigate("/dungeon");
  };
  if (loading) {
    return (
      <MainScreenLayout>
        <Spinner />
      </MainScreenLayout>
    );
  }
  if (user.isLoggedIn) {
    const hp = [];
    for (let i = 0; i < user.userHp; i++) {
      hp.push(
        <HStack justifyContent={"center"} userSelect={"none"}>
          <Image src={ShoeIcon} width={"75%"} />
        </HStack>,
      );
    }
    for (let j = 0; j < user.lostHp; j++) {
      hp.push(
        <HStack justifyContent={"center"} userSelect={"none"}>
          <Image src={LostShoe} width={"75%"} />
        </HStack>,
      );
    }
    return (
      <MainScreenLayout>
        <VStack height={"100%"} justifyContent={"center"}>
          <VStack zIndex={2} bg={"blackAlpha.500"} p={3} borderRadius={20}>
            <HStack bg={"orange.900"} gap={0} p={2} borderRadius={15}>
              {hp}
            </HStack>
            <HStack justifyContent={"center"}>
              <Image src={DungeonDoors} w={"50%"} />
            </HStack>
            <Button
              disabled={user.userHp === 0}
              colorScheme={"cyan"}
              onClick={handleEnterDungeon}
            >
              {t("mainScreen.startRun")}
            </Button>
          </VStack>
        </VStack>
      </MainScreenLayout>
    );
  }
  return (
    <VStack>
      <Button onClick={() => navigate("/")}>{t("navigation.return")}</Button>
    </VStack>
  );
};
