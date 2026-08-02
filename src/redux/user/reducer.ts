import UserActionTypes from "./action-types";
import type { User, UserAction } from "./actions";

export interface UserState {
  currentUser: User | null;
}

const initialState: UserState = { currentUser: null };

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { ...state, currentUser: action.payload };
    case UserActionTypes.LOGOUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default userReducer;
