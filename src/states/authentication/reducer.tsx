import { ActionType } from "./action";
const initialState: string | null = null;

const AuthenticationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return action.payload?.auth;
    case ActionType.LOGOUT:
      return null;
    default:
      return state;
  }
};

export default AuthenticationReducer;
