import { Dayjs } from "dayjs";

export enum AccountState {
    ACTIVE,
    SUSPENDED,
    CLOSED_ON_PENDING,
    CLOSE,
}

export interface User {
    userId: number;
    email: string;
    userName: string;
    birthYear: Dayjs;
    sex: 'male' | 'female';
    education: string;
    pastHealthIssues: string;
    accountState: AccountState;
    level: string;
    expPoints: string;
    itemsOwned: any;
    currencyN: string;
    currencyP: string;
    lastLogin: Dayjs;
    loginStreak: string;
    isLoggedIn: boolean;
}