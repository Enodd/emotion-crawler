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
  sex: boolean;
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
  userHp: number;
  nextHpRenewal: string;
}

export interface User
  extends Omit<
    ResponseUser,
    "birthYear" | "lastLogin" | "sex" | "nextHpRenewal"
  > {
  sex: "male" | "female";
  birthYear: Dayjs;
  lastLogin: Dayjs;
  isLoggedIn: boolean;
  JWTToken: string;
  nextHpRenewal: Dayjs;
  lostHp: number;
}
