import { useUserLogin } from "@hooks/useUserLogin";
import { AccountState, User } from "@models/UserModel";
import dayjs from "dayjs";
import React, { createContext } from "react";

const defaultValues: {
  user: User;
  setUser: (user?: User) => void;
  loading?: boolean;
} = {
  user: {
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
  },
  loading: false,
  setUser: () => {},
};
export const UserConnectionContext = createContext<{
  user: User;
  loading?: boolean;
  setUser: (user?: User) => void;
}>(defaultValues);

export const UserConnectionProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user, setUser, loading } = useUserLogin();

  return (
    <UserConnectionContext.Provider
      value={{ user: user || defaultValues.user, setUser, loading }}
    >
      {children}
    </UserConnectionContext.Provider>
  );
};
