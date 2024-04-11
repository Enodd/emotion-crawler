import { ResponseUser, User } from "@models/UserModel";
import { useState } from "react";
import axios from "axios";
import { useConfigurationProvider } from "./useConfigurationProvider";
import { Residency } from "@models/residency";
import dayjs from "dayjs";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const useUserLogin = () => {
  const [user, setUser] = useState<User>();
  const { setValidationToken } = useConfigurationProvider();

  const getUserLogin = async (email: string, password: string) => {
    try {
      console.log(email, password);
      const { data } = await instance.post<{
        data: ResponseUser[];
        status: string;
      }>("userLogin", {
        userEmail: email,
        userPassword: password,
      });
      const loggedUser: ResponseUser = data.data[0];
      console.log(loggedUser);
      const parsedUser: User = {
        ...loggedUser,
        birthYear: dayjs(loggedUser.birthYear),
        lastLogin: dayjs(),
        isLoggedIn: true,
      };
      setValidationToken(loggedUser.JWTToken);
      setUser(parsedUser);
      return parsedUser;
    } catch (err) {
      console.log(err);
    }
  };
  const register = async (
    email: string,
    userName: string,
    password: string,
    birthYear: string,
    sex: "male" | "female",
    placeOfResidency: Residency,
  ) => {
    try {
      console.log("register kurwa");
      const dataBlock = {
        // podmiana, bo request sie wywala
        userEmail: userName,
        userName: email,
        userPassword: password,
        sex: sex === "male" ? false : true,
        birthYear: dayjs(birthYear).year(),
        placeOfResidency,
      };
      const { data } = await instance.post("userRegister", dataBlock);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  const logout = async () => {
    setUser(undefined);
  };

  return { user, setUser, logout, getUserLogin, register };
};
