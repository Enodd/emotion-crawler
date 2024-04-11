import React, { useEffect } from "react";
import { Input, Stack, Heading, Button, VStack } from "@chakra-ui/react";
import { Form, useForm } from "react-hook-form";
import { MainScreenLayout } from "@layout/MainScreenLayout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useUserLogin } from "@hooks/useUserLogin";
import { useUserProvider } from "@hooks/useUserProvider";

export const LoginPage: React.FC = () => {
  const { control, register, watch } = useForm<{
    login: string;
    password: string;
  }>();
  const { t } = useTranslation();
  const { setUser } = useUserProvider();
  const { getUserLogin } = useUserLogin();
  const navigate = useNavigate();

  const pass = register("password");
  const login = register("login");
  const loginVal = watch("login");
  const passVal = watch("password");

  useEffect(() => {
    console.log(loginVal, passVal);
  }, [loginVal, passVal]);

  const handleLogin = async () => {
    try {
      const data = await getUserLogin(loginVal, passVal);
      setUser(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainScreenLayout>
      <VStack zIndex={2} gap={5} pt={20}>
        <Heading fontSize={"5xl"}>{t("form.login")}</Heading>
        <Form control={control} onSubmit={() => handleLogin()}>
          <Stack
            direction={"column"}
            gap={3}
            paddingX={5}
            bg={"gray.800"}
            p={4}
            borderRadius={10}
          >
            <Button
              leftIcon={<FaArrowLeft />}
              variant={"ghost"}
              onClick={() => navigate("/")}
            >
              {t("form.backToMain")}
            </Button>
            <Input
              {...login}
              type={"text"}
              placeholder={t("form.loginId")}
              variant={"filled"}
            />
            <Input
              {...pass}
              type={"password"}
              placeholder={t("form.password")}
              variant={"filled"}
            />
            <Button
              type={"submit"}
              variant={"filled"}
              bgColor={"cyan.500"}
              _hover={{
                bgColor: "cyan.800",
              }}
              cursor={"pointer"}
            >
              {t("form.login")}
            </Button>
            <Input type={"reset"} variant={"outline"} value={t("form.reset")} />
          </Stack>
        </Form>
      </VStack>
    </MainScreenLayout>
  );
};
