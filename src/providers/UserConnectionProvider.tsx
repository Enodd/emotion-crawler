import { useUserLogin } from "@hooks/useUserLogin";
import { AccountState, User } from "@models/UserModel";
import dayjs from "dayjs";
import React, { createContext } from "react";

const UserConnectionContext = createContext<User>({
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
    isLoggedIn: false
})

export const UserConnectionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { user } = useUserLogin();

    return <UserConnectionContext.Provider value={user}>
        {children}
    </UserConnectionContext.Provider>
}