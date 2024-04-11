import React from "react";
import { Input, Stack, Text } from "@chakra-ui/react";
import { Form, useForm } from "react-hook-form";
import { MainScreenLayout } from "@layout/MainScreenLayout";
import { useTranslation } from "react-i18next";

export const LoginPage: React.FC = () => {
  const { control } = useForm();
  const { t } = useTranslation();
  return (
    <MainScreenLayout>
      <Text fontSize={"5xl"}>{t("form.loginId")}</Text>
      <Form control={control}>
        <Stack
          direction={"column"}
          gap={3}
          paddingX={5}
          bg={"gray.800"}
          p={4}
          borderRadius={10}
        >
          <Input
            type={"text"}
            placeholder={t("form.login")}
            variant={"filled"}
          />
          <Input
            type={"email"}
            placeholder={t("form.email")}
            variant={"filled"}
          />
          <Input
            type={"password"}
            placeholder={t("form.password")}
            variant={"filled"}
          />
          {/* <Input
            type={"password"}
            placeholder={t("form.passwordRepeat")}
            variant={"filled"}
          />
          <Input
            type={"date"}
            placeholder={t("form.birthYear")}
            variant={"filled"}
          />
          <Input type={"text"} placeholder={t("form.sex")} variant={"filled"} /> */}
          <Input
            type={"submit"}
            variant={"filled"}
            bgColor="cyan.500"
            value={t("form.login")}
          />
          <Input type={"reset"} variant={"filled"} value={t("form.reset")} />
        </Stack>
      </Form>
    </MainScreenLayout>
  );
};
