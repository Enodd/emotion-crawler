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
        alignItems={"center"}
        backgroundImage={BackgroundImage}
        backgroundSize={"cover"}
        position={"relative"}
        sx={{
          _after: {
            content: '""',
            width: "100%",
            height: "100%",
            background: "#0004",
            position: "absolute",
            zIndex: 0,
          },
        }}
      >
        {children}
      </Box>
    </AppLayout>
  );
};
