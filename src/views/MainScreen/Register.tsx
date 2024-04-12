import React from "react";
import {
  Button,
  Heading,
  Text,
  Input,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Form, useForm } from "react-hook-form";
import { MainScreenLayout } from "@layout/MainScreenLayout";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { Residency } from "@models/residency";
import { useUserLogin } from "@hooks/useUserLogin";

interface RegisterForm {
  userName: string;
  email: string;
  password: string;
  password2: string;
  birthYear: string;
  gender: "male" | "female";
  placeOfBirth: Residency;
}

export const RegisterPage: React.FC = () => {
  const { control, register, watch, formState } = useForm<RegisterForm>({
    mode: "onChange",
  });
  const { t } = useTranslation();
  const { register: registerUser } = useUserLogin();
  const navigate = useNavigate();

  const login = register("userName", {
    validate: {
      isMinLength: (value) =>
        value.length < 8 ? t("form.tooShort") : undefined,
    },
  });
  const email = register("email");
  const pass = register("password", {
    validate: {
      isTheSame: (value) =>
        value === pass2Val ? undefined : t("form.passwordDifferent"),
    },
  });
  const pass2 = register("password2");
  const birthYear = register("birthYear");
  const gender = register("gender");
  const placeOfBirth = register("placeOfBirth");

  const loginVal = watch("userName");
  const emailVal = watch("email");
  const passVal = watch("password");
  const pass2Val = watch("password2");
  const birthYearVal = watch("birthYear");
  const genderVal = watch("gender");
  const placeOfBirthVal = watch("placeOfBirth");

  const handleSubmit = async () => {
    try {
      await registerUser(
        emailVal,
        loginVal,
        passVal,
        birthYearVal,
        genderVal,
        placeOfBirthVal,
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainScreenLayout>
      <VStack gap={5} zIndex={2} pt={20}>
        <Heading fontSize={"5xl"}>{t("form.register")}</Heading>
        <Form
          control={control}
          id={"registerForm"}
          onSubmit={() => handleSubmit()}
        >
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
              name={"userName"}
              placeholder={t("form.registerId")}
              variant={"filled"}
            />
            <ErrorMessage
              errors={formState.errors}
              name={"userName"}
              render={({ message }) => (
                <Text color={"red.500"} fontSize="small">
                  {message}
                </Text>
              )}
            />

            <Input
              {...email}
              type={"email"}
              placeholder={t("form.email")}
              variant={"filled"}
            />
            <Input
              {...pass}
              type={"password"}
              placeholder={t("form.password")}
              variant={"filled"}
            />
            <Input
              {...pass2}
              type={"password"}
              placeholder={t("form.passwordRepeat")}
              variant={"filled"}
            />
            <Input {...birthYear} type={"date"} variant={"filled"} />
            <Select
              {...gender}
              placeholder={t("form.selectSex")}
              form="registerForm"
            >
              <option value={"male"}>{t("form.male")}</option>
              <option value={"female"}>{t("form.female")}</option>
            </Select>
            <Select
              {...placeOfBirth}
              placeholder={t("form.residency")}
              form="registerForm"
            >
              <option value={Residency.Village}>{t("form.village")}</option>
              <option value={Residency.Town}>{t("form.town")}</option>
              <option value={Residency.City}>{t("form.city")}</option>
              <option value={Residency.BigCity}>{t("form.bigCity")}</option>
            </Select>
            <Button
              type={"submit"}
              variant={"filled"}
              bgColor={"cyan.500"}
              _hover={{
                bgColor: "cyan.800",
              }}
              cursor={"pointer"}
            >
              {t("form.register")}
            </Button>
            <Button type={"reset"} variant={"outline"}>
              {t("form.reset")}
            </Button>
          </Stack>
        </Form>
      </VStack>
    </MainScreenLayout>
  );
};
