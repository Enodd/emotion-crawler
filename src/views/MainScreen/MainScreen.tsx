import React from "react";
import { Box, Button, Image, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MainScreenLayout } from "@layout/MainScreenLayout";
import { useUserProvider } from "@hooks/useUserProvider";
import WebsiteLogo from "@assets/WebsiteLogo.png";

export const MainScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserProvider();

  if (user?.isLoggedIn) {
    return <>User is logged in</>;
  }

  return (
    <MainScreenLayout>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"flex-start"}
        gap={20}
        alignItems={"center"}
        pt={20}
        zIndex={2}
      >
        <Box>
          <Image src={WebsiteLogo} alt={"website logo"} maxW={"700px"} />
        </Box>
        <Stack direction={"column"} gap={2} w={"100%"} maxW={"350px"}>
          <Button
            colorScheme="cyan"
            w={"100%"}
            onClick={() => {
              navigate("login");
            }}
          >
            {t("mainScreen.login")}
          </Button>
          <Button
            colorScheme="cyan"
            w={"100%"}
            onClick={() => {
              navigate("register");
            }}
          >
            {t("mainScreen.register")}
          </Button>
          <Button variant="ghost" colorScheme="white" w={"100%"}>
            {t("mainScreen.playAsGuest")}
          </Button>
        </Stack>
      </Box>
    </MainScreenLayout>
  );
};
