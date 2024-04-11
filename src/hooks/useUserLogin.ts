import { AccountState, User } from "@models/UserModel"
import dayjs from "dayjs"
import { useState } from "react";

const _user: User = {
    userId: 1,
    email: "test@mail.com",
    userName: "testUser",
    birthYear: dayjs('01-01-1990'),
    sex: "male",
    education: "Student",
    pastHealthIssues: "University",
    accountState: AccountState.ACTIVE,
    level: "10",
    expPoints: "1000",
    itemsOwned: [],
    currencyN: "200",
    currencyP: "300",
    lastLogin: dayjs(),
    loginStreak: "10",
    isLoggedIn: true
}

export const useUserLogin = () => {
    const [user, setUser] = useState<User>(_user);

    const getUserLogin = async () => {
        setUser(_user);
        return user
    }

    return { getUserLogin, user };
}