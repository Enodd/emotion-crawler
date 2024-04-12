import { AccountState, ResponseUser, User } from "@models/UserModel";
import { useEffect, useState } from "react";
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

const defaultUser: User = {
  userId: -1,
  email: "",
  userName: "",
  birthYear: dayjs(),
  sex: "male",
  education: "",
  pastHealthIssues: "",
  accountState: AccountState.ACTIVE,
  level: "",
  expPoints: "",
  itemsOwned: undefined,
  currencyN: "",
  currencyP: "",
  lastLogin: dayjs(),
  loginStreak: "",
  isLoggedIn: false,
  JWTToken: "",
  nextHpRenewal: dayjs(),
  lostHp: 0,
  userHp: 3,
};

export const useUserLogin = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setValidationToken, dispatchUser, refreshValues, removeUser } =
    useConfigurationProvider();

  const getUserLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await instance.post<{
        data: ResponseUser[];
        accessToken: { token: string; userId: number };
        status: string;
      }>("userLogin", {
        userEmail: email,
        userPassword: password,
      });
      const loggedUser: ResponseUser = data.data[0];
      const accessToken = data.accessToken.token;
      const parsedUser: User = {
        ...loggedUser,
        sex: loggedUser.sex ? "male" : "female",
        birthYear: dayjs(loggedUser.birthYear),
        lastLogin: dayjs(),
        isLoggedIn: true,
        JWTToken: accessToken,
        nextHpRenewal: dayjs(loggedUser.nextHpRenewal),
        lostHp: 3 - loggedUser.userHp,
      };
      setValidationToken(accessToken);
      setUser(parsedUser);
      dispatchUser(parsedUser);
      return parsedUser;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
      setLoading(true);
      const dataBlock = {
        userEmail: email,
        userName,
        userPassword: password,
        sex: sex === "male" ? false : true,
        birthYear: dayjs(birthYear).year(),
        placeOfResidency,
      };
      const { data } = await instance.post("userRegister", dataBlock);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      setUser(defaultUser);
      await removeUser();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(true);
    }
  };
  const checkLoggedUser = async () => {
    try {
      setLoading(true);
      const { token } = refreshValues();
      if (!token) return;
      console.log("querying");
      const { data } = await instance.post<{
        data: ResponseUser[];
        accessToken: {
          token: string;
        };
        status: string;
      }>("userLogin", {
        userToken: token,
      });
      const accessToken = data.accessToken.token;
      const loggedUser: ResponseUser = data.data[0];
      const parsedUser: User = {
        ...loggedUser,
        sex: loggedUser.sex ? "male" : "female",
        birthYear: dayjs(loggedUser.birthYear),
        lastLogin: dayjs(),
        isLoggedIn: true,
        JWTToken: accessToken,
        nextHpRenewal: dayjs(loggedUser.nextHpRenewal),
        lostHp: 3 - loggedUser.userHp,
      };
      setValidationToken(accessToken);
      setUser(parsedUser);
      return parsedUser;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkLoggedUser();
  }, []);

  return { user, setUser, logout, getUserLogin, register, loading };
};
