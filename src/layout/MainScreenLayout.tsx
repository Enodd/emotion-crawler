import React from "react";
import BackgroundImage from "@assets/MainScreenWallpaper.png";
import { Box } from "@chakra-ui/react";
import { AppLayout } from "./AppLayout";

export const MainScreenLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <AppLayout>
      <Box
        w={"100vw"}
        height={"100vh"}
        display={"flex"}
        flexDir={"column"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundImage={BackgroundImage}
        backgroundSize={"cover"}
      >
        {children}
      </Box>
    </AppLayout>
  );
};
