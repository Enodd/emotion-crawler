import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MainScreenLayout } from "@layout/MainScreenLayout";

export const MainScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <MainScreenLayout>
      <Box
        display={"flex"}
        flexDir={"column"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text mb={20}>EMOTION CRAWLER</Text>
        <Button
          colorScheme="cyan"
          w={"100%"}
          onClick={() => {
            navigate("login");
          }}
        >
          {t("mainScreen.login")}
        </Button>
        <Button colorScheme="cyan" w={"100%"}>
          {t("mainScreen.register")}
        </Button>
        <Button variant="ghost" colorScheme="white" w={"100%"}>
          {t("mainScreen.playAsGuest")}
        </Button>
      </Box>
    </MainScreenLayout>
  );
};
