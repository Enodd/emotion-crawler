import { Dayjs } from "dayjs";

export enum AccountState {
  ACTIVE,
  SUSPENDED,
  CLOSED_ON_PENDING,
  CLOSE,
}

export interface ResponseUser {
  userId: number;
  email: string;
  userName: string;
  birthYear: string;
  sex: "male" | "female";
  education: string;
  pastHealthIssues: string;
  accountState: AccountState;
  level: string;
  expPoints: string;
  itemsOwned: any;
  currencyN: string;
  currencyP: string;
  loginStreak: string;
  lastLogin: string;
  JWTToken: string;
}

export interface User extends Omit<ResponseUser, "birthYear" | "lastLogin"> {
  birthYear: Dayjs;
  lastLogin: Dayjs;
  isLoggedIn: boolean;
}
