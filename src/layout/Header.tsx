import { Box, Button, HStack, Link, Text, Image } from "@chakra-ui/react";
import { useUserProvider } from "@hooks/useUserProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "@assets/logo.png";
import { motion } from "framer-motion";
import { useUserLogin } from "@hooks/useUserLogin";
import { useNavigate } from "react-router-dom";

const MotionImage = motion(Image);

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUserProvider();
  const { logout } = useUserLogin();
  const navigate = useNavigate();
  const handleLoginAction = () => {
    if (user.isLoggedIn) {
      logout();
      return;
    }
    navigate("/login");
  };

  return (
    <HStack
      w={"100vw"}
      p={4}
      justifyContent={"space-between"}
      position={"fixed"}
      bg={"blackAlpha.100"}
      zIndex={10}
    >
      <Box>
        <Link href={"/"}>
          <MotionImage
            src={Logo}
            alt={"Website logo presenting blank face"}
            maxW={"32px"}
            initial={{
              rotate: "0",
            }}
            whileHover={{
              rotate: "360deg",
            }}
          />
        </Link>
      </Box>
      <HStack gap={4}>
        <Text>{t("header.about")}</Text>
        <Text>{t("header.contact")}</Text>
        <Button variant={"solid"} onClick={() => handleLoginAction()}>
          {t(user.isLoggedIn ? "header.logout" : "header.login")}
        </Button>
      </HStack>
    </HStack>
  );
};
