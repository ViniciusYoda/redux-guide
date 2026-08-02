import UserActionTypes from "./action-types";

export interface User {
  name: string;
  email: string;
}

export const loginUser = (payload: User) => ({
  type: UserActionTypes.LOGIN,
  payload,
} as const);

export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT,
} as const);

export type UserAction = ReturnType<typeof loginUser> | ReturnType<typeof logoutUser>;
